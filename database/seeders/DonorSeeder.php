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
      'name' => 'Mazen',
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
    User::create([
      'role' => 'donor',
      'name' => 'Nizar',
      'gender' => 'male',
      'age' => 20,
      'blood_type' => 'B+',
      'last_donation_date' => '2024-04-01',
      'city_id' => 2,
      'address' => 'Agdal',
      'phone1' => '0612345678',
      'phone2' => '0612345600',
      'email' => 'nizar@ezziti.com',
      'password' => Hash::make('azert555'),
    ]);
    User::create([
      'role' => 'donor',
      'name' => 'Amyr',
      'gender' => 'male',
      'age' => 18,
      'blood_type' => 'AB+',
      'last_donation_date' => '2024-04-01',
      'city_id' => 3,
      'address' => 'Casa',
      'phone1' => '0612345678',
      'phone2' => '0612345600',
      'email' => 'amyr@ezziti.com',
      'password' => Hash::make('azert555'),
    ]);
  }
}
