<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Design extends Model
{
    protected $fillable = ['user_id','title', 'quantity', 'price', 'image_front', 'image_back'];
}

