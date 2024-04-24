<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\DonationPost;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DonationPostController extends Controller
{
  public function index()
  {
    return Inertia::render('posts/index', [
      'posts' => DonationPost::with('city')->with('requester')->get()->map(function ($post) {
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

    
    public function create()
    {
      
    }

    
    public function store(Request $request)
    {
      
    }

    
    public function show(DonationPost $donationPost)
    {
      
    }

    
    public function edit(DonationPost $donationPost)
    {
      
    }

    
    public function update(Request $request, DonationPost $donationPost)
    {
      
    }

    
    public function destroy(DonationPost $donationPost)
    {
      
    }
}
