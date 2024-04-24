<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DonationPost extends Model
{
    use HasFactory;
  protected $guarded = [];

  public function city()
  {
    return $this->belongsTo(City::class);
  }

  public function requester()
  {
    return $this->belongsTo(User::class);
  }
}
