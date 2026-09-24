<?php

namespace App\Http\Controllers\Participant;

use App\Http\Controllers\Controller;
use App\Models\Participant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DebriefController extends Controller
{
    public function __invoke(Request $request)
    {
        $token = $request->query('token');
        $participant = Participant::where('session_token', $token)->firstOrFail();

        $participant->update(['completed_at' => now()]);

        return Inertia::render('Participant/Debrief', [
            'token' => $token,
            'participant' => $participant,
        ]);
    }
}

