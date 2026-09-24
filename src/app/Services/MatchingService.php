<?php

namespace App\Services;

use App\Models\IntakeResponse;
use App\Models\MatchingRule;
use App\Models\VideoAsset;
use App\Models\CounterbalanceState;

class MatchingService
{
    public function matchVideo(IntakeResponse $intake): ?VideoAsset
    {
        $rule = MatchingRule::where('fear_type', $intake->fear_type)
            ->where('severity_band', $intake->severity_band)
            ->whereHas('videoAsset', function ($query) {
                $query->where('status', 'active');
            })
            ->first();

        return $rule?->videoAsset;
    }

    public function getCounterbalancedScenario(string $primaryFear): string
    {
        $counter = CounterbalanceState::firstOrCreate(
            ['key' => 'scenario_counter'],
            ['value' => 0]
        );

        $counter->increment('value');

        $isEven = $counter->value % 2 === 0;

        if ($primaryFear === 'spider') {
            return $isEven ? 'spider' : 'height';
        }

        return $isEven ? 'height' : 'spider';
    }
}
