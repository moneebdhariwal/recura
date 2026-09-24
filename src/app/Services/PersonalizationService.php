<?php

namespace App\Services;

use App\Models\Participant;
use App\Models\IntakeResponse;
use Illuminate\Support\Facades\Cache;

class PersonalizationService
{
    public function buildIntro(Participant $participant, IntakeResponse $intake): array
    {
        $name = $participant->name ?: 'there';
        $trigger = $intake->trigger_text ?: 'this situation';
        $fearType = $intake->fear_type;

        $introText = "Hi {$name}, based on what you shared, this scenario reflects a situation involving {$trigger}.";

        $audioUrl = $this->getOrCreateAudio($introText);

        return [
            'intro_text' => $introText,
            'audio_url' => $audioUrl,
        ];
    }

    private function getOrCreateAudio(string $text): ?string
    {
        $cacheKey = 'intro_audio:' . md5($text);

        return Cache::remember($cacheKey, now()->addDays(30), function () use ($text) {
            $apiKey = config('services.elevenlabs.api_key');

            if (!$apiKey) {
                return null;
            }

            try {
                $client = new \GuzzleHttp\Client();
                $response = $client->post('https://api.elevenlabs.io/v1/text-to-speech/' . config('services.elevenlabs.voice_id'), [
                    'headers' => [
                        'xi-api-key' => $apiKey,
                        'Content-Type' => 'application/json',
                    ],
                    'json' => [
                        'text' => $text,
                        'model_id' => 'eleven_monolingual_v1',
                        'voice_settings' => [
                            'stability' => 0.5,
                            'similarity_boost' => 0.5,
                        ],
                    ],
                ]);

                $audioContent = $response->getBody()->getContents();
                $path = 'intro-audio/' . md5($text) . '.mp3';
                file_put_contents(storage_path('app/public/' . $path), $audioContent);

                return asset('storage/' . $path);
            } catch (\Throwable $e) {
                return null;
            }
        });
    }
}
