<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MatchingRule;
use App\Models\VideoAsset;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MatchingRuleController extends Controller
{
    public function index()
    {
        $rules = MatchingRule::with('videoAsset')->get();
        $videos = VideoAsset::where('status', 'active')->get();

        return Inertia::render('Admin/MatchingRules/Index', [
            'rules' => $rules,
            'videos' => $videos,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'fear_type' => 'required|in:spider,height',
            'severity_band' => 'required|in:low,medium,high',
            'video_asset_id' => 'required|exists:video_assets,id',
        ]);

        MatchingRule::updateOrCreate(
            [
                'fear_type' => $validated['fear_type'],
                'severity_band' => $validated['severity_band'],
            ],
            $validated
        );

        return back()->with('success', 'Matching rule saved.');
    }

    public function destroy(MatchingRule $rule)
    {
        $rule->delete();

        return back()->with('success', 'Rule deleted.');
    }
}
