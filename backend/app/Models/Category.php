<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory;

    // Table name (optional if it follows Laravel's naming convention)
    protected $table = 'categories';

    // Primary key
    protected $primaryKey = 'cat_id';

    // Disable timestamps if not used
    public $timestamps = false;

    // Fillable fields
    protected $fillable = [
        'cat_title',
        'cat_desc',
    ];

    // Optional: Relationship with Product
    public function products()
    {
        return $this->hasMany(Product::class, 'cat_id', 'cat_id');
    }
}
