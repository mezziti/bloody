<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class BankSeeder extends Seeder
{
  
  public function run(): void
  {
    User::create([
      'role' => 'bank',
      'name' => 'bbms',
      'city_id' => 1,
      'address' => 'Kachriyin',
      'phone1' => '0612345678',
      'phone2' => '0612345600',
      'email' => 'bbms@m.com',
      'password' => Hash::make('azert555'),
    ]);
  }
}
