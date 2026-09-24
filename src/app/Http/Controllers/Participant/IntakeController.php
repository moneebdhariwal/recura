<?php

namespace App\Http\Controllers\Participant;

use App\Http\Controllers\Controller;
use App\Models\IntakeResponse;
use App\Models\Participant;
use App\Services\MatchingService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IntakeController extends Controller
{
    public function __construct(private MatchingService $matching) {}

    public function __invoke(Request $request)
    {
        $token = $request->query('token');
        $participant = Participant::where('session_token', $token)->firstOrFail();

        return Inertia::render('Participant/Intake', [
            'token' => $token,
            'participant' => $participant,
        ]);
    }

    public function store(Request $request)
    {
        $token = $request->query('token');
        $participant = Participant::where('session_token', $token)->firstOrFail();

        $validated = $request->validate([
            'fear_type' => 'required|in:spider,height',
            'suds_score' => 'required|integer|min:0|max:100',
            'trigger_text' => 'nullable|string|max:500',
            'name' => 'nullable|string|max:255',
            'demographics' => 'nullable|array',
        ]);

        $severityBand = $this->calculateSeverityBand($validated['suds_score']);

        $participant->update(['name' => $validated['name'] ?? null]);

        $intake = IntakeResponse::create([
            'study_id' => $participant->study_id,
            'fear_type' => $validated['fear_type'],
            'suds_score' => $validated['suds_score'],
            'severity_band' => $severityBand,
            'trigger_text' => $validated['trigger_text'] ?? null,
            'demographics' => $validated['demographics'] ?? null,
        ]);

        return redirect()->route('participant.processing', ['token' => $token]);
    }

    private function calculateSeverityBand(int $score): string
    {
        if ($score <= 33) return 'low';
        if ($score <= 66) return 'medium';
        return 'high';
    }
}
