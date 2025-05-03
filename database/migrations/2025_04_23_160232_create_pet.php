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
        Schema::create('pet', function (Blueprint $table) {
            $table->bigIncrements('pet_id')->primary(true);
            $table->string('pet_name', 50);
            $table->string('pet_location', 50);
            $table->integer('pet_age');
            $table->string('pet_tag',250)->nullable();
            $table->string('pet_description', 100);
            $table->string('pet_status', 50);
            $table->string('pet_medical', 100)->nullable();

            // Add breed_id, type_id, and user_id columns
            $table->unsignedBigInteger('breed_id');  // breed_id column
            $table->unsignedBigInteger('type_id');   // type_id column
            $table->unsignedBigInteger('user_id');   // user_id column

            // Define foreign key constraints
            $table->foreign('breed_id')
                ->references('breed_id')
                ->on('breed')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('type_id')
                ->references('type_id')
                ->on('type')
                ->onDelete('cascade')
                ->onUpdate('cascade');


            $table->foreign('user_id')
                ->references('user_id')
                ->on('user')
                ->onDelete('cascade')
                ->onUpdate('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pet');
    }
};
