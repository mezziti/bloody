<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
  public function donors()
  {
    return Inertia::render('donors/index', [
      'donors' => User::where('role', 'donor')->with('city')->get()->map(function ($donor) {
        return [
          'id' => $donor->id,
          'name' => $donor->name,
          'gender' => $donor->gender,
          'blood_type' => $donor->blood_type,
          'phone1' => $donor->phone1,
          'phone2' => $donor->phone2,
          'city' => $donor->city,
          'last_donation_date' => $donor->last_donation_date,
        ];
      }),
      'cities' => City::orderBy('name', 'asc')->get(),
      'session' => session('session'),
    ]);
  }

  public function showDonor(User $donor)
  {
    if ($donor->role != "donor") {
      return abort(404,'Donor Not Found');
    }
    $donor = $donor->load('city');
    return inertia('donors/show',['donor' => $donor]);
  }

  public function banks()
  {
    return Inertia::render('banks/index', [
      'banks' => User::where('role', 'bank')->with('city')->get()->map(function ($bank) {
        return [
          'id' => $bank->id,
          'name' => $bank->name,
          'phone1' => $bank->phone1,
          'phone2' => $bank->phone2,
          'city' => $bank->city,
          'location' => $bank->address,
          'email' => $bank->email,
        ];
      }),
      'cities' => City::orderBy('name', 'asc')->get(),
      'session' => session('session'),
    ]);
  }

  public function showBank(User $bank)
  {
    if ($bank->role != "bank") {
      return abort(404, 'Bank Not Found');
    }
    $bank = $bank->load('city');
    return inertia('banks/show', ['bank' => $bank]);
  }

  public function participations()
  {
    $participant = User::findOrFail(auth()->id());
    // dd($participant);
    $participant = $participant->load(['city', 'participations']);
    return Inertia::render('donors/participations', [
      'participant' => $participant,
      'cities' => City::orderBy('name', 'asc')->get(),
    ]);
  }

  public function donations()
  {
    $donor = User::findOrFail(auth()->id());
    // dd($donor);
    $donor = $donor->load(['city', 'donations']);
    return Inertia::render('donors/donations', [
      'donor' => $donor,
      'cities' => City::orderBy('name', 'asc')->get(),
    ]);
  }
}
