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
        Schema::create('request_history', function (Blueprint $table) {
            $table->bigIncrements('history_id')->primary(true);
            $table->string('status_old',50);
            $table->string('status_new',50);
            $table->timestamp('change_at')->nullable();
            $table->unsignedBigInteger('req_id');
            $table->unsignedBigInteger('change_by');
            $table->foreign('change_by')->references('user_id')->on('user')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('req_id')->references('req_id')->on('adoption_request')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('request_history');
    }
};
