<?php





namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
{
    $categories = Category::all();
    return view('admin.categories.index', compact('categories'));
}

public function destroy($id)
{
    $category = Category::findOrFail($id);

    // Check if this category has any products
    if ($category->products()->count() > 0) {
        return redirect()->back()->with('error', '❌ Cannot delete: Products exist under this category.');
    }

    // Safe to delete
    $category->delete();

    return redirect()->route('admin.categories.index')->with('success', '✅ Category deleted successfully!');
}


    public function create()
    {
        return view('admin.categories.create');
    }

    public function update(Request $request, $id)
{
    $request->validate([
        'cat_title' => 'required|string|max:255',
        'cat_desc' => 'nullable|string',
    ]);

    $category = Category::findOrFail($id);
    $category->update($request->only(['cat_title', 'cat_desc']));

    return redirect()->route('admin.categories.index')->with('success', 'Category updated successfully');
}
public function edit($id)
{
    $category = Category::findOrFail($id);
    return view('admin.categories.edit', compact('category'));
}
    public function store(Request $request)
    {
        $request->validate([
            'cat_title' => 'required|string|max:255',
            'cat_desc' => 'nullable|string',
        ]);

        Category::create($request->only(['cat_title', 'cat_desc']));

        return redirect()->route('admin.categories.create')->with('success', 'Category inserted successfully!');
    }
}










