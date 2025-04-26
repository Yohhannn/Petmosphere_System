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
        Schema::create('breed', function (Blueprint $table) {
            $table->bigIncrements('breed_id')->primary(true);
            $table->string('breed_name', 50);
            $table->unsignedBigInteger('type_id');
            $table->timestamps();

            $table->foreign('type_id')
                ->references('type_id')
                ->on('type')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('breed');
    }
};
