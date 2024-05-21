<?php

namespace App\Http\Controllers;

use App\Models\ParticipantDrive;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ParticipantDriveController extends Controller
{
  public function index()
  {
  }

  public function create()
  {
  }

  public function store(Request $request)
  {
    $driveId = $request->input('drive_id');
    if (ParticipantDrive::where('user_id', auth()->id())->where('drive_id', $driveId)->exists()) {
      return redirect()->route('drives')->with('session', ['id' =>$driveId, 'message' =>'You are already participated', 'type' => 'text-primary']);
    }
    $validatedData = $request->validate(['drive_id' => 'required|integer']);
    $validatedData['user_id'] = auth()->id();
    ParticipantDrive::create($validatedData);
    return redirect()->back()->with('session', ['id' => $driveId, 'message' =>'You participated successfully', 'type' => 'text-green-500']);
  }

  public function show($id)
  {
  }

  public function edit($id)
  {
  }

  public function update(Request $request, $id)
  {
  }

  public function destroy($id)
  {
  }
}
