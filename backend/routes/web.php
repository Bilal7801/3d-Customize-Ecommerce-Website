<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\View;
use App\Http\Controllers\CybersourcePaymentController;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AdminForgotPasswordController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\VisaController;
use App\Http\Controllers\DHLController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProductCategoryController;
use App\Http\Controllers\Admin\CategoryController;

// Default landing page
Route::get('/', function () {
     return View::make('welcome');
});

// =======================
// Admin Login & Password
// =======================

// Public
Route::get('/admin/login', [AdminAuthController::class, 'showLoginForm'])->name('admin.login');
Route::post('/admin/login', [AdminAuthController::class, 'login'])->name('admin.login.submit');

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/forgot-password', [AdminForgotPasswordController::class, 'showLinkRequestForm'])->name('forgot.password');
    Route::post('/forgot-password', [AdminForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');

    // Fix: enable this route inside admin prefix
    
    Route::post('/reset-password', [AdminForgotPasswordController::class, 'reset'])->name('password.update');
});

Route::get('/reset-password/{token}', [AdminForgotPasswordController::class, 'showResetForm'])->name('password.reset');

// ==========================
// Protected Admin Routes
// ==========================
Route::prefix('admin')->name('admin.')->middleware('auth')->group(function () {

     // Admin Dashboard & Main Pages
     Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
     Route::post('/logout', [AdminAuthController::class, 'logout'])->name('logout');

     Route::get('/products', [DashboardController::class, 'products'])->name('products');
     Route::get('/orders', [DashboardController::class, 'orders'])->name('orders');
     Route::get('/customers', [DashboardController::class, 'customers'])->name('customers');
     Route::get('/payments', [DashboardController::class, 'payments'])->name('payments');
     Route::get('/reports', [DashboardController::class, 'reports'])->name('reports');
     Route::get('/settings', [DashboardController::class, 'settings'])->name('settings');

     // Customers
     Route::get('/dashboard/customers', [DashboardController::class, 'customers'])->name('customer.customers');
     Route::get('/dashboard/customers/view/{id}', [DashboardController::class, 'customerView'])->name('customer.view');

     // Orders
     Route::get('/orders/view/{id}', [DashboardController::class, 'showOrder'])->name('orders.view');

     // ====================
     // Product CRUD
     // ====================
     Route::resource('products', ProductController::class);
     Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
     Route::post('/products/store', [ProductController::class, 'store'])->name('products.store');
     Route::get('/products/edit/{id}', [ProductController::class, 'edit'])->name('products.edit');
     Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update');
     Route::get('/products/delete/{id}', [ProductController::class, 'destroy'])->name('products.delete');

     // ====================
     // Product Categories
     // ====================
     Route::resource('product_categories', ProductCategoryController::class);
     Route::get('/product-categories/create', [ProductCategoryController::class, 'create'])->name('product_categories.create');
     Route::post('/product-categories', [ProductCategoryController::class, 'store'])->name('product_categories.store');
     Route::get('/product_categories/{id}/edit', [ProductCategoryController::class, 'edit'])->name('product_categories.edit');
     Route::put('/product_categories/{id}', [ProductCategoryController::class, 'update'])->name('product_categories.update');
     Route::delete('product_categories/{id}', [ProductCategoryController::class, 'destroy'])->name('product_categories.destroy');
     Route::get('/product-categories', [ProductCategoryController::class, 'index'])->name('product_categories.index');


     // ====================
     // General Categories
     // ====================
     Route::get('categories/create', [CategoryController::class, 'create'])->name('categories.create');
     Route::post('categories/store', [CategoryController::class, 'store'])->name('categories.store');
     Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
     Route::get('/categories/{id}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
     Route::put('/categories/{id}', [CategoryController::class, 'update'])->name('categories.update');
     Route::delete('/categories/{id}', [CategoryController::class, 'destroy'])->name('categories.destroy');
});

// ========================
// CyberSource Payments
// ========================
Route::get('/cybersource/payment', function () {
     return 'Payment Response Received';
});
Route::match(['get', 'post'], '/cybersource/payment', [CybersourcePaymentController::class, 'handleCustomerResponse']);
Route::post('/cybersource/pay', [CybersourcePaymentController::class, 'payNow'])->middleware('web');
Route::post('/cybersource/payment', [CybersourcePaymentController::class, 'handleResponse']);

// View and Refund
Route::get('admin/payment_view/{id}', [CybersourcePaymentController::class, 'showPayment'])->name('admin.payment_view');
Route::get('/admin/payment/refund_confirmation/{id}', [CybersourcePaymentController::class, 'showRefundConfirmation'])->name('admin.refund.confirmation');
Route::post('/admin/payment/refund_confirmation/{id}', [CybersourcePaymentController::class, 'processRefund'])->name('admin.refund.process');
Route::get('admin/payments', [CybersourcePaymentController::class, 'listPayments'])->name('admin.payments');

// =======================
// Visa & DHL
// =======================
Route::get('/visa/test', [VisaController::class, 'testVisaConnection']);
Route::get('/track-shipment', [DHLController::class, 'trackShipment']);

// =======================
// Sanctum Token (CSRF)
// =======================
Route::get('/sanctum/csrf-cookie', function () {
     return response()->json(['csrf_token' => csrf_token()]);
});
