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
      'allDrives' => Drive::with('city')->with('bank')->orderBy('begin_date', 'desc')->paginate(10),
      'cities' => City::orderBy('name', 'asc')->get(),
      'session' => session('session'),
    ]);
  }

  public function posts()
  {
    return Inertia::render('posts/posts', [
      'allPosts' => DonationPost::where('status','!=', 'inactive')->with('city')->with('requester')->orderBy('urgency_level','asc')->orderBy('created_at', 'asc')->paginate(10),
      'cities' => City::orderBy('name', 'asc')->get(),
      'session' => session('session'),
    ]);
  }

}
