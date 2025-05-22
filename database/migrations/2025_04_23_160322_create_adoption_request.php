<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('adoption_request', function (Blueprint $table) {
            $table->bigIncrements('req_id');
            $table->string('req_status', 255);
            $table->date('req_date')->default(now());
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('pet_id');
            $table->text('req_message')->nullable();
            $table->string('req_view_status', 20)->default('unread');

            $table->foreign('pet_id')->references('pet_id')->on('pet')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('user_id')->references('user_id')->on('user')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('adoption_request');
    }
};
