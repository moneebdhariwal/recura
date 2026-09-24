<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MatchingRule extends Model
{
    protected $fillable = ['fear_type', 'severity_band', 'video_asset_id'];

    public function videoAsset(): BelongsTo
    {
        return $this->belongsTo(VideoAsset::class);
    }
}
