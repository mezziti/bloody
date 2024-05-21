<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParticipantDrive extends Model
{
  use HasFactory;
  public $guarded = [];

  public function user()
  {
    return $this->belongsTo(User::class);
  }

  public function drive()
  {
    return $this->belongsTo(Drive::class);
  }
}
