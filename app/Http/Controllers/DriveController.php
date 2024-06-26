<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\Drive;
use App\Models\ParticipantDrive;
use App\Rules\EndDate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DriveController extends Controller
{

  public function __construct()
  {
    $this->middleware('bank')->except(['show']);
  }

  public function index()
  {
    return Inertia::render('drives/index', [
      'drives' => Drive::where('bank_id', auth()->id())->with('city')->orderBy('created_at', 'desc')->paginate(10),
      'cities' => City::orderBy('name', 'asc')->get(),
    ]); 
  }

  public function create()
  {
    return Inertia::render('drives/create', ['cities' => City::orderBy('name', 'asc')->get(),]);
  }

  public function store(Request $request)
  {
    $validatedData = $request->validate([
      'name' => 'required|string|max:255',
      'location' => 'string|max:255',
      'description' => 'required|string|max:255',
      'city_id' => 'required|string|max:255',
      'end_date' => 'date',
      'begin_date' => ['date', new EndDate],
    ]);
    $validatedData['bank_id'] = auth()->id();
    Drive::create($validatedData);
    return redirect()->route('drives.index');
  }

  public function show(Drive $drive)
  {
    if ($drive->bank_id != auth()->id()) {
      return abort(404, 'Drive Not Found');
    }
    $drive = $drive->load(['city', 'participants']);
    // dd($drive);
    return Inertia::render('drives/show', [
      'drive' => $drive,
    ]);
  }

  public function edit(Drive $drive)
  {
    if ($drive->bank_id != auth()->id()) {
      return abort(404, 'Drive Not Found');
    }
    return Inertia::render('drives/edit', [
      'cities' => City::orderBy('name', 'asc')->get(),
      'drive' => $drive
    ]);
  }

  public function update(Request $request, Drive $drive)
  {
    if ($drive->bank_id != auth()->id()) {
      return abort(404, 'Drive Not Found');
    }
    $validatedData = $request->validate([
      'name' => 'required|string|max:255',
      'location' => 'nullable|string|max:255',
      'description' => 'required|string|max:255',
      'city_id' => 'required|string|max:255',
      'end_date' => 'date',
      'begin_date' => ['date', new EndDate],
    ]);
    $drive->update($validatedData);
    return redirect()->route('drives.index');
  }

  public function destroy(Drive $drive)
  {
    if ($drive->bank_id != auth()->id()) {
      return abort(404, 'Drive Not Found');
    }
    Drive::destroy($drive->id);
    return redirect()->route('drives.index');
  }

  public function approve(Request $request ,$id)
  {
    $participantDrive = ParticipantDrive::findOrFail($id);
    $participantDrive->update([
      'status' => 'approved',
      'donation_date' => $request->donation_date,
    ]);
    return redirect()->back();
  }

  public function reject(Request $request, $id)
  {
    $participantDrive = ParticipantDrive::findOrFail($id);
    $participantDrive->update(['status' => 'rejected', 'message' => $request->message]);
    return redirect()->back();
  }
}
