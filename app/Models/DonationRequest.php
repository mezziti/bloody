<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DonationRequest extends Model
{
    use HasFactory;
    public $guarded = [];

  public function city()
  {
    return $this->belongsTo(City::class);
  }

  public function requester()
  {
    return $this->belongsTo(User::class);
  }

  public function donor()
  {
    return $this->belongsTo(User::class);
  }
}
