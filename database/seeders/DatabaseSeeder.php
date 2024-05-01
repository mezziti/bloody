<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\DonationPost;
use App\Models\Drive;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  
  public function run(): void
  {

    $this->call([
      CitySeeder::class,
      BankSeeder::class,
      DonorSeeder::class,
    ]);

    Drive::factory(17)->create();
    DonationPost::factory(38)->create();
  }
}
