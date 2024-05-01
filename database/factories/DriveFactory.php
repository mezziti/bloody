<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Drive>
 */
class DriveFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return
    [
      'name' => fake()->word(),
      'city_id' => fake()->randomElement([1,2,3,4,5]),
      'location' => fake()->address(),
      'begin_date' => fake()->dateTimeBetween('-1 week', '+1 month'),
      'end_date' => fake()->dateTimeBetween('-1 week', '+1 month'),
      'description' => fake()->paragraph,
      'bank_id' => 1,
    ];
  }
}
