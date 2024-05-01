<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\DonationPost;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class DonationPostController extends Controller
{

  public function index()
  {
    return Inertia::render('posts/index', [
      'posts' => DonationPost::where('requester_id', auth()->id())->with('city')->orderBy('created_at', 'desc')->paginate(10),
      'cities' => City::orderBy('name', 'asc')->get(),
    ]);
  }

  public function create()
  {
    return Inertia::render('posts/create', ['cities' => City::orderBy('name', 'asc')->get(),]);
  }

  public function store(Request $request)
  {
    $validatedData = $request->validate([
      'hospital_name' => 'required|string|max:255',
      'location' => 'string|max:255',
      'blood_type' => Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      'quantity' => 'required|integer|max:255',
      'city_id' => 'required|string|max:255',
      'urgency_level' => Rule::in(['urgent', 'normal']),
      'status' => Rule::in(['active', 'inactive']),
    ]);
    $validatedData['requester_id'] = auth()->id();
    DonationPost::create($validatedData);
    return redirect()->route('posts.index');
  }

  public function show(DonationPost $donationPost)
  {
  }

  public function edit($id)
  {
    $donationPost = DonationPost::findOrFail($id);
    if ($donationPost->requester_id != auth()->id()) {
      return abort(404, 'Post Not Fond');
    }
    return Inertia::render('posts/edit', [
      'cities' => City::orderBy('name', 'asc')->get(),
      'donationPost' => $donationPost,
    ]);
  }

  public function update(Request $request, $id)
  {
    $donationPost = DonationPost::findOrFail($id);
    if ($donationPost->requester_id != auth()->id()) {
      return abort(404, 'Post Not Fond');
    }
    $validatedData = $request->validate([
      'hospital_name' => 'required|string|max:255',
      'location' => 'string|max:255',
      'blood_type' => Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      'quantity' => 'required|integer|max:255',
      'city_id' => 'required|string|max:255',
      'urgency_level' => Rule::in(['urgent', 'normal']),
      'status' => Rule::in(['active', 'inactive']),
    ]);
    $donationPost->update($validatedData);
    return redirect()->route('posts.index');
  }

  public function destroy($id)
  {
    $donationPost = DonationPost::findOrFail($id);
    if ($donationPost->requester_id != auth()->id()) {
      return abort(404, 'Post Not Fond');
    }
    DonationPost::destroy($donationPost->id);
    return redirect()->route('posts.index');
  }
}
