<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class QuestionnaireResponse extends Model
{
    protected $fillable = ['study_id', 'item_id', 'likert_value'];

    public function item(): BelongsTo
    {
        return $this->belongsTo(QuestionnaireItem::class);
    }
}
