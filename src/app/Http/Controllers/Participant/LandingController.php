<?php

namespace App\Http\Controllers\Participant;

use App\Http\Controllers\Controller;
use App\Models\Participant;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function __invoke(Request $request)
    {
        $token = $request->query('token');

        if ($token) {
            $participant = Participant::where('session_token', $token)->first();
            if ($participant) {
                return redirect()->route('participant.eligibility', ['token' => $token]);
            }
        }

        $newToken = Str::random(60);

        return Inertia::render('Participant/Landing', [
            'token' => $newToken,
        ]);
    }
}
