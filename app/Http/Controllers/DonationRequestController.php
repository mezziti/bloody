<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\DonationRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DonationRequestController extends Controller
{
  public function index()
  {
    return Inertia::render('requests/index', [
      'requests' => DonationRequest::with('city')->get()->map(function ($request) {
        return [
          'id' => $request->id,
          'bank' => $request->bank,
          'requester' => $request->requester,
          'hospital' => $request->hospital,
          'blood_type' => $request->blood_type,
          'quantity' => $request->quantity,
          'city' => $request->city,
          'location' => $request->location,
          'urgency_level' => $request->urgency_level,
          'status' => $request->status,
        ];
      }),
      'cities' => City::orderBy('name', 'asc')->get(),
    ]);
  }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(DonationRequest $donationRequest)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DonationRequest $donationRequest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DonationRequest $donationRequest)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DonationRequest $donationRequest)
    {
        //
    }
}
