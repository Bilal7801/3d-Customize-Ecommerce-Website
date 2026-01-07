<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Category;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   public function index()
{
    
    $products = Product::all();
        return view('admin.products.index', compact('products'));
}

    /**
     * Show the form for creating a new resource.
     */
 

public function create()
{
    $pCats = ProductCategory::all();  // make sure the model name matches your setup
    $cats = Category::all();

    return view('admin.products.create', compact('pCats', 'cats'));
}



    /**
     * Store a newly created resource in storage.
     */
public function store(Request $request)
{
    //   dd($request->all());
    $validated = $request->validate([
       'product_title' => 'required|string|max:255',
    'p_cat_id' => 'required|exists:product_categories,p_cat_id',
    'cat_id' => 'required|exists:categories,cat_id',
    'product_price' => 'required|numeric',
    'product_desc' => 'required|string',
    'product_keyword' => 'nullable|string',
        'product_img1'    => 'required|image|mimes:jpg,jpeg,png,gif,webp',
    'product_img2'    => 'required|image|mimes:jpg,jpeg,png,gif,webp',
    'product_img3'    => 'required|image|mimes:jpg,jpeg,png,gif,webp',
'product_size' => 'nullable|string', // ✅
        'product_color' => 'nullable|string', // ✅
        'stock_status' => 'required|in:In stock,Unavailable,To be announced', // ✅
         'is_featured' => 'required|boolean',
    ]);

    // Handle image uploads
    $imagePaths = [];
    foreach (['product_img1', 'product_img2', 'product_img3'] as $img) {
    $file = $request->file($img);
    $originalName = $file->getClientOriginalName();
    $file->storeAs('products', $originalName, 'public');
    $imagePaths[$img] = 'products/' . $originalName;
}
// ✅ Convert Tagify JSON string to space-separated string
    $keywordString = '';
    if (!empty($validated['product_keyword'])) {
        $keywords = json_decode($validated['product_keyword'], true);
        $keywordString = collect($keywords)->pluck('value')->implode(' ');
    }
    // Create product
    Product::create([
        'p_cat_id' => $validated['p_cat_id'],
        'cat_id' => $validated['cat_id'],
        'product_title' => $validated['product_title'],
        'product_price' => $validated['product_price'],
       'product_keyword' => $keywordString,
        'product_desc' => $validated['product_desc'],
        'product_img1' => $imagePaths['product_img1'],
        'product_img2' => $imagePaths['product_img2'],
        'product_img3' => $imagePaths['product_img3'],
      'product_size' => $validated['product_size'] ?? null,  // ✅ fixed
    'product_color' => $validated['product_color'] ?? null,  // ✅ fixed
    'stock_status' => $validated['stock_status'],  // ✅ fixed
    'is_featured' => $validated['is_featured'],
    ]);
 return redirect()->back()->with('success', 'Product inserted successfully.');
    // return redirect()->route('admin.products.index')->with('success', 'Product added!');
}

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
   
public function edit($id)
{
    $product = Product::findOrFail($id);
    $productCategories = ProductCategory::all();
    $categories = Category::all();

    // Convert space-separated string into Tagify format JSON
    if (!empty($product->product_keyword)) {
        $tags = explode(' ', $product->product_keyword);  // split string
        $product->product_keyword = collect($tags)->map(fn($tag) => ['value' => $tag])->toJson();
    }

    return view('admin.products.edit', compact('product', 'productCategories', 'categories'));
}




    /**
     * Update the specified resource in storage.
     */
public function update(Request $request, $product_id)
{
    // Validate the request
    $request->validate([
        'product_title' => 'required|string|max:255',
        'p_cat_id' => 'required|integer|exists:product_categories,p_cat_id',
        'cat_id' => 'required|integer|exists:categories,cat_id',
        'product_price' => 'required|numeric|min:0',
        'product_keyword' => 'required|string|max:255',
        'product_desc' => 'required|string',
        'product_img1' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg',
        'product_img2' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg',
        'product_img3' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg',
         'product_size' => 'required|string|max:255',
            'product_color' => 'required|string|max:255',
            'stock_status' => 'required|in:In stock,Unavailable,To be announced',
             'is_featured' => 'required|boolean',
    ]);

    // Find product by ID
    $product = Product::findOrFail($product_id);

    // Update basic fields
    $product->product_title = $request->input('product_title');
    $product->p_cat_id = $request->input('p_cat_id');
    $product->cat_id = $request->input('cat_id');
    $product->product_price = $request->input('product_price');
   // Convert Tagify JSON string to space-separated string
$keywords = json_decode($request->product_keyword, true);
$keywordString = collect($keywords)->pluck('value')->implode(' ');
$product->product_keyword = $keywordString;

    $product->product_desc = $request->input('product_desc');

    // Handle image uploads
    foreach (['product_img1', 'product_img2', 'product_img3'] as $imgField) {
        if ($request->hasFile($imgField)) {
            // Delete old image file if exists
            if ($product->$imgField && \Storage::exists($product->$imgField)) {
                \Storage::delete($product->$imgField);
            }
            // Store new image and save path
           $file = $request->file($imgField);
$originalName = $file->getClientOriginalName();
$file->storeAs('products', $originalName, 'public');
$product->$imgField = 'products/' . $originalName;
        }
    }

    
  $product->product_size = $request->product_size;
        $product->product_color = $request->product_color;
        $product->stock_status = $request->stock_status;
        $product->is_featured = $request->is_featured;
    // Save updated product
    $product->save();

    // Redirect with success message
 return redirect()->route('admin.products.index') // redirect to product index page
                     ->with('success', 'Product updated successfully.');
}



    /**
     * Remove the specified resource from storage.
     */
  public function destroy(Product $product)
{
    $product->delete();
    return redirect()->route('admin.products.index')->with('success', 'Product deleted successfully!');
}
}









    

  
