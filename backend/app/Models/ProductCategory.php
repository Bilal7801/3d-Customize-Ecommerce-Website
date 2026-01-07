<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    use HasFactory;

    // Table name
    protected $table = 'product_categories';

    // Primary key
    protected $primaryKey = 'p_cat_id';

    // Disable timestamps if not using created_at and updated_at
    public $timestamps = false;

    // Fillable fields
    protected $fillable = [
        'p_cat_title',
        'p_cat_desc',
    ];

    // Optional: Relationship with Product
    public function products()
    {
        return $this->hasMany(Product::class, 'p_cat_id', 'p_cat_id');
    }
}
