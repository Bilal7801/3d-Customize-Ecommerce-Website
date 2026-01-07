<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    // Custom primary key
    protected $primaryKey = 'product_id';

    // Disable timestamps if you're not using created_at / updated_at
    public $timestamps = false;

    // Fillable fields for mass assignment
 protected $fillable = [
    'product_title',
    'p_cat_id',
    'cat_id',
    'product_price',
    'product_keyword',
    'product_desc',
    'product_img1',
    'product_img2',
    'product_img3',
    'date',
    'product_size',
    'product_color',
    'stock_status',
    'is_featured',
];
  protected $casts = [
        'date' => 'datetime', // ✅ Cast it to datetime
        'is_featured' => 'boolean',
    ];
    // Optional: Relationships
    public function productCategory()
    {
        return $this->belongsTo(ProductCategory::class, 'p_cat_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'cat_id');
    }
}
