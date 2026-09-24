<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuestionnaireItem extends Model
{
    protected $fillable = ['framework', 'construct', 'item_text', 'order'];
}
