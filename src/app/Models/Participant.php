<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Participant extends Model
{
    protected $fillable = ['study_id', 'name', 'track', 'session_token', 'completed_at'];

    protected $casts = [
        'completed_at' => 'datetime',
    ];

    public function consentRecord(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(ConsentRecord::class, 'study_id', 'study_id');
    }

    public function intakeResponse(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(IntakeResponse::class, 'study_id', 'study_id');
    }

    public function questionnaireResponses(): HasMany
    {
        return $this->hasMany(QuestionnaireResponse::class, 'study_id', 'study_id');
    }

    public function openTextResponses(): HasMany
    {
        return $this->hasMany(OpenTextResponse::class, 'study_id', 'study_id');
    }

    public function discomfortRatings(): HasMany
    {
        return $this->hasMany(DiscomfortRating::class, 'study_id', 'study_id');
    }
}
