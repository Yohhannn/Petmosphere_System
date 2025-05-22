<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('post', function (Blueprint $table) {
            $table->bigIncrements('post_id');
            $table->date('post_date');
            $table->text('post_img')->nullable(); // corrected to match `text` in MySQL
            $table->string('post_descrip', 100);
            $table->string('post_status', 20)->default('Pending');
            $table->string('post_reason', 250)->default('Pending');
            $table->unsignedBigInteger('pet_id');
            $table->unsignedBigInteger('user_id');

            $table->foreign('pet_id')->references('pet_id')->on('pet')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('user_id')->references('user_id')->on('user')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post');
    }
};
