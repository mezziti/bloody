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
    Schema::create('donation_requests', function (Blueprint $table) {
      $table->id();
      $table->foreignId('requester_id')->constrained('users');
      $table->foreignId('donor_id')->constrained('users');
      $table->string('hospital_name');
      $table->enum('blood_type', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);
      $table->integer('quantity')->default(1);
      $table->foreignId('city_id')->constrained();
      $table->string('location')->nullable();
      $table->enum('urgency_level', ['urgent', 'normal'])->default('normal');
      $table->timestamp('donation_date')->nullable();
      $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('donation_requests');
  }
};
