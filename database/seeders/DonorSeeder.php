<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DonorSeeder extends Seeder
{

  public function run(): void
  {
    User::create([
      'role' => 'donor',
      'name' => 'mazen',
      'gender' => 'male',
      'age' => 22,
      'blood_type' => 'A+',
      'last_donation_date' => '2024-04-01',
      'city_id' => 1,
      'address' => 'Bani Rabiaa',
      'phone1' => '0612345678',
      'phone2' => '0612345600',
      'email' => 'mazen@ezziti.com',
      'password' => Hash::make('azert555'),
    ]);
  }
}
