<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;
use App\Models\BloodBag;
use App\Models\BloodRequest;
use App\Models\City;
use App\Models\DonationPost;
use App\Models\DonationRecord;
use App\Models\DonationRequest;
use App\Models\Drive;
use App\Models\ParticipantDrive;
use App\Models\PostDonor;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use App\Providers\RouteServiceProvider;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
  public function __construct()
  {
    $this->middleware('bank')->only('createDonor', 'registerDonor');
  }
  public function dashboard()
  {
    if (auth()->user()->role == 'bank') {
      $bloodRequests = BloodRequest::where('bank_id', auth()->id())->get()->count();
    } else {
      $bloodRequests = BloodRequest::where('requester_id', auth()->id())->get()->count();
    }
    return Inertia::render('Dashboard', [
      'bags' => BloodBag::where('bank_id', auth()->id())->get()->count(),
      'bloodRequests' => $bloodRequests,
      'posts' => DonationPost::where('requester_id', auth()->id())->get()->count(),
      'records' => DonationRecord::where('bank_id', auth()->id())->get()->count(),
      'donationRequests' => DonationRequest::where('donor_id', auth()->id())->get()->count(),
      'myDonationRequests' => DonationRequest::where('requester_id', auth()->id())->get()->count(),
      'drives' => Drive::where('bank_id', auth()->id())->get()->count(),
      'donations' => PostDonor::where('donor_id', auth()->id())->get()->count(),
      'participations' => ParticipantDrive::where('user_id', auth()->id())->get()->count(),
    ]);
  }
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

  public function createDonor()
  {
    return Inertia::render('donors/create', [
      'cities' => City::orderBy('name', 'asc')->get(),
    ]);
  }

  public function registerDonor(Request $request)
  {
    $validatedData = $request->validate([
      'name' => 'required|string|max:255',
      'address' => 'nullable|string|max:255',
      'phone1' => 'required|string|max:10',
      'phone2' => 'nullable|string|max:10',
      'city_id' => 'required|string|max:255',
      'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
      'password' => ['required', Password::defaults()],
      'age' => 'required|integer',
      'gender' => Rule::in(['male', 'female']),
      'blood_type' => Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      'last_donation_date' => 'nullable|date'
    ]);

    $validatedData['password'] = Hash::make($request->password);
    $validatedData['role'] = 'donor';

    User::create($validatedData);
    return redirect()->route('records.create');
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
