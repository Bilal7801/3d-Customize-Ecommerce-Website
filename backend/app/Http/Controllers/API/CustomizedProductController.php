<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CustomizedProduct;
use Illuminate\Support\Facades\Auth;

class CustomizedProductController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'product_id'   => 'required|exists:products,product_id',
            'custom_name'  => 'required|string|max:255',
            'price'        => 'required|numeric|min:0',
            'image_front'  => 'required|string', // Assuming it's a path or base64 string
            'image_back'   => 'nullable|string',
        ]);

        $custom = CustomizedProduct::create([
            ...$data,
            'user_id' => Auth::id(),
        ]);

        return response()->json(['message' => 'Customized product saved', 'data' => $custom], 201);
    }
}
