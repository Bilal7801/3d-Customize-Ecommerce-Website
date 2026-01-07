<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProductCategory; 
class ProductCategoryController extends Controller
{ // Show all categories
   public function index()
{
    $categories = ProductCategory::all();
    return view('admin.product_categories.index', compact('categories'));
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
       return view('admin.product_categories.create');
    }

    /**
     * Store a newly created resource in storage.
     */
 

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
    // Show edit form
 public function edit($id)
{
    $category = ProductCategory::findOrFail($id);
    return view('admin.product_categories.edit', compact('category'));
}
    public function store(Request $request)
    {
        $request->validate([
            'p_cat_title' => 'required|string|max:255',
            'p_cat_desc' => 'nullable|string',
        ]);

        ProductCategory::create([
            'p_cat_title' => $request->p_cat_title,
            'p_cat_desc' => $request->p_cat_desc,
        ]);

        return redirect()->back()->with('success', 'Product category inserted successfully.');
    }

  // Update category in DB
    public function update(Request $request, $id)
{
    $request->validate([
        'p_cat_title' => 'required|string|max:255',
        'p_cat_desc' => 'nullable|string',
    ]);

    $category = ProductCategory::findOrFail($id);
    $category->p_cat_title = $request->p_cat_title;
    $category->p_cat_desc = $request->p_cat_desc;
    $category->save();

    return redirect()->route('admin.product_categories.index')->with('success', 'Product category updated successfully.');
}

   // Delete category
public function destroy(ProductCategory $product_category)
{
    // Check if this category has any related products
    if ($product_category->products()->count() > 0) {
        return redirect()->back()->with('error', '❌ Cannot delete: Products exist under this category.');
    }

    // Safe to delete
    $product_category->delete();

    return redirect()->route('admin.product_categories.index')->with('success', '✅ Product category deleted successfully!');
}
}










