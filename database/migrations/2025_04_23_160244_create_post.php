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
            $table->bigIncrements('post_id')->primary(true);
            $table->date('post_date');
            $table->string('post_img',250)->nullable();
            $table->string('post_descrip',100);
            $table->unsignedBigInteger('pet_id');
            $table->unsignedBigInteger('tag_id');
            $table->unsignedBigInteger('type_id');
            $table->unsignedBigInteger('breed_id');
            $table->unsignedBigInteger('user_id');
            $table->foreign('pet_id')->references('pet_id')->on('pet')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('tag_id')->references('tag_id')->on('tag')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('type_id')->references('type_id')->on('type')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('breed_id')->references('breed_id')->on('breed')->onDelete('cascade')->onUpdate('cascade');
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
