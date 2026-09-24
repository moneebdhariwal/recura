<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OpenTextResponse extends Model
{
    protected $fillable = ['study_id', 'question_key', 'response_text'];
}
