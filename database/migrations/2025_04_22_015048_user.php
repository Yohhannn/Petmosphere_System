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
        Schema::create('user', function (Blueprint $table) {
            $table->bigIncrements('user_id'); // auto-increment + primary key
            $table->string('user_name', 50);
            $table->string('user_phone', 11)->nullable();
            $table->string('user_location', 100)->nullable();
            $table->string('user_prof_pic', 250)->nullable();
            $table->string('user_email', 50)->unique();
            $table->string('user_pass', 100);
            $table->date('user_createdate');
            $table->tinyInteger('user_verified')->default(0);
            $table->string('user_valid_id_pic', 255)->nullable();
            $table->tinyInteger('is_active')->default(1);
            $table->string('user_socmed', 250)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('User');
    }
};
