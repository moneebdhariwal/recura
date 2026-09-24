<?php

namespace Database\Seeders;

use App\Models\ConsentRecordVersion;
use App\Models\CounterbalanceState;
use App\Models\MatchingRule;
use App\Models\QuestionnaireItem;
use App\Models\VideoAsset;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudySeeder extends Seeder
{
    public function run(): void
    {
        $this->seedQuestionnaireItems();
        $this->seedVideoAssets();
        $this->seedMatchingRules();
        $this->seedConsentVersion();
        $this->seedCounterbalanceState();
    }

    private function seedQuestionnaireItems(): void
    {
        $tfaItems = [
            ['Affective attitude', 'Overall, I feel positively about the idea of this intervention.'],
            ['Burden', 'Taking part in this intervention would feel emotionally demanding.'],
            ['Perceived effectiveness', 'I think this approach could help some people reduce fear or avoidance.'],
            ['Ethicality', 'Using AI and VR in this way would be ethically acceptable if appropriate safeguards were in place.'],
            ['Intervention coherence', 'I understand how this intervention is intended to help with fear.'],
            ['Opportunity costs', 'The demands of taking part would be reasonable compared with the potential benefit.'],
            ['Self-efficacy', 'I would feel able to control the pace of the intervention and stop it if needed.'],
        ];

        $tamItems = [
            ['Perceived usefulness', 'The AI/VR system could be useful as part of support for a specific phobia.'],
            ['Perceived ease of use', 'The system shown appears straightforward to use.'],
            ['Attitude toward use', 'I would have a positive attitude toward using this type of system, if clinically appropriate.'],
            ['Behavioural intention', 'If I had a relevant fear and suitable professional support, I might consider trying this approach.'],
            ['Perceived personalisation', 'Content that felt personalised to my own fear would be more helpful to me than generic content.'],
        ];

        $order = 1;
        foreach ($tfaItems as [$construct, $text]) {
            QuestionnaireItem::updateOrCreate(
                ['framework' => 'TFA', 'construct' => $construct],
                ['item_text' => $text, 'order' => $order++]
            );
        }

        foreach ($tamItems as [$construct, $text]) {
            QuestionnaireItem::updateOrCreate(
                ['framework' => 'TAM', 'construct' => $construct],
                ['item_text' => $text, 'order' => $order++]
            );
        }
    }

    private function seedVideoAssets(): void
    {
        $videos = [
            ['title' => 'Spider — Low Severity', 'phobia_type' => 'spider', 'severity_band' => 'low', 'counterbalance_group' => 'A', 'file_path' => 'videos/spider-low.mp4', 'duration_seconds' => 120, 'supports_overlay' => true, 'overlay_start_time' => 30, 'overlay_end_time' => 45, 'status' => 'active'],
            ['title' => 'Spider — Medium Severity', 'phobia_type' => 'spider', 'severity_band' => 'medium', 'counterbalance_group' => 'A', 'file_path' => 'videos/spider-medium.mp4', 'duration_seconds' => 120, 'supports_overlay' => true, 'overlay_start_time' => 30, 'overlay_end_time' => 45, 'status' => 'active'],
            ['title' => 'Spider — High Severity', 'phobia_type' => 'spider', 'severity_band' => 'high', 'counterbalance_group' => 'A', 'file_path' => 'videos/spider-high.mp4', 'duration_seconds' => 120, 'supports_overlay' => true, 'overlay_start_time' => 30, 'overlay_end_time' => 45, 'status' => 'active'],
            ['title' => 'Height — Low Severity', 'phobia_type' => 'height', 'severity_band' => 'low', 'counterbalance_group' => 'B', 'file_path' => 'videos/height-low.mp4', 'duration_seconds' => 120, 'supports_overlay' => true, 'overlay_start_time' => 30, 'overlay_end_time' => 45, 'status' => 'active'],
            ['title' => 'Height — Medium Severity', 'phobia_type' => 'height', 'severity_band' => 'medium', 'counterbalance_group' => 'B', 'file_path' => 'videos/height-medium.mp4', 'duration_seconds' => 120, 'supports_overlay' => true, 'overlay_start_time' => 30, 'overlay_end_time' => 45, 'status' => 'active'],
            ['title' => 'Height — High Severity', 'phobia_type' => 'height', 'severity_band' => 'high', 'counterbalance_group' => 'B', 'file_path' => 'videos/height-high.mp4', 'duration_seconds' => 120, 'supports_overlay' => true, 'overlay_start_time' => 30, 'overlay_end_time' => 45, 'status' => 'active'],
        ];

        foreach ($videos as $video) {
            VideoAsset::updateOrCreate(
                ['title' => $video['title']],
                $video
            );
        }
    }

    private function seedMatchingRules(): void
    {
        $videos = VideoAsset::all();

        foreach ($videos as $video) {
            MatchingRule::updateOrCreate(
                [
                    'fear_type' => $video->phobia_type,
                    'severity_band' => $video->severity_band,
                ],
                ['video_asset_id' => $video->id]
            );
        }
    }

    private function seedConsentVersion(): void
    {
        ConsentRecordVersion::updateOrCreate(
            ['version' => '1.0'],
            ['content' => 'Consent form version 1.0 content.']
        );
    }

    private function seedCounterbalanceState(): void
    {
        CounterbalanceState::updateOrCreate(
            ['key' => 'scenario_counter'],
            ['value' => 0]
        );
    }
}