<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\CybersourcePaymentController;
use App\Http\Controllers\DhlController;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

use App\Http\Controllers\DesignController;

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductCategoryController;
use App\Http\Controllers\Api\ProductController;

use App\Http\Controllers\UserProfileController;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;




// use App\Http\Controllers\CartController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Routes that require Sanctum auth token
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json([
        'first_name' => $request->user()->first_name,
        'last_name' => $request->user()->last_name,
    ]);
});

// Route::middleware('auth:sanctum')->group(function () {
//     Route::post('/logout', [AuthController::class, 'logout']);
//     Route::get('/user', function (Request $request) {
//         return $request->user();
//     });
// });


Route::get('/todos', [TodoController::class, 'index']);
Route::post('/todos', [TodoController::class, 'store']);
Route::put('/todos/{id}', [TodoController::class, 'update']);
Route::delete('/todos/{id}', [TodoController::class, 'destroy']);

Route::post('/request-otp', [AuthController::class, 'requestOtp']);
Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);
Route::post('/resend-otp', [AuthController::class, 'resendOtp']);
Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::post('/reset-password', [ResetPasswordController::class, 'reset'])->name('password.update');



Route::post('/login', [AuthController::class, 'login']); 
//Logout
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

//cybersource payment routes
Route::get('/cybersource/payment', function () {
    return 'Payment Response Received';
});

// visa payment routes
// Route::post('/cybersource/pay', [CybersourcePaymentController::class, 'pay']);
Route::get('/cybersource/payment', [CybersourcePaymentController::class, 'handleCustomerResponse']);

// cod payment route
// Route::post('/cybersource/pay-cod', [CybersourcePaymentController::class, 'payWithCOD']);

Route::middleware('auth:api')->group(function () {
    Route::post('/cybersource/pay',     [CybersourcePaymentController::class, 'pay']);
    Route::post('/cybersource/pay-cod', [CybersourcePaymentController::class, 'payWithCOD']);
    // any other protected routes…
});



Route::middleware('auth:sanctum')->group(function () {
    // Create / Add to cart
    Route::post('/cart', [CartController::class, 'store']);

    // List all items in the authenticated user’s cart
    Route::get('/cart', [CartController::class, 'index']);

    // Update a cart‐item (quantity/color/size)
    Route::put('/cart/{id}', [CartController::class, 'update']);

    // Remove a cart‐item
    Route::delete('/cart/{id}', [CartController::class, 'destroy']);
});


// Route::middleware('api')->group(function () {
//     Route::get('/cart/{user_id}', [CartController::class, 'index']);        // Get cart items
//     Route::post('/cart', [CartController::class, 'store']);                 // Add to cart
//     Route::put('/cart/{id}', [CartController::class, 'update']);           // Update item
//     Route::delete('/cart/{id}', [CartController::class, 'destroy']);       // Delete item
// });

// DHL tracking route

// Route::get('/dhl/track/{trackingNumber}', [DhlController::class, 'trackShipment']);

Route::get('/dhl/track', [DhlController::class, 'track']);

// ali routes

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/product-categories', [ProductCategoryController::class, 'index']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/featured', [ProductController::class, 'featured']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/products/{id}/related', [ProductController::class, 'relatedProducts']);


Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::get('/product-categories/{id}', [ProductCategoryController::class, 'show']);



Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [UserProfileController::class, 'show']);
    Route::put('/profile', [UserProfileController::class, 'update']); // ✅ Add this line
});


// routes/api.php
Route::middleware('auth:sanctum')->get('/orders', [DashboardController::class, 'getUserOrders']);

 



// Route::middleware('auth:sanctum')-> post('/designs', [DesignController::class, 'store']);

// Route::post('/designs', [DesignController::class, 'store']);
// Route::get('/designs', [DesignController::class, 'index']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/designs', [DesignController::class, 'store']);
    Route::get('/designs', [DesignController::class, 'index']);
    Route::delete('/designs/{id}', [DesignController::class, 'destroy']);
     Route::put('/designs/{id}', [DesignController::class, 'updateQuantity']);
     Route::get('/cart/designs', [DesignController::class, 'index']);
});
