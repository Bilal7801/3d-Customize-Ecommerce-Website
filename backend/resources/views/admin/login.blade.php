@extends('admin.auth')

@section('title', 'Login – Fit Forge Admin')

@section('content')
<div class="text-center mb-8">
    <h1 class="text-3xl font-bold brand-logo">Fit Forge</h1>
    <p class="text-gray-600 mt-1">Admin Dashboard</p>
</div>

@if (session('status'))
    <div class="bg-green-100 text-green-800 text-sm px-4 py-3 rounded-lg mb-4">
        <i class="fas fa-check-circle mr-2"></i>{{ session('status') }}
    </div>
@endif
@if ($errors->any())
    <div class="bg-red-100 text-red-800 text-sm px-4 py-3 rounded-lg mb-4">
        <i class="fas fa-exclamation-circle mr-2"></i>
        <ul class="list-disc pl-5">
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

<form method="POST" action="{{ route('admin.login.submit') }}" class="space-y-6">
    @csrf

    <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
        <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-envelope text-gray-400"></i>
            </div>
            <input id="email" name="email" type="email" required placeholder="admin@example.com"
                class="w-full pl-10 pr-4 py-3 input-field rounded-lg focus:outline-none focus:ring-0">
        </div>
    </div>

    <div>
        <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
        <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-lock text-gray-400"></i>
            </div>
            <input id="password" name="password" type="password" required placeholder="Enter your password"
                class="w-full pl-10 pr-4 py-3 input-field rounded-lg focus:outline-none focus:ring-0">
        </div>
    </div>

    <div class="flex justify-between items-center">
        <div class="flex items-center">
            <input type="checkbox" name="remember" id="remember" class="h-4 w-4 text-accent border-gray-300">
            <label for="remember" class="ml-2 block text-sm text-gray-700">Remember me</label>
        </div>
        <a href="{{ route('admin.forgot.password') }}" class="text-sm text-accent hover:text-blue-700">Forgot password?</a>
    </div>

    <button type="submit" class="w-full btn-primary py-3 px-4 rounded-lg text-white font-medium">
        <i class="fas fa-sign-in-alt mr-2"></i>Sign In
    </button>
</form>

<div class="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
    <p>© 2025 Fit Forge. All rights reserved.</p>
</div>
@endsection
