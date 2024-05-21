<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

  public function up(): void
  {
    Schema::create('donation_records', function (Blueprint $table) {
      $table->id();
      $table->foreignId('donor_id')->constrained('users');
      $table->foreignId('bank_id')->constrained('users');
      $table->foreignId('drive_id')->nullable()->constrained();
      $table->timestamp('donation_date');
      $table->string('blood_type');
      $table->string('description')->nullable();
      $table->timestamps();
    });
  } 


  public function down(): void
  {
    Schema::dropIfExists('donation_records');
  }
};
