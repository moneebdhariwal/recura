<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CounterbalanceState extends Model
{
    protected $fillable = ['key', 'value'];

    protected $table = 'counterbalance_state';
}
