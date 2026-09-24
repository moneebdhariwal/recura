<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Participant;
use App\Models\VideoAsset;
use App\Models\MatchingRule;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $stats = [
            'total_participants' => Participant::count(),
            'completed' => Participant::whereNotNull('completed_at')->count(),
            'videos' => VideoAsset::count(),
            'rules' => MatchingRule::count(),
        ];

        return Inertia::render('Admin/Dashboard', ['stats' => $stats]);
    }
}
