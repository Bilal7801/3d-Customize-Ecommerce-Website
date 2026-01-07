@extends('layouts.dashboard')

@section('title', 'Customer Details')

@section('content')
<div class="max-w-3xl mx-auto px-6 py-8 bg-white rounded shadow">
    <h2 class="text-2xl font-semibold mb-6">Customer Details</h2>

    <div class="grid grid-cols-2 gap-4 mb-6">
        <div>
            <p class="text-sm text-gray-500">Full Name</p>
            <p class="font-medium text-gray-900">{{ $customer->first_name ?? 'N/A' }}</p>
        </div>
        <div>
            <p class="text-sm text-gray-500">Full Name</p>
            <p class="font-medium text-gray-900">{{ $customer->last_name ?? 'N/A' }}</p>
        </div>
        <div>
            <p class="text-sm text-gray-500">Email Address</p>
            <p class="font-medium text-gray-900">{{ $customer->email ?? 'N/A' }}</p>
        </div>
        <div>
            <p class="text-sm text-gray-500">Account Created</p>
            <p class="font-medium text-gray-900">{{ $customer->created_at ? $customer->created_at->format('Y-m-d H:i') : 'N/A' }}</p>
        </div>
    </div>7
    <div class="mt-6">
        <a href="{{ route('admin.customer.customers') }}" class="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
            ← Back to Customers
        </a>
    </div>
</div>
@endsection
