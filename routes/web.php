<?php

use App\Http\Controllers\DonationPostController;
use App\Http\Controllers\DriveController;
use App\Http\Controllers\GuestPagesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
  return Inertia::render('static/home');
});

Route::get('/dashboard', function () {
  return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/donors', [UserController::class, 'donors'])->name('donors');
Route::get('/banks', [UserController::class, 'banks'])->name('banks');
Route::get('/drives', [GuestPagesController::class, 'drives'])->name('drives');
Route::get('/requests', [GuestPagesController::class, 'requests'])->name('requests');


Route::middleware('auth')->prefix('dashboard')->group(function() {
  Route::resources([
    'drives' => DriveController::class,
    'posts' => DonationPostController::class,
  ]);
});



require __DIR__ . '/static.php';
require __DIR__ . '/auth.php';
