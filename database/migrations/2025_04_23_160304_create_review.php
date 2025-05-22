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
        Schema::create('review', function (Blueprint $table) {
            $table->bigIncrements('rev_id');
            $table->integer('rev_rating');
            $table->text('rev_description')->nullable();
            $table->date('rev_date');
            $table->unsignedBigInteger('rev_rated_by');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('pet_id');

            $table->foreign('user_id')->references('user_id')->on('user')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('rev_rated_by')->references('user_id')->on('user')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('pet_id')->references('pet_id')->on('pet')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('review');
    }
};
