<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class StaticPagesController extends Controller
{
    public function index($page)
    {
        return Inertia::render('static/'. $page);
    }
}
