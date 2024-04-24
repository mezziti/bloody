<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\Drive;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GuestPagesController extends Controller
{

  public function drives()
  {
    return Inertia::render('drives/drives', [
      'drives' => Drive::with('city')->with('bank')->orderBy('begin_date', 'desc')->get()->map(function ($drive) {
        return [
          'id' => $drive->id,
          'name' => $drive->name,
          'begin_date' => $drive->begin_date,
          'end_date' => $drive->end_date,
          'location' => $drive->location,
          'description' => $drive->description,
          'city' => $drive->city,
          'bank' => $drive->bank,
        ];
      }),
      'cities' => City::orderBy('name', 'asc')->get(),
    ]);
  }

  


}
