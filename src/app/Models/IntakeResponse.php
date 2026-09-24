<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class IntakeResponse extends Model
{
    protected $fillable = [
        'study_id',
        'fear_type',
        'suds_score',
        'severity_band',
        'trigger_text',
        'demographics',
        'excluded',
    ];

    protected $casts = [
        'demographics' => 'array',
        'excluded' => 'boolean',
    ];

    public function participant(): BelongsTo
    {
        return $this->belongsTo(Participant::class);
    }
}
