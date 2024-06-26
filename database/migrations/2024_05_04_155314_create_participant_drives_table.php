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
    Schema::create('participant_drives', function (Blueprint $table) {
      $table->id();
      $table->foreignId('user_id')->cascadeOnDelete();
      $table->foreignId('drive_id')->cascadeOnDelete();
      $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
      $table->timestamp('donation_date')->nullable();
      $table->string('message')->nullable();
      $table->timestamps();
    });
  }

  
  public function down(): void
  {
    Schema::dropIfExists('participant_drives');
  }
};
