<?php

namespace App\Http\Controllers\Participant;

use App\Http\Controllers\Controller;
use App\Models\DiscomfortRating;
use App\Models\Participant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DiscomfortController extends Controller
{
    public function __invoke(Request $request)
    {
        $token = $request->query('token');
        $participant = Participant::where('session_token', $token)->firstOrFail();

        return Inertia::render('Participant/Discomfort', [
            'token' => $token,
            'participant' => $participant,
        ]);
    }

    public function store(Request $request)
    {
        $token = $request->query('token');
        $participant = Participant::where('session_token', $token)->firstOrFail();

        $validated = $request->validate([
            'rating' => 'required|integer|min:0|max:10',
        ]);

        DiscomfortRating::create([
            'study_id' => $participant->study_id,
            'stage' => 'post',
            'rating_value' => $validated['rating'],
        ]);

        return redirect()->route('participant.questionnaire', ['token' => $token]);
    }
}
