<?php

namespace App\Http\Controllers\Participant;

use App\Http\Controllers\Controller;
use App\Models\Participant;
use App\Models\QuestionnaireItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuestionnaireController extends Controller
{
    public function __invoke(Request $request)
    {
        $token = $request->query('token');
        $participant = Participant::where('session_token', $token)->firstOrFail();

        $items = QuestionnaireItem::orderBy('order')->get();

        return Inertia::render('Participant/Questionnaire', [
            'token' => $token,
            'participant' => $participant,
            'items' => $items,
        ]);
    }

    public function store(Request $request)
    {
        $token = $request->query('token');
        $participant = Participant::where('session_token', $token)->firstOrFail();

        $validated = $request->validate([
            'responses' => 'required|array',
            'responses.*.item_id' => 'required|exists:questionnaire_items,id',
            'responses.*.likert_value' => 'required|integer|min:1|max:5',
            'open_text' => 'nullable|array',
        ]);

        foreach ($validated['responses'] as $response) {
            \App\Models\QuestionnaireResponse::create([
                'study_id' => $participant->study_id,
                'item_id' => $response['item_id'],
                'likert_value' => $response['likert_value'],
            ]);
        }

        if (!empty($validated['open_text'])) {
            foreach ($validated['open_text'] as $key => $text) {
                \App\Models\OpenTextResponse::create([
                    'study_id' => $participant->study_id,
                    'question_key' => $key,
                    'response_text' => $text,
                ]);
            }
        }

        $participant->update(['completed_at' => now()]);

        return redirect()->route('participant.booking', ['token' => $token]);
    }
}
