<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BloodBag extends Model
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

  public function record()
  {
    return $this->belongsTo(DonationRecord::class, 'donation_record_id');
  }
}
