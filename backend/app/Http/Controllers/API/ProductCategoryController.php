<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductCategory;
use Illuminate\Http\JsonResponse;

class ProductCategoryController extends Controller
{
    public function index(): JsonResponse
    {
        // Get all product categories
        $productCategories = ProductCategory::all();

        return response()->json($productCategories);
    }
   public function show($id)
{
    $productCategory = ProductCategory::find($id);

    if (!$productCategory) {
        return response()->json(['message' => 'Product category not found'], 404);
    }

    return response()->json($productCategory);
}
 
}
