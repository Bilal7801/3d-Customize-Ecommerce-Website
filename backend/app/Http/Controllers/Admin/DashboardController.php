<?php

namespace App\Http\Controllers;

use App\Models\Product;

class DashboardController extends Controller
{
    public function index()
    {
        $totalProducts = Product::count();  // get total products from DB
        return view('admin.dashboard', compact('totalProducts'));
    }
}
