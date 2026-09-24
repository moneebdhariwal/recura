<?php

namespace App\Http\Controllers\Participant;

use App\Http\Controllers\Controller;
use App\Models\Participant;
use App\Services\PersonalizationService;
use App\Services\MatchingService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VideoController extends Controller
{
    public function __construct(
        private MatchingService $matching,
        private PersonalizationService $personalization
    ) {}

    public function __invoke(Request $request)
    {
        $token = $request->query('token');
        $participant = Participant::where('session_token', $token)->firstOrFail();

        $intake = $participant->intakeResponse;
        if (!$intake) {
            return redirect()->route('participant.intake', ['token' => $token]);
        }

        $video = $this->matching->matchVideo($intake);
        $intro = $this->personalization->buildIntro($participant, $intake);

        return Inertia::render('Participant/Video', [
            'token' => $token,
            'participant' => $participant,
            'video' => $video,
            'intro' => $intro,
            'noVideo' => !$video,
        ]);
    }
}
