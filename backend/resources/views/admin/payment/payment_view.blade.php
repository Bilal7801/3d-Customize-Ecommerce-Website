{{-- resources/views/admin/payment\_details.blade.php --}}

@extends('layouts.dashboard')

@section('title', 'Payment Details')

@section('content')
{{-- SweetAlert2 CDN --}} <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

```
{{-- Success & Error Toasts --}}
@if(session('success'))
<script>
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: "{{ session('success') }}",
        showConfirmButton: false,
        timer: 3000
    });
</script>
@endif

@if(session('error'))
<script>
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "{{ session('error') }}",
        confirmButtonColor: '#e3342f'
    });
</script>
@endif

<style>
    @keyframes fadeInDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeInUp   { from { opacity: 0; transform: translateY(10px); }  to { opacity: 1; transform: translateY(0); } }
    .animate-fadeInDown { animation: fadeInDown 0.6s ease-out both; }
    .animate-fadeInUp   { animation: fadeInUp   0.6s ease-out both; }

    .panel { background: white; border-radius: 12px; box-shadow: 0 10px 20px rgba(0,0,0,0.05); transition: box-shadow 0.3s ease; }
    .panel:hover { box-shadow: 0 15px 25px rgba(0,0,0,0.1); }
    th, td { padding: 0.75rem 1rem; font-size: 0.9rem; }
</style>

<div class="max-w-3xl mx-auto px-6 py-8 panel animate-fadeInUp">
    <h2 class="text-2xl font-semibold mb-6 animate-fadeInDown">Payment Details</h2>

    <div class="grid grid-cols-2 gap-4 mb-6">
        <div>
            <p class="text-sm text-gray-500">Transaction ID</p>
            <p class="font-medium text-gray-900">{{ $payment->transaction_id ?? 'N/A' }}</p>
        </div>
        <div>
            <p class="text-sm text-gray-500">Order Number</p>
            <p class="font-medium text-gray-900">{{ $payment->order_number ?? 'N/A' }}</p>
        </div>
        <div>
            <p class="text-sm text-gray-500">Customer Email</p>
            <p class="font-medium text-gray-900">{{ $payment->email ?? 'N/A' }}</p>
        </div>
        <div>
            <p class="text-sm text-gray-500">Amount</p>
            <p class="font-medium text-gray-900">${{ number_format($payment->amount ?? 0, 2) }}</p>
        </div>
        <div>
            <p class="text-sm text-gray-500">Status</p>
            <span class="inline-block px-2 py-1 rounded text-xs font-semibold
                @if($payment->status == 'approved') bg-green-100 text-green-800
                @elseif($payment->status == 'declined') bg-red-100 text-red-800
                @elseif($payment->status == 'pending') bg-yellow-100 text-yellow-800
                @else bg-gray-100 text-gray-800
                @endif">
                {{ ucfirst($payment->status ?? 'N/A') }}
            </span>
        </div>
        <div>
            <p class="text-sm text-gray-500">Payment Method</p>
            <p class="font-medium text-gray-900">{{ ucfirst($payment->payment_method ?? 'N/A') }}</p>
        </div>
        <div>
            <p class="text-sm text-gray-500">Paid At</p>
            <p class="font-medium text-gray-900">{{ $payment->created_at ? $payment->created_at->format('Y-m-d H:i') : 'Not recorded' }}</p>
        </div>
    </div>

    @if (!empty($payment->response_data))
        <h3 class="text-lg font-semibold mb-2 text-gray-700">Full Response</h3>
        <div class="p-4 bg-gray-100 text-sm font-mono rounded overflow-auto">
            <pre>{{ json_encode(json_decode($payment->response_data), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) }}</pre>
        </div>
    @endif

    <div class="mt-6">
        <a href="{{ route('admin.payments') }}" class="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition">
            ← Back to Payments
        </a>
    </div>
</div>
```

@endsection
