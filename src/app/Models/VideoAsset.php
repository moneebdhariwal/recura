<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class VideoAsset extends Model
{
    protected $fillable = [
        'title',
        'phobia_type',
        'severity_band',
        'counterbalance_group',
        'file_path',
        'thumbnail_path',
        'duration_seconds',
        'supports_overlay',
        'overlay_start_time',
        'overlay_end_time',
        'status',
        'uploaded_by',
        'description',
    ];

    protected $casts = [
        'supports_overlay' => 'boolean',
    ];

    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    public function matchingRules(): HasMany
    {
        return $this->hasMany(MatchingRule::class);
    }
}
