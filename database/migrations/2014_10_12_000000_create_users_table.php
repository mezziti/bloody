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
    Schema::create('users', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->integer('age')->nullable();
      $table->enum('role', ['donor', 'recipient', 'bank'])->default('recipient');
      $table->enum('gender', ['male', 'female'])->nullable();
      $table->enum('blood_type', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])->nullable();
      $table->string('phone1');
      $table->string('phone2')->nullable();
      $table->foreignId('city_id')->constrained();
      $table->string('address')->nullable();
      $table->string('email')->unique();
      $table->timestamp('last_donation_date')->nullable();
      $table->timestamp('email_verified_at')->nullable();
      $table->string('password');
      $table->enum('status', ['active', 'inactive'])->default('active');
      $table->rememberToken();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('users');
  }
};
