<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('alerts', function (Blueprint $table) {
            $table->id('alert_id');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('admin_id')->nullable();
            $table->enum('alert_type', [
                'login',
                'sign_up',
                'post_created',
                'post_rejected',
                'user_verified',
                'user_deactivated',
                'adoption_request',
                'adoption_approved',
                'adoption_rejected',
                'warning',
                'announcement',
                'user_rejected',
            ]);
            $table->string('alert_title', 255);
            $table->text('alert_message')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('user_id')->on('user')->nullOnDelete();
            $table->foreign('admin_id')->references('admin_id')->on('admin')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('alerts');
    }
};
