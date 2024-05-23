<?php

namespace App\Http\Controllers\Auth;

use Exception;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\http\Traits\IfFieldExistsTrait;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use App\Models\City;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Auth\Events\Registered;
use App\Providers\RouteServiceProvider;

class RegisteredUserController extends Controller
{
  use IfFieldExistsTrait;

  public function create(): Response
  {
    return Inertia::render('Auth/Register', ['cities' => City::orderBy('name', 'asc')->get(),]);
  }

  /**
   * Handle an incoming registration request.
   *
   * @throws \Illuminate\Validation\ValidationException
   */
  public function store(Request $request): RedirectResponse
  {
    $validatedData = $request->validate([
      'name' => 'required|string|max:255',
      'address' => 'nullable|string|max:255',
      'role' => Rule::in(['donor', 'recipient', 'bank']),
      'phone1' => 'required|string|max:10',
      'phone2' => 'nullable|string|max:10',
      'city_id' => 'required|string|max:255',
      'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
      'password' => ['required', Rules\Password::defaults()],
    ]);

    if ($validatedData['role'] != 'bank') {
      $validatedData['age'] = $request->validate(['age' => 'required|integer'])['age'];
      $validatedData['gender'] = $request->validate(['gender' => Rule::in(['male', 'female'])])['gender'];
      $validatedData['blood_type'] = $request->validate(['blood_type' => Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])])['blood_type'];
      $validatedData['last_donation_date'] = $request->validate(['last_donation_date' => 'nullable|date'])['last_donation_date'];
      $validatedData['status'] = 'active';
    } else {
      $validatedData['status'] = 'inactive';
    }

    $validatedData['password'] = Hash::make($request->password);

    $user = User::create($validatedData);

    event(new Registered($user));
    if ($validatedData['status'] == 'active') {
      Auth::login($user);
      return redirect(RouteServiceProvider::HOME);
    } else {
      return redirect()->route('login')->with('status', 'Your account has been created successfully. Please wait to activate it the');
    }

  }
}
