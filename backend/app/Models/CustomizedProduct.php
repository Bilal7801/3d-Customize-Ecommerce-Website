<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomizedProduct extends Model
{
    protected $table = 'customized_products';

    protected $fillable = [
        'user_id',
        'product_id',
        'custom_name',
        'price',
        'image_front',
        'image_back',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
