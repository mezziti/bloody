<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class EndDate implements ValidationRule
{
  /**
   * Run the validation rule.
   *
   * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
   */
  public function validate(string $attribute, mixed $value, Closure $fail): void
  {
    $end_date = request()->input('end_date');
    if (strtotime($value) > strtotime($end_date)) {
      $fail('The begin date must be earlier than the end date.');
    }
  }
}
