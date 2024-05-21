<?php

use App\Http\Controllers\BloodRequestController;
use App\Http\Controllers\DonationPostController;
use App\Http\Controllers\DonationRecordController;
use App\Http\Controllers\DonationRequestController;
use App\Http\Controllers\DriveController;
use App\Http\Controllers\GuestPagesController;
use App\Http\Controllers\ParticipantDriveController;
use App\Http\Controllers\PostDonorController;
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
Route::get('/donors/{donor}', [UserController::class, 'showDonor'])->name('donors.show');
Route::get('/banks/{bank}', [UserController::class, 'showBank'])->name('banks.show');
Route::get('/banks', [UserController::class, 'banks'])->name('banks');
Route::get('/drives', [GuestPagesController::class, 'drives'])->name('drives');
Route::get('/requests', [GuestPagesController::class, 'requests'])->name('requests');


Route::middleware('auth')->prefix('dashboard')->group(function() {
  Route::put('/approve/{id}', [DriveController::class, 'approve'])->name('approve');
  Route::put('/reject/{id}', [DriveController::class, 'reject'])->name('reject');
  Route::get('/participations', [UserController::class, 'participations'])->name('participations');
  Route::get('/MyDonations', [UserController::class, 'donations'])->name('donations');
  Route::get('/donationRequests/MyRequests', [DonationRequestController::class, 'myRequests'])->name('donationRequests.myRequests');
  Route::resources([
    'drives' => DriveController::class,
    'posts' => DonationPostController::class,
    'participants' => ParticipantDriveController::class,
    'bloodRequests' => BloodRequestController::class,
    'donationRequests' => DonationRequestController::class,
    'records' => DonationRecordController::class,
    'donations' => PostDonorController::class,
  ]);
});



require __DIR__ . '/static.php';
require __DIR__ . '/auth.php';
