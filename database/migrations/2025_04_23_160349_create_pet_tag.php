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
        Schema::create('pet_tag', function (Blueprint $table) {
            $table->bigIncrements('pet_tag_id')->primary(true);
            $table->unsignedBigInteger('pet_id');
            $table->unsignedBigInteger('req_id');
            $table->foreign('pet_id')->references('pet_id')->on('pet')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('req_id')->references('req_id')->on('adoption_request')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pet_tag');
    }
};
