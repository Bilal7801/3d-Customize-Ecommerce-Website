{{-- resources/views/admin/auth/forgot-password.blade.php --}}
@extends('admin.auth')

@section('title', 'Forgot Password – Fit Forge Admin')

@section('content')
    <!-- Header -->
    <div class="text-center mb-10">
        <h2 class="text-2xl font-bold text-gray-800">Forgot Password?</h2>
        <p class="text-gray-600 mt-2 max-w-xs mx-auto">
            Enter your email to receive a password reset link
        </p>
    </div>

    <!-- Laravel Blade Form -->
    <form method="POST" action="{{ route('admin.password.email') }}" class="space-y-6">
        @csrf

        <!-- Email Field -->
        <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-envelope text-gray-400"></i>
                </div>
                <input id="email" name="email" type="email" placeholder="admin@example.com" required
                    class="w-full pl-10 pr-4 py-3 input-field rounded-lg focus:outline-none focus:ring-0 border-2 border-gray-200 focus:border-blue-500">
            </div>
        </div>

        <!-- Messages -->
        @if (session('status'))
            <div class="message-box bg-green-100 text-green-800 text-sm px-4 py-3 rounded-lg">
                <i class="fas fa-check-circle mr-2"></i>{{ session('status') }}
            </div>
        @endif
        @if ($errors->any())
            <div class="message-box bg-red-100 text-red-800 text-sm px-4 py-3 rounded-lg">
                <i class="fas fa-exclamation-circle mr-2"></i>
                <ul class="list-disc pl-5">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <!-- Submit Button -->
        <button type="submit"
            class="w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white py-3 px-4 rounded-lg font-medium hover:from-gray-700 hover:to-gray-900 transition">
            <i class="fas fa-paper-plane mr-2"></i> Send Reset Link
        </button>
    </form>

    <!-- Back to Login -->
    <div class="text-center mt-6 pt-5 border-t border-gray-200">
        <a href="{{ route('admin.login') }}"
            class="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center justify-center">
            <i class="fas fa-arrow-left mr-2"></i> Back to Login
        </a>
    </div>

    <!-- Footer -->
    <div class="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
        <p>© 2025 Fit Forge. All rights reserved.</p>
    </div>
@endsection

@section('scripts')
    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
@endsection
