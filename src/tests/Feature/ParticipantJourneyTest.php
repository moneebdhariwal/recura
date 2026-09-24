<?php

namespace Tests\Feature;

use App\Models\ConsentRecord;
use App\Models\IntakeResponse;
use App\Models\Participant;
use App\Models\QuestionnaireResponse;
use App\Models\VideoAsset;
use Database\Seeders\StudySeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ParticipantJourneyTest extends TestCase
{
    use RefreshDatabase;

    public function test_participant_can_complete_full_journey(): void
    {
        $this->seed(StudySeeder::class);

        $token = 'test-token-' . uniqid();

        $participant = Participant::create([
            'study_id' => 'STUDY-TEST',
            'session_token' => $token,
            'track' => 'public',
        ]);

        $response = $this->get("/eligibility?token={$token}");
        $response->assertStatus(200);

        $response = $this->post("/eligibility?token={$token}", [
            'age' => 25,
            'participant_type' => 'public',
            'fear_type' => 'spider',
            'prior_experience' => 0,
            'crisis_indicators' => 0,
        ]);
        $response->assertRedirect("/consent?token={$token}");

        $response = $this->post("/consent?token={$token}", [
            'consent_given' => true,
            'contact_email' => null,
        ]);
        $response->assertRedirect("/intake?token={$token}");

        $this->assertDatabaseHas('consent_records', [
            'study_id' => 'STUDY-TEST',
        ]);

        $response = $this->post("/intake?token={$token}", [
            'fear_type' => 'spider',
            'suds_score' => 60,
            'trigger_text' => 'being near a spider',
            'name' => 'Alex',
            'demographics' => [],
        ]);
        $response->assertRedirect("/processing?token={$token}");

        $this->assertDatabaseHas('intake_responses', [
            'study_id' => 'STUDY-TEST',
            'fear_type' => 'spider',
            'severity_band' => 'medium',
        ]);

        $response = $this->get("/processing?token={$token}");
        $response->assertStatus(200);

        $response = $this->get("/video?token={$token}");
        $response->assertStatus(200);

        $response = $this->post("/discomfort-check?token={$token}", [
            'rating' => 3,
        ]);
        $response->assertRedirect("/questionnaire?token={$token}");

        $this->assertDatabaseHas('discomfort_ratings', [
            'study_id' => 'STUDY-TEST',
            'stage' => 'post',
            'rating_value' => 3,
        ]);

        $items = \App\Models\QuestionnaireItem::all();
        $responses = $items->map(fn($item) => [
            'item_id' => $item->id,
            'likert_value' => 4,
        ])->toArray();

        $response = $this->post("/questionnaire?token={$token}", [
            'responses' => $responses,
            'open_text' => [
                'benefits' => 'Good',
                'concerns' => 'None',
                'suggestions' => 'None',
            ],
        ]);
        $response->assertRedirect("/booking?token={$token}");

        $this->assertDatabaseHas('participants', [
            'study_id' => 'STUDY-TEST',
            'completed_at' => now()->toDateTimeString(),
        ]);

        $response = $this->get("/booking?token={$token}");
        $response->assertStatus(200);

        $response = $this->get("/debrief?token={$token}");
        $response->assertStatus(200);
    }

    public function test_matching_engine_returns_correct_video(): void
    {
        $this->seed(StudySeeder::class);

        $video = VideoAsset::where('phobia_type', 'spider')
            ->where('severity_band', 'medium')
            ->first();

        $this->assertNotNull($video);

        $rule = \App\Models\MatchingRule::where('fear_type', 'spider')
            ->where('severity_band', 'medium')
            ->first();

        $this->assertEquals($video->id, $rule->video_asset_id);
    }

    public function test_personalization_service_builds_correct_intro(): void
    {
        $this->seed(StudySeeder::class);

        $participant = Participant::create([
            'study_id' => 'STUDY-PERS',
            'name' => 'Alex',
            'track' => 'public',
            'session_token' => 'test-token',
        ]);

        $intake = IntakeResponse::create([
            'study_id' => 'STUDY-PERS',
            'fear_type' => 'spider',
            'suds_score' => 60,
            'severity_band' => 'medium',
            'trigger_text' => 'being near a spider',
        ]);

        $service = new \App\Services\PersonalizationService();
        $result = $service->buildIntro($participant, $intake);

        $this->assertStringContainsString('Alex', $result['intro_text']);
        $this->assertStringContainsString('being near a spider', $result['intro_text']);
    }

    public function test_personalization_service_falls_back_when_fields_blank(): void
    {
        $this->seed(StudySeeder::class);

        $participant = Participant::create([
            'study_id' => 'STUDY-PERS2',
            'name' => null,
            'track' => 'public',
            'session_token' => 'test-token2',
        ]);

        $intake = IntakeResponse::create([
            'study_id' => 'STUDY-PERS2',
            'fear_type' => 'height',
            'suds_score' => 40,
            'severity_band' => 'low',
            'trigger_text' => null,
        ]);

        $service = new \App\Services\PersonalizationService();
        $result = $service->buildIntro($participant, $intake);

        $this->assertStringContainsString('there', $result['intro_text']);
        $this->assertStringContainsString('this situation', $result['intro_text']);
    }
}