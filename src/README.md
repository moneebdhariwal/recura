# Recura

Phobia-acceptability research platform built with Laravel 11, React, TypeScript, Inertia.js, and Tailwind CSS.

## Features

- **Admin Panel**: Video upload, matching rule management, response viewer, consent records
- **Participant Flow**: Landing → Eligibility → Consent → Intake → Processing → Video → Discomfort → Questionnaire → Booking → Debrief
- **Personalization**: Rule-based video matching + client-side intro text/audio personalization
- **Two Tracks**: Public and Professional participant paths
- **GDPR-aligned**: Pseudonymous study IDs, separated contact data, withdrawal support

## Requirements

- PHP 8.2+
- Composer 2+
- Node.js 18+
- SQLite (or MySQL/PostgreSQL)

## Installation

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate --no-interaction
php artisan db:seed --class=AdminUserSeeder
php artisan db:seed --class=StudySeeder
npm run build
```

## Running

```bash
php artisan serve
```

## Testing

```bash
vendor/bin/pest
```

## Architecture

- **Backend**: Laravel 11 with Breeze authentication
- **Frontend**: React + TypeScript via Inertia.js
- **Styling**: Tailwind CSS
- **Testing**: Pest PHP

## Key Models

- `Participant` — study session with token-based access
- `IntakeResponse` — fear type, SUDS score, severity band
- `VideoAsset` — uploaded videos with metadata
- `MatchingRule` — fear_type + severity_band → video mapping
- `QuestionnaireItem` — TFA + TAM questionnaire items
- `QuestionnaireResponse` / `OpenTextResponse` — participant answers
- `DiscomfortRating` — pre/post discomfort scores
- `ConsentRecord` / `ConsentRecordVersion` — consent tracking
