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
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $validatedData=$request->validate([
            'name' => 'required|string|max:255',
            'age' => 'required|integer',
            'type' => Rule::in(['Donor', 'Recipient']),
            'gender' => Rule::in(['male', 'female']),
            'blood_type' => Rule::in(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
            'phone1' => 'required|string|max:10',
            'city_id' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', Rules\Password::defaults()],
        ]);

        if ($request->phone2) {
            $validatedData['phone2']=$request->validate([
                'phone2' => 'string|max:10'
            ])['phone2'];
        }

        if ($request->address) {
            $validatedData['address']=$request->validate([
            'address' => 'string|max:255',
            ])['address'];
        }

        if ($request->last_donation_date) {
            $validatedData['last_donation_date']=$request->validate([
                'last_donation_date' => 'date'
            ])['last_donation_date'];
        }

        $validatedData['password'] = Hash::make($request->password);

        $user = User::create($validatedData);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
