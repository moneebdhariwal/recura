<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ConsentRecord;
use App\Models\Participant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResponseController extends Controller
{
    public function index(Request $request)
    {
        $query = Participant::query();

        if ($request->filled('track')) {
            $query->where('track', $request->track);
        }

        $participants = $query->with(['consentRecord', 'intakeResponse'])->paginate(20);

        return Inertia::render('Admin/Responses/Index', [
            'participants' => $participants,
            'filters' => $request->only('track'),
        ]);
    }

    public function export(Request $request)
    {
        $participants = Participant::with(['intakeResponse', 'questionnaireResponses.item', 'openTextResponses'])->get();

        $data = $participants->map(function ($p) {
            return [
                'study_id' => $p->study_id,
                'track' => $p->track,
                'completed_at' => $p->completed_at,
                'fear_type' => $p->intakeResponse->fear_type ?? null,
                'suds_score' => $p->intakeResponse->suds_score ?? null,
                'severity_band' => $p->intakeResponse->severity_band ?? null,
                'trigger_text' => $p->intakeResponse->trigger_text ?? null,
            ];
        });

        return response()->json($data);
    }

    public function destroy(Request $request, Participant $participant)
    {
        $studyId = $participant->study_id;

        \App\Models\QuestionnaireResponse::where('study_id', $studyId)->delete();
        \App\Models\OpenTextResponse::where('study_id', $studyId)->delete();
        \App\Models\DiscomfortRating::where('study_id', $studyId)->delete();
        \App\Models\IntakeResponse::where('study_id', $studyId)->delete();

        $participant->delete();

        return back()->with('success', 'Participant data withdrawn successfully.');
    }
}
