<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        // Dynamically count total products from the 'products' table
        $totalProducts = Product::count();

        // Pass the variable to the dashboard view
        return view('admin.dashboard', compact('totalProducts'));
    }

    public function products()
    {
        // Logic for products
    }

    public function orders(Request $request)
    {
        $search = $request->input('search');

        $orders = Order::with('customer')
            ->when($search, function ($query, $search) {
                $query->whereHas('customer', function ($q) use ($search) {
                    $q->where('first_name', 'like', "%{$search}%")
                        ->orWhere('last_name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                })->orWhere('id', $search);
            })
            ->latest()
            ->paginate(10);

        return view('admin.orders.order', compact('orders'));
    }

    public function showOrder($id)
    {
        $order = Order::with('customer')->findOrFail($id);
        return view('admin.orders.order_view', compact('order'));
    }

    // For API use
    public function getUserOrders()
{
    $user = Auth::user();

    if (!$user) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    try {
        $orders = Order::where('customer_id', $user->id)
            ->latest()
            ->get()
            ->map(function ($order) {
                $decoded = json_decode($order->data, true); // decode as array

                // Attach data and items if available
                $order->data = $decoded;
                $order->items = $decoded['items'] ?? [];

                return $order;
            });

        return response()->json(['orders' => $orders]);
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Server error',
            'message' => $e->getMessage()
        ], 500);
    }
}





    public function customers(Request $request)
    {
        $search = $request->input('search');

        // Include order count for each user
        $query = User::withCount('orders')->where('role', 'user');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('email', 'like', "%$search%")
                    ->orWhere('first_name', 'like', "%$search%")
                    ->orWhere('last_name', 'like', "%$search%");
            });
        }

        $customers = $query->orderBy('created_at', 'desc')->paginate(10);

        return view('admin.customer.customers', compact('customers'));
    }

    public function customerView($id)
    {
        $customer = User::findOrFail($id);
        return view('admin.customer.customer_view', compact('customer'));
    }


    public function payments()
    {
        return view('admin.payment.payments');
    }

    public function reports()
    {
        // Logic for reports
    }

    public function settings()
    {
        // Logic for settings
    }
}
