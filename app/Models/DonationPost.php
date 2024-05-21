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

  public function donors()
  {
    return $this->belongsToMany(User::class, 'post_donors', 'donor_id', 'post_id')->withPivot('status', 'id');
  }

}
