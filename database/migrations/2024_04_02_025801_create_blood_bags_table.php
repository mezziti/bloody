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
        Schema::create('blood_bags', function (Blueprint $table) {
            $table->id();
            $table->string('bag_code');
            $table->foreignId('bank_id')->constrained('users');
            $table->foreignId('donation_record_id')->constrained();
            $table->enum('status', ['available','unavailable','reserved', 'expired'])->default('available');
            $table->timestamp('expiration_date');
            $table->string('description')->nullable();
            $table->string('storage_location')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blood_bags');
    }
};
