<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

  public function up(): void
  {
    Schema::create('donation_posts', function (Blueprint $table) {
      $table->id();
      $table->foreignId('requester_id')->constrained('users')->cascadeOnDelete();
      $table->string('hospital_name');
      $table->enum('blood_type', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);
      $table->integer('quantity')->default(1);
      $table->foreignId('city_id')->constrained();
      $table->string('location');
      $table->enum('urgency_level', ['urgent', 'normal'])->default('normal');
      $table->enum('status', ['active', 'inactive'])->default('active');
      $table->timestamps();
    });
  }


  public function down(): void
  {
    Schema::dropIfExists('donation_posts');
  }
};
