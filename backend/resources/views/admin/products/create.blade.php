@extends('layouts.dashboard')

@section('content')
<div class="min-h-screen>
    <div class="container mx-auto px-4 py-8 bg-gray-100">
        <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-xl bg-gray-100">
            <!-- Header -->
            <div class="px-6 py-4 border-b border-gray-200">
                <h2 class="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                    <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    <span>Insert New Product</span>
                </h2>
            </div>

            <!-- Success Message -->
            @if (session('success'))
                <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 m-4" role="alert">
                    <p class="flex items-center">
                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                        {{ session('success') }}
                    </p>
                </div>
            @endif

            <!-- Form -->
            <form action="{{ route('admin.products.store') }}" method="POST" enctype="multipart/form-data" class="p-6 space-y-6">
                @csrf

                <!-- Product Title -->
               <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">Product Title</label>
    <input 
        type="text" 
        name="product_title" 
        value="{{ old('product_title') }}" 
        placeholder="Enter product title here"
        class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-300 @error('product_title') border-red-500 @enderror"
    >
    @error('product_title')
        <p class="text-sm text-red-600 animate-pulse">{{ $message }}</p>
    @enderror
</div>

 <!-- Featured Product Toggle -->
                <div class="space-y-4">
                    <div class="flex items-center justify-between bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <div class="flex items-center">
                            <i class="fas fa-star text-yellow-500 text-xl mr-3"></i>
                            <div>
                                <h3 class="font-medium text-gray-800">Featured Product</h3>
                                <p class="text-sm text-gray-600">Highlight this product on your homepage</p>
                            </div>
                        </div>
                        <div class="flex items-center">
                            <span id="toggle-status" class="mr-3 text-sm font-medium text-gray-700">Disabled</span>
                            <input type="hidden" name="is_featured" id="featured-input" value="0">
                            <label class="toggle-switch">
                                <input type="checkbox" id="featured-toggle">
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>
                    <div id="featured-badge" class="featured-badge hidden bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                            <i class="fas fa-star mr-1"></i>
                            This product will be featured on the homepage
                        </span>
                    </div>
                </div>

                <!-- Category Selection Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Product Category -->
                   <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">Product Category</label>
    <select name="p_cat_id" 
            class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-300 @error('p_cat_id') border-red-500 @enderror">
        <option value="">Select Product Category</option>
        @foreach ($pCats as $pcat)
            <option value="{{ $pcat->p_cat_id }}" {{ old('p_cat_id') == $pcat->p_cat_id ? 'selected' : '' }}>
                {{ $pcat->p_cat_title }}
            </option>
        @endforeach
    </select>
    @error('p_cat_id')
        <p class="text-sm text-red-600 animate-pulse">{{ $message }}</p>
    @enderror
</div>

                    <!--  Category -->
                    <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">Category</label>
    <select name="cat_id" 
            class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-300 @error('cat_id') border-red-500 @enderror">
        <option value="">Select Category</option>
        @foreach ($cats as $cat)
            <option value="{{ $cat->cat_id }}" {{ old('cat_id') == $cat->cat_id ? 'selected' : '' }}>
                {{ $cat->cat_title }}
            </option>
        @endforeach
    </select>
    @error('cat_id')
        <p class="text-sm text-red-600 animate-pulse">{{ $message }}</p>
    @enderror
</div>

                </div>

               <!-- Image Upload Section -->
<div class="space-y-6">
    <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center transition duration-300 hover:border-blue-500">
        <h3 class="text-lg font-medium text-gray-700 mb-4">Product Images</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            @php $images = ['product_img1', 'product_img2', 'product_img3']; @endphp
            @foreach ($images as $img)
                <div class="space-y-2">
                    <label class="cursor-pointer inline-block px-4 py-2 bg-white rounded-md hover:bg-gray-200 transition duration-300">
                        <span>Upload {{ str_replace('_', ' ', $img) }}</span>
                        <input type="file" name="{{ $img }}" class="hidden file-input" data-name="{{ $img }}" onchange="previewImage(event, '{{ $img }}')">
                    </label>

                    <!-- File name display -->
                    <p id="{{ $img }}-filename" class="text-sm text-gray-600 italic"></p>

                    <!-- Image preview -->
                    <img id="{{ $img }}-preview" src="#" alt="Image Preview" class="w-full h-40 object-contain rounded border border-gray-200 hidden" />

                    @error($img)
                        <p class="text-sm text-red-600 animate-pulse">{{ $message }}</p>
                    @enderror
                </div>
            @endforeach
        </div>
    </div>
</div>

                <!-- Price and Keyword -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Product Price</label>
        <input 
            type="number" 
            name="product_price" 
            value="{{ old('product_price') }}" 
            placeholder="Enter product price"
            class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-300 @error('product_price') border-red-500 @enderror"
        >
        @error('product_price')
            <p class="text-sm text-red-600 animate-pulse">{{ $message }}</p>
        @enderror
    </div>

    <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Product Keyword</label>
       <input 
    id="product_keyword"
    name="product_keyword"
    placeholder="Enter product keywords"
    value="{{ old('product_keyword', isset($product) ? $product->product_keyword : '') }}"
    class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-300 bg-white"
/>
        @error('product_keyword')
            <p class="text-sm text-red-600 animate-pulse">{{ $message }}</p>
        @enderror
    </div>
</div>


                <!-- Description -->
                <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">Product Description</label>
    <textarea 
        name="product_desc" 
        rows="4" 
        placeholder="Enter product description"
        class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-300 @error('product_desc') border-red-500 @enderror"
    >{{ old('product_desc') }}</textarea>
    
    @error('product_desc')
        <p class="text-sm text-red-600 animate-pulse">{{ $message }}</p>
    @enderror
</div>
<!-- Size, Color, and Status -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
 <!-- Product Size -->
<div class="space-y-2">
  <label class="block text-sm font-medium text-gray-700">Size</label>
  <input type="text" name="product_size" placeholder="e.g. S, M, L, XL"
  value="{{ old('product_size') }}"
  oninput="
    let val = this.value.toUpperCase();

    // Replace all invalid chars except S, M, L, X and commas
    val = val.replace(/[^SMLX,]/g, '');

    // Fix multiple commas to one comma
    val = val.replace(/,+/g, ',');

    // Replace lone 'X' with 'XL'
    // To avoid affecting existing 'XL', first replace XL with placeholder 'Z'
    val = val.replace(/XL/g, 'Z');

    // Replace any single X with XL
    val = val.replace(/X/g, 'XL');

    // Restore XL placeholder
    val = val.replace(/Z/g, 'XL');

    // Split into sizes (separated by commas or no commas)
    // Insert commas between sizes if missing:
    val = val.replace(/(XL|S|M|L)(?=(XL|S|M|L))/g, '$1,');

    // Split by commas, trim spaces, and remove duplicates
    let sizes = val.split(',').map(s => s.trim()).filter(Boolean);
    let uniqueSizes = [...new Set(sizes)];

    // Join back with commas and a space
    val = uniqueSizes.join(', ');

    this.value = val;
  "
  class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm
         focus:border-blue-500 focus:ring-blue-500 transition duration-300">


</div>

<!-- Product Color -->
<div class="space-y-2">
  <label class="block text-sm font-medium text-gray-700">Product Color</label>
  <input type="text" name="product_color" placeholder="e.g. Red, Blue, Green"
    value="{{ old('product_color') }}"
    onkeydown="
      if (event.key === ' ') {
        event.preventDefault();

        // Define color initials to full names
        const colorMap = {
          R: 'Red',
          B: 'Blue',
          G: 'Green',
          W: 'White',
          K: 'Black',
          Y: 'Yellow',
          O: 'Orange',
          P: 'Purple',
          M: 'Maroon',
          N: 'Navy'
        };

        let input = this.value;
        let parts = input.split(',').map(p => p.trim()).filter(Boolean);

        let lastPart = parts.pop() || '';

        // Try match exact color name or initial
        let key = lastPart.toUpperCase().charAt(0);
        let color = colorMap[key];

        if (color && !parts.includes(color)) {
          parts.push(color);
        }

        this.value = parts.join(', ') + ', ';
      }
    "
    oninput="
      // Only allow letters, commas, and spaces
      let val = this.value.replace(/[^a-zA-Z, ]/g, '');
      val = val.replace(/\s*,\s*/g, ', ').replace(/,+/g, ',');
      val = val.replace(/^, |^,| ,$|,$/, '');
      this.value = val;
    "
    class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-300">
</div>


<!-- Stock Status -->
<div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">Stock Status</label>
    <select name="stock_status"
            class="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-300">
        <option value="In stock" {{ old('stock_status') == 'In stock' ? 'selected' : '' }}>In stock</option>
        <option value="Unavailable" {{ old('stock_status') == 'Unavailable' ? 'selected' : '' }}>Unavailable</option>
        <option value="To be announced" {{ old('stock_status') == 'To be announced' ? 'selected' : '' }}>To be announced</option>
    </select>
</div>

</div>



                <!-- Submit Button -->
                <div class="pt-6">
                    <button type="submit" 
                            class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md">
                        Create Product
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection

<style>
    /* Custom fade-in animation */
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .animate-fade-in {
        animation: fadeIn 0.5s ease-out;
    }
</style>

<!-- Add this script at the bottom of your Blade template -->
<script>
    function previewImage(event, inputName) {
        const input = event.target;
        const file = input.files[0];
        const fileNameDisplay = document.getElementById(inputName + '-filename');
        const preview = document.getElementById(inputName + '-preview');

        if (file) {
            fileNameDisplay.textContent = file.name;

            const reader = new FileReader();
            reader.onload = function(e) {
                preview.src = e.target.result;
                preview.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        } else {
            fileNameDisplay.textContent = '';
            preview.classList.add('hidden');
        }
    }
    
    document.addEventListener('DOMContentLoaded', function () {
        const input = document.querySelector('#product_keyword');

              const featuredToggle = document.getElementById('featured-toggle');
            const featuredInput = document.getElementById('featured-input');
            const toggleStatus = document.getElementById('toggle-status');
            const featuredBadge = document.getElementById('featured-badge');

        if (input) {
            // Turn the input into a Tagify instance
            new Tagify(input, {
                delimiters: ",",          // use comma as delimiter
                maxTags: 10,
                dropdown: {
                    enabled: 0 // always show suggestions dropdown if available
                }
            });
        }

          // Handle featured toggle
            featuredToggle.addEventListener('change', function() {
                if (this.checked) {
                    featuredInput.value = '1';
                    toggleStatus.textContent = 'Enabled';
                    toggleStatus.classList.remove('text-gray-700');
                    toggleStatus.classList.add('text-yellow-600', 'font-bold');
                    featuredBadge.classList.remove('hidden');
                    
                    // Add animation effect
                    toggleStatus.classList.add('animate-pulse');
                    setTimeout(() => {
                        toggleStatus.classList.remove('animate-pulse');
                    }, 1000);
                } else {
                    featuredInput.value = '0';
                    toggleStatus.textContent = 'Disabled';
                    toggleStatus.classList.remove('text-yellow-600', 'font-bold', 'animate-pulse');
                    toggleStatus.classList.add('text-gray-700');
                    featuredBadge.classList.add('hidden');
                }
            });

    });
</script>