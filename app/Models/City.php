<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
  use HasFactory;
  protected $guarded = [];
  public $timestamps = false;

  public function users()
  {
    return $this->hasMany(User::class);
  }

  public function drives()
  {
    return $this->hasMany(Drive::class);
  }

  public function posts()
  {
    return $this->hasMany(DonationPost::class);
  }
}
