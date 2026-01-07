<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id('product_id');
            $table->unsignedBigInteger('p_cat_id');
            $table->unsignedBigInteger('cat_id');
            
            $table->string('product_title');
            $table->string('product_img1')->nullable();
            $table->string('product_img2')->nullable();
            $table->string('product_img3')->nullable();
            $table->decimal('product_price', 10, 2);
            $table->text('product_desc')->nullable();
            $table->string('product_keyword')->nullable();
            $table->timestamp('date')->useCurrent();
            $table->string('product_size')->nullable();     // New: Size
        $table->string('product_color')->nullable();    // New: Color
        $table->enum('stock_status', ['In stock', 'Unavailable', 'To be announced'])->default('In stock'); // New: Status
            $table->boolean('is_featured')->default(false); // ✅ New column added

            // Optional: foreign keys if you have `categories` and `product_categories` tables
            $table->foreign('p_cat_id')->references('p_cat_id')->on('product_categories')->onDelete('cascade');
            $table->foreign('cat_id')->references('cat_id')->on('categories')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
