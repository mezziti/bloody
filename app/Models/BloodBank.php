<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BloodBank extends Model
{
    use HasFactory;
    public $guarded = [];

    public function drives()
    {
        return $this->hasMany(Drive::class);
    }

    public function posts()
    {
        return $this->hasMany(DonationPost::class);
    }

  public function city()
  {
    return $this->belongsTo(City::class);
  }
}
