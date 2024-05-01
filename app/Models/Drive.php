<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Drive extends Model
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

  public function participants() 
  {
    return $this->belongsToMany(User::class,'participant_drive')->withPivot('status');
  }
}
