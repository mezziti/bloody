<?php

use App\Http\Controllers\DonorController;
use App\Http\Controllers\DriveController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/test', function () {
    return Inertia::render('test/test');
})->middleware(['auth'])->name('test');

Route::get('/test2', function () {
    return Inertia::render('test/test2');
})->name('test2');

Route::get('/test3', function () {
    return Inertia::render('test/test3');
})->name('test3');

Route::get('/test1', function () {
    return Inertia::render('test/test1');
})->name('test1');

Route::get('/test4', function () {
    return Inertia::render('test/test4');
})->name('test4');

Route::get('/test5', function () {
    return Inertia::render('test/test5');
})->name('test5');

Route::get('/test6', function () {
    return Inertia::render('test/test6');
})->name('test6');

Route::get('/donors', [DonorController::class,'index'])->name('donors');
Route::resource('drives', DriveController::class);



require __DIR__.'/static.php';
require __DIR__.'/auth.php';
