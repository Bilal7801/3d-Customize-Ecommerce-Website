<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    // app/Models/Todo.php
protected $fillable = ['title', 'description', 'status'];

}
