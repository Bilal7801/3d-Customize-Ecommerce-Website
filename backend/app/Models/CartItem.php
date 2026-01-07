<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    protected $table = 'cart_items';
    protected $fillable = ['user_id', 'product_id', 'quantity', 'color', 'size'];


    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
