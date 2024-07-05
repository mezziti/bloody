<?php

namespace Database\Seeders;

use App\Models\User;
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
      'address' => 'Dar Dmana',
      'phone1' => '0612345678',
      'phone2' => '0612345600',
      'email' => 'bbms@m.com',
      'password' => Hash::make('azert555'),
    ]);
    User::create([
      'role' => 'bank',
      'name' => 'bbms2',
      'city_id' => 2,
      'address' => 'casa',
      'phone1' => '0612345678',
      'phone2' => '0612345600',
      'email' => 'bbms2@m.com',
      'password' => Hash::make('azert555'),
    ]);
    User::create([
      'role' => 'bank',
      'name' => 'bbms3',
      'city_id' => 3,
      'address' => 'agdal',
      'phone1' => '0612345678',
      'phone2' => '0612345600',
      'email' => 'bbms3@m.com',
      'password' => Hash::make('azert555'),
    ]);
  }
}
