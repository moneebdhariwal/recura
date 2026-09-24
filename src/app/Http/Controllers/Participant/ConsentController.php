<?php

namespace App\Http\Controllers\Participant;

use App\Http\Controllers\Controller;
use App\Models\ConsentRecord;
use App\Models\Participant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConsentController extends Controller
{
    public function __invoke(Request $request)
    {
        $token = $request->query('token');
        $participant = Participant::where('session_token', $token)->firstOrFail();

        return Inertia::render('Participant/Consent', [
            'token' => $token,
            'participant' => $participant,
        ]);
    }

    public function store(Request $request)
    {
        $token = $request->query('token');
        $participant = Participant::where('session_token', $token)->firstOrFail();

        $validated = $request->validate([
            'consent_given' => 'required|accepted',
            'contact_email' => 'nullable|email',
        ]);

        ConsentRecord::create([
            'study_id' => $participant->study_id,
            'consent_version' => '1.0',
            'timestamp' => now(),
            'contact_email' => $validated['contact_email'] ?? null,
            'ip_address' => $request->ip(),
        ]);

        return redirect()->route('participant.intake', ['token' => $token]);
    }
}
