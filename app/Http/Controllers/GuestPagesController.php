<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\DonationPost;
use App\Models\Drive;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GuestPagesController extends Controller
{

  public function drives()
  {
    return Inertia::render('drives/drives', [
      'drives' => Drive::with('city')->with('bank')->orderBy('begin_date', 'desc')->get()->map(function ($drive) {
        return [
          'id' => $drive->id,
          'name' => $drive->name,
          'begin_date' => $drive->begin_date,
          'end_date' => $drive->end_date,
          'location' => $drive->location,
          'description' => $drive->description,
          'city' => $drive->city,
          'bank' => $drive->bank,
        ];
      }),
      'cities' => City::orderBy('name', 'asc')->get(),
    ]);
  }
  public function requests()
  {
    return Inertia::render('posts/posts', [
      'posts' => DonationPost::where('status','!=', 'inactive')->with('city')->with('requester')->orderBy('urgency_level','asc')->orderBy('created_at', 'asc')->get()->map(function ($post) {
        return [
          'id' => $post->id,
          'bank' => $post->bank,
          'requester' => $post->requester,
          'hospital' => $post->hospital_name,
          'blood_type' => $post->blood_type,
          'quantity' => $post->quantity,
          'city' => $post->city,
          'location' => $post->location,
          'urgency_level' => $post->urgency_level,
          'status' => $post->status,
        ];
      }),
      'cities' => City::orderBy('name', 'asc')->get(),
    ]);
  }

}
