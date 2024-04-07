<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\Drive;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DriveController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    return Inertia::render('drives/index', [
      'drives' => Drive::with('city')->with('bloodBank')->orderBy('begin_date', 'asc')->get()->map(function ($drive) {
        return [
          'id' => $drive->id,
          'name' => $drive->name,
          'begin_date' => $drive->begin_date,
          'end_date' => $drive->end_date,
          'location' => $drive->location,
          'description' => $drive->description,
          'city' => $drive->city,
          'bloodBank' => $drive->bloodBank,
        ];
      }),
      'cities' => City::orderBy('name','asc')->get(),
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
  public function show(Drive $drive)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Drive $drive)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Drive $drive)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Drive $drive)
  {
    //
  }
}
