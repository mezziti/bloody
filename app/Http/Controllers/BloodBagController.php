<?php

namespace App\Http\Controllers;

use App\Models\BloodBag;
use App\Models\City;
use App\Models\DonationRecord;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class BloodBagController extends Controller
{

  public function __construct()
  {
    $this->middleware('bank');
  }

  public function index()
  {
    return Inertia::render('bags/index', [
      'bags' => BloodBag::where('bank_id', auth()->id())->with(['city', 'record', 'donor'])->orderBy('created_at', 'desc')->paginate(10),
    ]);
  }

  public function create()
  {
    return Inertia::render('bags/create',[
        'records' => DonationRecord::where('bank_id', auth()->id())->with(['city', 'drive', 'donor'])->orderBy('created_at', 'desc')->get(),
      ]
    );
  }

  public function store(Request $request)
  {
    $validatedData = $request->validate([
      'bag_code' => 'required|max:255',
      'donation_record_id' => 'required|max:255',
      'status' => Rule::in(['available', 'unavailable', 'reserved', 'expired']),
      'expiration_date' => 'required|date',
      'description' => 'nullable|string|max:255',
      'storage_location' => 'nullable|string|max:255',
    ]);
    $validatedData['bank_id'] = auth()->id();
    BloodBag::create($validatedData);
    return redirect()->route('bags.index');
  }

  public function show(BloodBag $bloodBag)
  {
  }

  public function edit($id)
  {
    $bloodBag = BloodBag::find($id);
    // dd($bloodBag);
    if ($bloodBag->bank_id != auth()->id()) {
      return abort(404, 'Record Not Found');
    }
    return Inertia::render('bags/edit', [
      'donors' => User::where('role', 'donor')->with('city')->get()->map(function ($donor) {
        return [
          'id' => $donor->id,
          'name' => $donor->name,
        ];
      }),
      'records' => DonationRecord::where('bank_id', auth()->id())->with(['city', 'drive', 'donor'])->orderBy('created_at', 'desc')->get(),
      'bag' => $bloodBag
    ]);
  }

  public function update(Request $request, $id)
  {
    $bloodBag = BloodBag::find($id);
    $validatedData = $request->validate([
      'bag_code' => 'required|max:255',
      'donation_record_id' => 'required|max:255',
      'status' => Rule::in(['available', 'unavailable', 'reserved', 'expired']),
      'expiration_date' => 'required|date',
      'description' => 'nullable|string|max:255',
      'storage_location' => 'nullable|string|max:255',
    ]);
    $bloodBag->update($validatedData);
    return redirect()->route('bags.index');
  }

  public function destroy($id)
  {
    BloodBag::destroy($id);
    return redirect()->back();
  }
}
