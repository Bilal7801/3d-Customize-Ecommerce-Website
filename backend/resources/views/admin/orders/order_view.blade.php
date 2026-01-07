@extends('layouts.dashboard')

@section('title', 'Order Details')

@section('content')
    <div class="max-w-4xl mx-auto mt-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">Order #{{ $order->id }}</h1>

        <div class="bg-white p-6 rounded-xl shadow-md border border-gray-200 space-y-6">

            {{-- Customer Info --}}
            <div>
                <h2 class="text-xl font-semibold text-indigo-600 mb-2">Customer Details</h2>
                <div class="text-gray-700 space-y-1">
                    <p><strong>Name:</strong> {{ $order->customer->first_name }} {{ $order->customer->last_name }}</p>
                    <p><strong>Email:</strong> {{ $order->customer->email }}</p>
                </div>
            </div>

            <hr>

            {{-- Order Info --}}
            <div>
                <h2 class="text-xl font-semibold text-indigo-600 mb-2">Order Information</h2>
                <div class="text-gray-700 space-y-1">
                    <p><strong>Status:</strong>
                        <span
                            class="inline-block px-3 py-1 rounded-full text-sm font-semibold
                        {{ $order->status === 'completed' ? 'bg-green-100 text-green-800' : ($order->status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800') }}">
                            {{ ucfirst($order->status) }}
                        </span>
                    </p>
                    <p><strong>Total:</strong> ${{ number_format($order->total, 2) }}</p>
                    <p><strong>Order Date:</strong> {{ $order->created_at->format('Y-m-d H:i') }}</p>
                </div>
            </div>

            {{-- Order Data (JSON) --}}
            @if (!empty($order->data))
                <hr>
                <div>
                    <h2 class="text-xl font-semibold text-indigo-600 mb-2">Order Data</h2>
                    <pre class="bg-gray-100 p-4 rounded text-sm text-gray-800 overflow-auto whitespace-pre-wrap leading-relaxed">
{{ json_encode(json_decode($order->data), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) }}
            </pre>
                </div>
            @endif
        </div>

        {{-- Buttons --}}
        <div class="mt-6 flex gap-4 justify-end">
            <a href="{{ route('admin.orders') }}"
                class="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
                ← Back to Orders
            </a>

            {{-- Track Button --}}
            <a href="#"
                class="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                {{-- Heroicons: Truck Icon --}}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.25 7.5h11.25v9H2.25V7.5zM13.5 10.5H19.25L21.75 13.5v3H13.5v-6zM5.25 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17.25 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                Track Order
            </a>

        </div>
    </div>
@endsection
