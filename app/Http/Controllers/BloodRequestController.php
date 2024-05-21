<?php

namespace App\Http\Controllers;

use App\Models\BloodRequest;
use App\Models\City;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class BloodRequestController extends Controller
{
  public function index()
  {
    if (auth()->user()->role == 'bank') {
      $bloodRequests = BloodRequest::where('bank_id', auth()->id())->with(['city', 'requester'])->orderBy('created_at', 'desc')->paginate(10);
    } else {
      $bloodRequests = BloodRequest::where('requester_id', auth()->id())->with(['city', 'bank'])->orderBy('created_at', 'desc')->paginate(10);
    }
    return Inertia::render('bloodRequests/index', [
      'bloodRequests' => $bloodRequests,
      'cities' => City::orderBy('name', 'asc')->get(),
    ]); 
  }

  public function create()
  {
    
  }

  public function store(Request $request)
  {
    $bankId = $request->input('bank_id');
    if (auth()->id() == $bankId) {
      return redirect()->route('banks')->with('session', ['id' => $bankId, 'message' => "You can't request blood from yourself", 'type' => 'text-primary']);
    }
    if (BloodRequest::where('requester_id', auth()->id())->where('bank_id', $bankId)->exists()) {
      return redirect()->route('banks')->with('session', ['id' => $bankId, 'message' => 'You are already requested', 'type' => 'text-primary']);
    }
    // dd($request);
    $validatedData = $request->validate([
      'bank_id' => 'required|integer',
      'quantity' => 'required|integer',
      'hospital_name' => 'required|string',
      'blood_type' => Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      'location' => 'nullable|string',
      'urgency_level' => Rule::in(['urgent', 'normal']),
      'city_id' => 'required|integer',
      'status' => Rule::in(['pending', 'approved', 'rejected']),
    ]);
    $validatedData['requester_id'] = auth()->id();
    BloodRequest::create($validatedData);
    return redirect()->back()->with('session', ['id' => $bankId, 'message' => 'You requested blood successfully', 'type' => 'text-green-500']);
  }

  public function show(BloodRequest $bloodRequest)
  {
  }

  public function edit(BloodRequest $bloodRequest)
  {
  }

  public function update(Request $request, BloodRequest $bloodRequest)
  {
    $bloodRequest->update(['status' => $request->status]);
    return redirect()->back();
  }

  public function destroy(BloodRequest $bloodRequest)
  {
  }
}
