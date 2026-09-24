<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ConsentRecord;
use App\Models\Participant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConsentRecordController extends Controller
{
    public function index(Request $request)
    {
        $query = ConsentRecord::query();

        if ($request->filled('study_id')) {
            $query->where('study_id', $request->study_id);
        }

        $records = $query->orderByDesc('timestamp')->paginate(20);

        return Inertia::render('Admin/ConsentRecords/Index', [
            'records' => $records,
            'filters' => $request->only('study_id'),
        ]);
    }

    public function withdraw(Participant $participant)
    {
        $studyId = $participant->study_id;

        \App\Models\QuestionnaireResponse::where('study_id', $studyId)->delete();
        \App\Models\OpenTextResponse::where('study_id', $studyId)->delete();
        \App\Models\DiscomfortRating::where('study_id', $studyId)->delete();
        \App\Models\IntakeResponse::where('study_id', $studyId)->delete();

        $participant->delete();

        return back()->with('success', 'All data for participant ' . $studyId . ' has been withdrawn.');
    }
}
