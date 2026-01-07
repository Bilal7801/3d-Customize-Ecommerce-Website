<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
{
    $query = Product::query();

    // Optional filters
    if ($request->has('search')) {
        $search = $request->query('search');
        $query->where('product_title', 'LIKE', "%{$search}%")
              ->orWhere('product_keyword', 'LIKE', "%{$search}%");
    }

    if ($request->has('category_id')) {
        $query->where('cat_id', $request->category_id);
    }

    // Filter by color (comma-separated values)
    if ($request->has('color')) {
        $color = $request->color;
        $query->where('product_color', 'LIKE', "%{$color}%");
    }

    // Filter by size (comma-separated values)
    if ($request->has('size')) {
        $size = $request->size;
        $query->where('product_size', 'LIKE', "%{$size}%");
    }

    // Price filtering
    if ($request->has('min_price') && $request->has('max_price')) {
        $query->whereBetween('product_price', [$request->min_price, $request->max_price]);
    } elseif ($request->has('min_price')) {
        $query->where('product_price', '>=', $request->min_price);
    } elseif ($request->has('max_price')) {
        $query->where('product_price', '<=', $request->max_price);
    }

    $products = $query->get();

    return response()->json($products);
}




 public function show($id): JsonResponse
{
    $product = Product::with(['productCategory', 'category'])->find($id);

    if (!$product) {
        return response()->json(['message' => 'Product not found'], 404);
    }

    // Image URLs
    $product->product_img1_url = $product->product_img1 ? asset('storage/' . $product->product_img1) : null;
    $product->product_img2_url = $product->product_img2 ? asset('storage/' . $product->product_img2) : null;
    $product->product_img3_url = $product->product_img3 ? asset('storage/' . $product->product_img3) : null;

    // Category titles
    $product->category_name = $product->category->cat_title ?? null; // adjust field name if needed
    $product->product_category_name = $product->productCategory->p_cat_title ?? null;

    return response()->json($product);
}

public function relatedProducts($id)
{
    $product = Product::findOrFail($id);

    $related = Product::where('cat_id', $product->cat_id)
        ->where('product_id', '!=', $product->product_id)
        ->take(5)
        ->get();

    return response()->json($related);
}
public function featured(): JsonResponse
{
    $products = Product::where('is_featured', 1)
        ->orderBy('date', 'desc')  // changed here
        ->take(5)
        ->get()
        ->map(function ($product) {
            return [
               'id' => $product->product_id,
                'name' => $product->product_title,
                'price' => $product->product_price,
                'image' => $product->product_img1 ? asset('storage/' . $product->product_img1) : null,
                'hoverImage' => $product->product_img2 ? asset('storage/' . $product->product_img2) : null,
            ];
        });

    if ($products->isEmpty()) {
        return response()->json(['message' => 'No featured products found'], 404);
    }

    return response()->json($products);
}

}