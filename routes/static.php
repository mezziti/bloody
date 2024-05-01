<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
  return Inertia::render('static/home');
});

Route::get('/donation-process', function () {
  return Inertia::render('static/donationProcess');
});
