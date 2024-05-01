<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class DonationPostFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {
    return [
      'requester_id' => fake()->randomElement([1, 2]),
      'hospital_name' => fake()->company,
      'blood_type' => fake()->randomElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      'quantity' => fake()->numberBetween(1, 10),
      'city_id' => fake()->randomElement([1, 2, 3, 4, 5]),
      'location' => fake()->address,
      'urgency_level' => fake()->randomElement(['urgent', 'normal']),
      'status' => fake()->randomElement(['active', 'inactive']),
    ];
  }
}
