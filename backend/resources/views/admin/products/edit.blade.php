@extends('layouts.dashboard')

@section('content')
<div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <!-- Form Header -->
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
                <h2 class="text-3xl font-bold text-white flex items-center space-x-3">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    <span>Edit Product</span>
                </h2>
            </div>

            <!-- Messages Section -->
            <div class="px-6 pt-4 space-y-4">
                @if(session('success'))
                    <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 animate-fade-in">
                        <p class="flex items-center">
                            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                            </svg>
                            {{ session('success') }}
                        </p>
                    </div>
                @endif

                @if ($errors->any())
                    <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 animate-fade-in">
                        <div class="flex items-center">
                            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                            </svg>
                            <strong>Whoops! Something went wrong.</strong>
                        </div>
                        <ul class="mt-2 list-disc list-inside">
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif
            </div>

            <!-- Form Content -->
            <form action="{{ route('admin.products.update', $product->product_id) }}" method="POST" enctype="multipart/form-data" class="p-6 space-y-6">
                @csrf
                @method('PUT')

                <!-- Product Title -->
               <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">Product Title</label>
    <input 
        type="text" 
        name="product_title" 
        value="{{ old('product_title', $product->product_title) }}" 
        placeholder="Enter product title here"
        class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-300 @error('product_title') border-red-500 @enderror"
    >
    @error('product_title')
        <p class="text-sm text-red-600 animate-pulse">{{ $message }}</p>
    @enderror
</div>

                <!-- Category Selection -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <!-- Product Category -->
<div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">Product Category</label>
    <select 
        name="p_cat_id" 
        class="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 @error('p_cat_id') border-red-500 @enderror"
    >
        <option value="">Select Product Category</option>
        @foreach($productCategories as $pc)
            <option value="{{ $pc->p_cat_id }}" {{ old('p_cat_id', $product->p_cat_id) == $pc->p_cat_id ? 'selected' : '' }}>
                {{ $pc->p_cat_title }}
            </option>
        @endforeach
    </select>
    @error('p_cat_id')
        <p class="text-sm text-red-600 animate-pulse">{{ $message }}</p>
    @enderror
</div>

<!-- Sub Category -->
<div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">Category</label>
    <select 
        name="cat_id" 
        class="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 @error('cat_id') border-red-500 @enderror"
    >
        <option value="">Select Category</option>
        @foreach($categories as $cat)
            <option value="{{ $cat->cat_id }}" {{ old('cat_id', $product->cat_id) == $cat->cat_id ? 'selected' : '' }}>
                {{ $cat->cat_title }}
            </option>
        @endforeach
    </select>
    @error('cat_id')
        <p class="text-sm text-red-600 animate-pulse">{{ $message }}</p>
    @enderror
</div>

                </div>

                <!-- Image Uploads -->
               <div class="space-y-6">
    <div class="border-2 border-dashed border-gray-200 rounded-xl p-6 transition duration-200 hover:border-blue-400">
        <h3 class="text-lg font-medium text-gray-700 mb-4 text-center">Product Images</h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            @foreach(['product_img1', 'product_img2', 'product_img3'] as $img)
                <div class="space-y-2">
                    <label class="cursor-pointer group block">
                        <div class="aspect-w-1 aspect-h-1 w-48 h-48 bg-gray-50 rounded-lg overflow-hidden transition duration-200 group-hover:bg-gray-100">
                            @if($product->$img)
                                <img src="{{ asset('storage/' . $product->$img) }}" alt="{{ $img }}" 
                                     class="object-cover w-full h-full transition duration-200 opacity-90 group-hover:opacity-100" id="preview-{{ $img }}">
                            @else
                                <div class="w-full h-full flex items-center justify-center text-gray-400">
                                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z">
                                        </path>
                                    </svg>
                                </div>
                            @endif
                        </div>
                        <input type="file" name="{{ $img }}" id="{{ $img }}" class="hidden" onchange="handleImageChange(this)">
                        <span class="block text-sm text-center text-gray-600 mt-2" id="filename-{{ $img }}">Click to replace</span>
                    </label>
                    @error($img)
                        <p class="text-sm text-red-600 animate-pulse">{{ $message }}</p>
                    @enderror
                </div>
            @endforeach
        </div>
    </div>
</div>

                <!-- Price and Keywords -->
               <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Product Price -->
    <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Product Price</label>
        <div class="mt-1 relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm">$</span>
            </div>
            <input 
                type="number" 
                name="product_price" 
                value="{{ old('product_price', $product->product_price) }}" 
                placeholder="Enter product price"
                class="block w-full pl-7 pr-12 rounded-md border border-gray-300 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-300 @error('product_price') border-red-500 @enderror"
                step="0.01" 
                min="0"
            >
        </div>
        @error('product_price')
            <p class="text-sm text-red-600 animate-pulse">{{ $message }}</p>
        @enderror
    </div>

    <!-- Product Keyword -->
    <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">Product Keyword</label>
    <input 
        id="product_keyword"
        name="product_keyword" 
        type="text"
        placeholder="Enter product keywords"
        value="{{ old('product_keyword', isset($product) ? $product->product_keyword : '') }}"
        class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-300 @error('product_keyword') border-red-500 @enderror"
    />
    @error('product_keyword')
        <p class="text-sm text-red-600 animate-pulse">{{ $message }}</p>
    @enderror
</div>
</div>

                <!-- Product Description -->
<div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">Product Description</label>
    <textarea 
        name="product_desc" 
        rows="5" 
        placeholder="Enter product description"
        class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-300 resize-none @error('product_desc') border-red-500 @enderror"
    >{{ old('product_desc', $product->product_desc) }}</textarea>
    
    @error('product_desc')
        <p class="text-sm text-red-600 animate-pulse">{{ $message }}</p>
    @enderror
</div>

<!-- Size, Color, and Status -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <!-- Product Size -->
<div class="space-y-2">
  <label for="product_size" class="block text-sm font-medium text-gray-700">Size</label>
  <input 
    type="text" 
    id="product_size" 
    name="product_size" 
    placeholder="e.g. S, M, L, XL"
    value="{{ old('product_size', $product->product_size ?? '') }}"
    oninput="
      let val = this.value.toUpperCase();

      val = val.replace(/[^SMLX,]/g, '');
      val = val.replace(/,+/g, ',');

      val = val.replace(/XL/g, 'Z');
      val = val.replace(/X/g, 'XL');
      val = val.replace(/Z/g, 'XL');

      val = val.replace(/(XL|S|M|L)(?=(XL|S|M|L))/g, '$1,');

      let sizes = val.split(',').map(s => s.trim()).filter(Boolean);
      let uniqueSizes = [...new Set(sizes)];

      val = uniqueSizes.join(', ');

      this.value = val;
    "
    class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm
           focus:border-blue-500 focus:ring-blue-500 transition duration-300"
    aria-label="Product Size"
  >
  @error('product_size')
    <p class="text-sm text-red-600 mt-1">{{ $message }}</p>
  @enderror
</div>



    <!-- Product Color -->
 <!-- Product Color -->
<div class="space-y-2">
  <label for="product_color" class="block text-sm font-medium text-gray-700">Product Color</label>
  <input 
    type="text" 
    id="product_color" 
    name="product_color" 
    placeholder="e.g. Red, Blue, Green"
    value="{{ old('product_color', $product->product_color ?? '') }}"
    onkeydown="
      const colorMap = {
        R: 'Red', B: 'Blue', G: 'Green', W: 'White', K: 'Black',
        Y: 'Yellow', O: 'Orange', P: 'Purple', M: 'Maroon', N: 'Navy'
      };

      if (event.key === ' ') {
        event.preventDefault();

        let input = this.value.trim();
        let parts = input.split(',').map(p => p.trim()).filter(Boolean);

        let lastPart = parts.pop() || '';
        let key = lastPart.toUpperCase().charAt(0);
        let color = colorMap[key];

        if (color && !parts.includes(color)) {
          parts.push(color);
        }

        this.value = parts.join(', ') + (parts.length ? ', ' : '');
      }

      if (event.key === 'Backspace') {
        let input = this.value;
        if (input.endsWith(', ') || input.endsWith(',')) {
          event.preventDefault();
          let parts = input.split(',').map(p => p.trim()).filter(Boolean);
          parts.pop();
          this.value = parts.join(', ') + (parts.length ? ', ' : '');
        }
      }
    "
    oninput="
      let val = this.value.replace(/[^a-zA-Z, ]/g, '');
      val = val.replace(/\s*,\s*/g, ', ');
      val = val.replace(/,+/g, ',');
      val = val.replace(/^,|,$/g, '');
      this.value = val;
    "
    class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm
           focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300"
    aria-label="Product Color"
  >
  @error('product_color')
    <p class="text-sm text-red-600 mt-1">{{ $message }}</p>
  @enderror
</div>



    <!-- Stock Status -->
    <div class="space-y-2">
        <label for="stock_status" class="block text-sm font-medium text-gray-700">Stock Status</label>
        <select id="stock_status" name="stock_status"
                class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300"
                aria-label="Stock Status">
            <option value="In stock" {{ old('stock_status', $product->stock_status ?? '') == 'In stock' ? 'selected' : '' }}>In stock</option>
            <option value="Unavailable" {{ old('stock_status', $product->stock_status ?? '') == 'Unavailable' ? 'selected' : '' }}>Unavailable</option>
            <option value="To be announced" {{ old('stock_status', $product->stock_status ?? '') == 'To be announced' ? 'selected' : '' }}>To be announced</option>
        </select>
        @error('stock_status')
            <p class="text-sm text-red-600 mt-1">{{ $message }}</p>
        @enderror
    </div>
</div>

                <!-- Featured Product Toggle -->
               <div class="space-y-4 pt-4">
    <!-- Featured Product Toggle -->
    <div class="flex items-center justify-between bg-blue-50 rounded-lg p-4 border border-blue-200 transition-all duration-300 hover:bg-blue-100">
        <div class="flex items-center">
            <i class="fas fa-star text-yellow-500 text-xl mr-3"></i>
            <div>
                <h3 class="font-medium text-gray-800">Featured Product</h3>
                <p class="text-sm text-gray-600">Highlight this product on your homepage</p>
            </div>
        </div>
        <div class="flex items-center">
            <span id="toggle-status" class="mr-3 text-sm font-medium text-gray-700">
                {{ $product->is_featured ? 'Enabled' : 'Disabled' }}
            </span>
<input type="hidden" name="is_featured" id="featured-input" value="{{ $product->is_featured ? '1' : '0' }}">
            <label class="toggle-switch">
                <input 
                    type="checkbox" 
                    id="featured-toggle" 
                    {{ $product->is_featured ? 'checked' : '' }}
                >
                <span class="slider"></span>
            </label>
        </div>
    </div>
    
    <!-- Featured Badge -->
    <div id="featured-badge" class="{{ $product->is_featured ? '' : 'hidden' }} bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center transform transition-all duration-300">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            <i class="fas fa-star mr-1"></i>
            This product will be featured on the homepage
        </span>
    </div>
    
    <!-- Error Message -->
    @error('is_featured')
        <p class="text-sm text-red-600 animate-pulse mt-2 text-center">{{ $message }}</p>
    @enderror
</div>


                <!-- Submit Button -->
                <div class="pt-6">
                    <button type="submit" 
                            class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] shadow-md font-medium">
                        Update Product
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<style>
    .animate-fade-in {
        animation: fadeIn 0.3s ease-out;
    }
    .animate-pulse {
        animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }

     .toggle-switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }
    
    .toggle-switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: .4s;
        border-radius: 34px;
    }
    
    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
    }
    
    input:checked + .slider {
        background: linear-gradient(to right, #3b82f6, #8b5cf6);
    }
    
    input:checked + .slider:before {
        transform: translateX(26px);
    }
    
    input:focus + .slider {
        box-shadow: 0 0 1px #3b82f6;
    }
</style>
@endsection

<script>
    function handleImageChange(input) {
        const file = input.files[0];
        const span = document.getElementById('filename-' + input.id);
        if (file) {
            span.textContent = file.name;

            // Optional: update image preview as well
            const preview = document.getElementById('preview-' + input.id);
            if (preview) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    preview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        } else {
            span.textContent = "Click to replace";
        }
    }
    
    document.addEventListener('DOMContentLoaded', function () {
        var input = document.querySelector('#product_keyword');
        if (input) {
            // Initialize Tagify
            new Tagify(input, {
                delimiters: ",",
                maxTags: 10,
                dropdown: {
                    enabled: 0
                }
            });
        }
    });
   document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('featured-toggle');
    const hiddenInput = document.getElementById('featured-input');
    const statusText = document.getElementById('toggle-status');
    const badge = document.getElementById('featured-badge');
    
    // Initialize based on current value
    if (hiddenInput.value === '1') {
        toggle.checked = true;
        statusText.textContent = 'Enabled';
        badge.classList.remove('hidden');
    } else {
        toggle.checked = false;
        statusText.textContent = 'Disabled';
        badge.classList.add('hidden');
    }

    toggle.addEventListener('change', function() {
        if (this.checked) {
            hiddenInput.value = '1';
            statusText.textContent = 'Enabled';
            badge.classList.remove('hidden');
        } else {
            hiddenInput.value = '0';
            statusText.textContent = 'Disabled';
            badge.classList.add('hidden');
        }
    });
});
</script>