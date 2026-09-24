<?php

namespace App\Http\Controllers\Participant;

use App\Http\Controllers\Controller;
use App\Models\Participant;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class EligibilityController extends Controller
{
    public function __invoke(Request $request)
    {
        $token = $request->query('token');
        $participant = $this->resolveParticipant($token);

        return Inertia::render('Participant/Eligibility', [
            'token' => $token,
            'participant' => $participant,
        ]);
    }

    public function store(Request $request)
    {
        $token = $request->query('token');
        $participant = $this->resolveParticipant($token);

        $validated = $request->validate([
            'age' => 'required|integer|min:18|max:120',
            'participant_type' => 'required|in:public,professional',
            'fear_type' => 'required|in:spider,height',
            'prior_experience' => 'required|boolean',
            'crisis_indicators' => 'required|boolean',
        ]);

        $participant->update([
            'track' => $validated['participant_type'],
        ]);

        if ($validated['crisis_indicators'] || $validated['age'] < 18) {
            return redirect()->route('exclusion');
        }

        return redirect()->route('participant.consent', ['token' => $token]);
    }

    private function resolveParticipant(?string $token): ?Participant
    {
        if (!$token) {
            $token = Str::random(60);
            $participant = Participant::create([
                'study_id' => 'STUDY-' . strtoupper(Str::random(8)),
                'session_token' => $token,
                'track' => 'public',
            ]);
            return $participant;
        }

        return Participant::where('session_token', $token)->firstOrCreate([
            'session_token' => $token,
        ], [
            'study_id' => 'STUDY-' . strtoupper(Str::random(8)),
            'track' => 'public',
        ]);
    }
}
