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
        Schema::create('donation_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('donor_id')->constrained('users');
            $table->foreignId('blood_bank_id')->constrained();
            $table->foreignId('drive_id')->constrained();
            $table->timestamp('donation_date');
            $table->string('blood_type');
            $table->enum('status', ['pending','approved','rejected'])->default('pending');
            $table->string('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donation_records');
    }
};