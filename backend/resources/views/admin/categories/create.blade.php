@extends('layouts.dashboard')

@section('content')
<style>
  @keyframes fadeInUp {
    0% {opacity: 0; transform: translateY(20px);}
    100% {opacity: 1; transform: translateY(0);}
  }
  .animate-fadeInUp {
    animation: fadeInUp 0.6s ease forwards;
  }

  input:focus, textarea:focus {
    outline: none;
    box-shadow: 0 0 8px 2px #3b82f6; /* Tailwind blue-500 */
    border-color: #3b82f6;
  }

  textarea {
    resize: none;
    min-height: 120px;
  }

  .btn-bounce:hover {
    animation: bounce 0.4s ease forwards;
  }
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
</style>

<div class="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg animate-fadeInUp">
    <h2 class="text-3xl font-extrabold mb-6 text-blue-600 tracking-wide flex items-center space-x-3">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-3-3v6m2 4H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v7" />
      </svg>
      <span>Insert Category</span>
    </h2>

    @if(session('success'))
        <div class="mb-6 p-3 rounded-md bg-green-100 text-green-800 border border-green-300 flex items-center space-x-2 animate-fadeInUp">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>{{ session('success') }}</span>
        </div>
    @endif

    <form method="POST" action="{{ route('admin.categories.store') }}" class="space-y-6">
        @csrf

        <div>
            <label for="cat_title" class="block text-lg font-semibold mb-2 text-gray-700">Category Title</label>
            <input 
                type="text" 
                name="cat_title" 
                id="cat_title" 
                class="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-300" 
                required 
                autocomplete="off"
                 placeholder="Enter category title" 
            >
            @error('cat_title') 
              <p class="text-red-600 text-sm mt-1">{{ $message }}</p> 
            @enderror
        </div>

        <div>
            <label for="cat_desc" class="block text-lg font-semibold mb-2 text-gray-700">Category Description</label>
            <textarea 
                name="cat_desc" 
                id="cat_desc" 
                class="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm resize-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Write a short description"
            ></textarea>
            @error('cat_desc') 
              <p class="text-red-600 text-sm mt-1">{{ $message }}</p> 
            @enderror
        </div>

        <button 
          type="submit" 
          class="btn-bounce w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg tracking-wide shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-300"
          aria-label="Insert new category"
        >
          Insert Category
        </button>
    </form>
</div>
@endsection
