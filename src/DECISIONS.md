# Architecture Decisions

## Stack
- Laravel 11 + React + TypeScript + Inertia.js + Tailwind CSS
- Pest PHP for testing
- SQLite for development (configurable for production)

## Data Model
- Pseudonymous: `study_id` is the primary identifier, `session_token` for anonymous access
- No foreign keys between participant and response tables — linked by `study_id`
- `name` and `trigger_text` are optional everywhere, with graceful fallbacks

## Personalization
- **Server-side**: `PersonalizationService` builds intro text from optional `name` and `trigger_text`, optionally generates audio via ElevenLabs
- **Client-side**: Video overlay rendered in React during playback window
- No video files are ever modified per participant

## Matching
- Rule-based: `MatchingRule` maps `(fear_type, severity_band)` → `VideoAsset`
- `MatchingService::matchVideo()` returns the matched video
- `CounterbalanceState` tracks within-subjects counterbalancing

## Ethics
- Pause/stop/exit controls visible during video and questionnaire stages
- Consent records stored separately from response data
- Withdrawal route deletes all participant data

## Testing
- Pest 2.x with `RefreshDatabase` trait
- Full participant journey test covers all stages
