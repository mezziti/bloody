<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/home', function () {
    return Inertia::render('static/home');
})->name('home');


Route::get('/home3', function () {
    return Inertia::render('static/home3');
})->name('home3');