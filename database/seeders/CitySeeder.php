<?php

namespace Database\Seeders;

use App\Models\City;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
  
  public function run(): void
  {
    City::create(['name' => 'ouezzane']);
    City::create(['name' => 'casa']);
    City::create(['name' => 'rabat']);
    City::create(['name' => 'tetouan']);
    City::create(['name' => 'agadir']);
    City::create(['name' => 'berchid']);
  }
}
