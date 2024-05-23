<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DonationRecord extends Model
{
  use HasFactory;
  public $guarded = [];

  public function city()
  {
    return $this->belongsTo(City::class);
  }

  public function bank()
  {
    return $this->belongsTo(User::class);
  }

  public function donor()
  {
    return $this->belongsTo(User::class);
  }

  public function drive()
  {
    return $this->belongsTo(Drive::class);
  }
}
