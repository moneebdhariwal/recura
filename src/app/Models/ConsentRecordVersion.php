<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConsentRecordVersion extends Model
{
    protected $fillable = ['version', 'content'];
}
