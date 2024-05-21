<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $guarded = [];

  protected $hidden = [
    'password',
    'remember_token',
  ];

  protected $casts = [
    'email_verified_at' => 'datetime',
    'password' => 'hashed',
  ];

  public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function posts()
    {
        return $this->hasMany(DonationPost::class);
    }

  public function drives()
  {
    return $this->hasMany(Drive::class);
  }

  public function participations()
  {
    return $this->belongsToMany(Drive::class, 'participant_drives')->withPivot('status', 'id', 'message');
  }

  public function donations()
  {
    return $this->belongsToMany(DonationPost::class, 'post_donors', 'donor_id', 'post_id')->withPivot('status', 'id', 'message');
  }

  public function requesters()
  {
    return $this->belongsToMany(BloodRequest::class, 'blood_bank')->withPivot('status', 'id', 'message');
  }
}
