<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\DonationRequest;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class DonationRequestController extends Controller
{
  public function index()
  {
    $donationRequests = donationRequest::where('donor_id', auth()->id())->with(['city', 'requester'])->orderBy('created_at', 'desc')->paginate(10);

    return Inertia::render('donationRequests/index', [
      'donationRequests' => $donationRequests,
      'cities' => City::orderBy('name', 'asc')->get(),
    ]);
  }

  public function myRequests()
  {
    $donationRequests = donationRequest::where('requester_id', auth()->id())->with(['city', 'donor'])->orderBy('created_at', 'desc')->paginate(10);

    return Inertia::render('donationRequests/myRequests', [
      'donationRequests' => $donationRequests,
      'cities' => City::orderBy('name', 'asc')->get(),
    ]);
  }

  public function create()
  {
  }

  public function store(Request $request)
  {
    $donorId = $request->input('donor_id');
    if (auth()->id() == $donorId) {
      return redirect()->route('donors')->with('session', ['id' => $donorId, 'message' => "You can't request blood from yourself", 'type' => 'text-primary']);
    }
    if (DonationRequest::where('requester_id', auth()->id())->where('donor_id', $donorId)->exists()) {
      return redirect()->route('donors')->with('session', ['id' => $donorId, 'message' => 'You are already requested', 'type' => 'text-primary']);
    }
    // dd($request);
    $validatedData = $request->validate([
      'donor_id' => 'required|integer',
      'quantity' => 'required|integer',
      'hospital_name' => 'required|string',
      'blood_type' => Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      'location' => 'nullable|string',
      'urgency_level' => Rule::in(['urgent', 'normal']),
      'city_id' => 'required|integer',
      'status' => Rule::in(['pending', 'approved', 'rejected']),
    ]);
    $validatedData['requester_id'] = auth()->id();
    DonationRequest::create($validatedData);
    return redirect()->back()->with('session', ['id' => $donorId, 'message' => 'You requested blood successfully', 'type' => 'text-green-500']);
  }

  public function show(DonationRequest $donationRequest)
  {
  }

  public function edit(DonationRequest $donationRequest)
  {
  }

  public function update(Request $request, DonationRequest $donationRequest)
  {
    $donationRequest->update(['status' => $request->status]);
    return redirect()->back();
  }

  public function destroy(DonationRequest $donationRequest)
  {
  }
}
