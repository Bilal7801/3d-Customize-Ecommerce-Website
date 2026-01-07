<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\AdminForgotPasswordController;
use App\Http\Controllers\DashboardController;



use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProductCategoryController;
use App\Http\Controllers\Admin\CategoryController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
     return view('welcome');
});

// routes/web.php

// Public
Route::get('/admin/login',  [AdminAuthController::class, 'showLoginForm'])
     ->name('admin.login');
Route::post('/admin/login', [AdminAuthController::class, 'login'])
     ->name('admin.login.submit');

// Protected
Route::prefix('admin')
     ->middleware('auth')            // default web guard
     ->group(function () {
         Route::get('/dashboard', [AdminDashboardController::class,'index'])
              ->name('admin.dashboard');
         Route::post('/admin/logout', [AdminAuthController::class,'logout'])
              ->name('admin.logout');
     });



// Forget password Route 
Route::prefix('admin')->name('admin.')->group(function () {
     Route::get('/forgot-password', [AdminForgotPasswordController::class, 'showLinkRequestForm'])->name('forgot.password');
     Route::post('/forgot-password', [AdminForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');
});



// Show Reset Password Form (with token)
Route::get('/reset-password/{token}', [AdminForgotPasswordController::class, 'showResetForm'])->name('password.reset');

// Handle the password reset form submission
Route::post('/reset-password', [AdminForgotPasswordController::class, 'resetPassword'])->name('password.update');

Route::prefix('admin')->name('admin.')->group(function () {
     // Show reset password form with token
     Route::get('/reset-password/{token}', [AdminForgotPasswordController::class, 'showResetForm'])
          ->name('password.reset');

     // Handle reset password POST
     Route::post('/reset-password', [AdminForgotPasswordController::class, 'reset'])
          ->name('password.update');
});




Route::prefix('admin')->name('admin.')->group(function () {

    // Dashboard and static pages
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/orders', [DashboardController::class, 'orders'])->name('orders');
    Route::get('/customers', [DashboardController::class, 'customers'])->name('customers');
    Route::get('/payments', [DashboardController::class, 'payments'])->name('payments');
    Route::get('/reports', [DashboardController::class, 'reports'])->name('reports');
    Route::get('/settings', [DashboardController::class, 'settings'])->name('settings');
    Route::post('/logout', [DashboardController::class, 'logout'])->name('logout');

    // Resource routes
    Route::resource('products', ProductController::class);

    // If you want to add ProductCategory routes:
    Route::resource('product-categories', ProductCategoryController::class);
    Route::get('categories/create', [CategoryController::class, 'create'])->name('categories.create');
    Route::post('categories/store', [CategoryController::class, 'store'])->name('categories.store');
//     // If you want to add general Categories routes:
//     Route::resource('categories', CategoryController::class);

      Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::get('/categories/{id}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy'])->name('categories.destroy');

    Route::put('/categories/{id}', [CategoryController::class, 'update'])->name('categories.update');


      Route::get('/product-categories/create', [ProductCategoryController::class, 'create'])->name('product_categories.create');
    Route::post('/product-categories', [ProductCategoryController::class, 'store'])->name('product_categories.store');

 Route::resource('product_categories', ProductCategoryController::class);

 Route::delete('admin/product_categories/{product_category}', [ProductCategoryController::class, 'destroy'])
    ->name('admin.product_categories.destroy');
    Route::get('/admin/product_categories/{id}/edit', [ProductCategoryController::class, 'edit'])->name('admin.product_categories.edit');
Route::put('/admin/product_categories/{id}', [ProductCategoryController::class, 'update'])->name('admin.product_categories.update');


      Route::resource('product_categories', ProductCategoryController::class);
    Route::resource('products', ProductController::class);
//           Route::get('products/create', [ProductController::class, 'create'])->name('admin.products.create');
//     Route::post('products/store', [ProductController::class, 'store'])->name('admin.products.store');

    Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/products/store', [ProductController::class, 'store'])->name('products.store');
//     Route::get('products', [ProductController::class, 'index'])->name('admin.products.index'); 
Route::resource('admin/products', ProductController::class)->names('admin.products');


Route::get('/products/delete/{id}', [ProductController::class, 'destroy'])->name('products.delete');

    Route::get('/products/edit/{id}', [ProductController::class, 'edit'])->name('products.edit');
 Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update');

    Route::put('admin/products/{product}', [ProductController::class, 'update'])->name('admin.products.update');
Route::put('/products/{product}', [ProductController::class, 'update'])->name('admin.products.update');

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

});



  






  
