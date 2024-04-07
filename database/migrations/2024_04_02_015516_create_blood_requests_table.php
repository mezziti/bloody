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
        Schema::create('blood_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('blood_bank_id')->constrained()->nullable();
            $table->foreignId('requester_id')->constrained('users');
            $table->string('hospital_name');
            $table->string('blood_type');
            $table->integer('quantity')->default(1);
            $table->foreignId('city_id')->constrained();
            $table->string('location');
            $table->enum('urgency_level', ['urgent','normal'])->default('normal');
            $table->enum('status', ['pending','approved','rejected'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blood_requests');
    }
};