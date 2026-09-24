<?php

namespace App\Http\Controllers\Participant;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExclusionController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Participant/Exclusion');
    }
}
