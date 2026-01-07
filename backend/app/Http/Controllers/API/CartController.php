<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CartItem;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    // 🛒 Get all cart items for the authenticated user
    public function index()
    {
        $userId = Auth::id();
        $cartItems = CartItem::with('product')
            ->where('user_id', $userId)
            ->get();

        return response()->json($cartItems);
    }

    // ➕ Add item to cart
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,product_id',
            'quantity'   => 'required|integer|min:1',
            'color'      => 'nullable|string',
            'size'       => 'nullable|string',
        ]);

        $cartItem = CartItem::create([
            'user_id'    => Auth::id(),
            'product_id' => $validated['product_id'],
            'quantity'   => $validated['quantity'],
            'color'      => $validated['color'] ?? null,
            'size'       => $validated['size'] ?? null,
        ]);

        return response()->json([
            'message' => 'Product added to cart',
            'item'    => $cartItem,
        ], 201);
    }

    // ✏️ Update cart item
    public function update(Request $request, $id)
    {
        $cartItem = CartItem::where('user_id', Auth::id())
                            ->findOrFail($id);

        $cartItem->update($request->only(['quantity', 'color', 'size']));

        return response()->json([
            'message' => 'Cart item updated',
            'item'    => $cartItem,
        ]);
    }

    // ❌ Remove cart item
    public function destroy($id)
    {
        CartItem::where('user_id', Auth::id())->findOrFail($id)->delete();

        return response()->json([
            'message' => 'Cart item removed'
        ]);
    }
}
