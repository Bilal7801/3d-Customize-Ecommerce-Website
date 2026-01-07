@extends('layouts.dashboard')

@section('title', 'Refund Confirmation')

@section('content')
    <div class="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
        <h1 class="text-2xl font-semibold text-gray-800 mb-4">Refund Confirmation</h1>

        <p class="mb-6 text-gray-700">Are you sure you want to refund the following transaction?</p>

        <div class="space-y-4 text-sm text-gray-900">
            <div class="flex justify-between">
                <span class="font-medium">Transaction ID:</span>
                <span>{{ $payment->transaction_id }}</span>
            </div>
            <div class="flex justify-between">
                <span class="font-medium">Order Number:</span>
                <span>{{ $payment->order_number ?? 'N/A' }}</span>
            </div>
            <div class="flex justify-between">
                <span class="font-medium">Customer Email:</span>
                <span>{{ $payment->email ?? 'N/A' }}</span>
            </div>
            <div class="flex justify-between">
                <span class="font-medium">Amount:</span>
                <span>${{ number_format($payment->amount, 2) }}</span>
            </div>
            <div class="flex justify-between">
                <span class="font-medium">Status:</span>
                <span>{{ ucfirst($payment->status) }}</span>
            </div>
            <div class="flex justify-between">
                <span class="font-medium">Payment Method:</span>
                <span>{{ ucfirst($payment->payment_method ?? 'N/A') }}</span>
            </div>
            <div class="flex justify-between">
                <span class="font-medium">Date:</span>
                <span>{{ $payment->created_at->format('Y-m-d H:i') }}</span>
            </div>
        </div>

        <div class="mt-6 flex justify-end gap-4">
            <a href="{{ route('admin.payments') }}"
                class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Cancel</a>

            <form method="POST" action="{{ route('admin.refund.process', $payment->id) }}">
                @csrf
                <button type="submit"
                    class="w-full bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition mt-1 text-center block">
                    Confirm Refund
                </button>
            </form>


        </div>
    </div>
@endsection
