<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DiscomfortRating extends Model
{
    protected $fillable = ['study_id', 'stage', 'rating_value'];
}
