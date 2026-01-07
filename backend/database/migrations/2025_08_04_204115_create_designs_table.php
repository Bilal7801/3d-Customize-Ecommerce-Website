<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up()
{
    Schema::create('designs', function (Blueprint $table) {
        $table->id();
         $table->unsignedBigInteger('user_id');
        $table->string('title');
        $table->string('price');
           $table->integer('quantity')->default(1);
          $table->longText('image_front'); // base64 data ke liye longText
        $table->longText('image_back');  // base64 data ke liye longText
        $table->timestamps();

        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('designs');
    }
};
