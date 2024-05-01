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
    Schema::create('participant_drive', function (Blueprint $table) {
      $table->foreignId('user_id');
      $table->foreignId('drive_id');
      $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('participant_drive');
  }
};
