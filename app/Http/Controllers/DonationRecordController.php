<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\DonationRecord;
use App\Models\Drive;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DonationRecordController extends Controller
{

  public function __construct()
  {
    $this->middleware('bank');
  }

  public function index()
  {
    return Inertia::render('records/index', [
      'records' => DonationRecord::where('bank_id', auth()->id())->with(['city', 'drive', 'donor'])->orderBy('created_at', 'desc')->paginate(10),
      'cities' => City::orderBy('name', 'asc')->get(),
    ]);
  }

  public function create()
  {
    return Inertia::render('records/create',
      [
        'donors' => User::where('role', 'donor')->with('city')->get()->map(function ($donor) {
          return [
            'id' => $donor->id,
            'name' => $donor->name,
          ];
        }),
        'drives' => Drive::where('bank_id', auth()->id())->with('city')->orderBy('created_at', 'desc')->get(),
      ]
    );
  }

  public function store(Request $request)
  {
    $validatedData = $request->validate([
      'donor_id' => 'required|max:255',
      'drive_id' => 'nullable|max:255',
      'donation_date' => 'required|date',
      'blood_type' => 'required|string|max:255',
      'description' => 'nullable|string|max:255',
    ]);
    $validatedData['bank_id'] = auth()->id();
    DonationRecord::create($validatedData);
    return redirect()->route('records.index');
  }

  public function show(DonationRecord $donationRecord)
  {
  }

  public function edit($id)
  {
    $donationRecord = DonationRecord::find($id);
    // dd($donationRecord);
    if ($donationRecord->bank_id != auth()->id()) {
      return abort(404, 'Record Not Found');
    }
    return Inertia::render('records/edit', [
      'donors' => User::where('role', 'donor')->with('city')->get()->map(function ($donor) {
        return [
          'id' => $donor->id,
          'name' => $donor->name,
        ];
      }),
      'drives' => Drive::where('bank_id', auth()->id())->with('city')->orderBy('created_at', 'desc')->get(),
      'record' => $donationRecord
    ]);
  }

  public function update(Request $request, $id)
  {
    $donationRecord = DonationRecord::find($id);
    $validatedData = $request->validate([
      'donor_id' => 'required|max:255',
      'drive_id' => 'nullable|max:255',
      'donation_date' => 'required|date',
      'blood_type' => 'required|string|max:255',
      'description' => 'nullable|string|max:255',
    ]);
    $donationRecord->update($validatedData);
    return redirect()->route('records.index');
  }

  public function destroy($id)
  {
    DonationRecord::destroy($id);
    return redirect()->route('records.index');
  }
}
