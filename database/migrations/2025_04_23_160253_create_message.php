<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('message', function (Blueprint $table) {
            $table->bigIncrements('msg_id')->primary(true);
            $table->text('msg_content');
            $table->time('msg_time');
            $table->unsignedBigInteger('sender_id');
            $table->unsignedBigInteger('receiver_id');
            $table->unsignedBigInteger('post_id');
            $table->foreign('sender_id')->references('user_id')->on('user')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('receiver_id')->references('user_id')->on('user')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('post_id')->references('post_id')->on('post')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('message');
    }
};
