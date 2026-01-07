@extends('layouts.dashboard')

@section('title', 'Payments')

@section('content')
    <div class="max-w-full mx-auto px-4">
        {{-- Page Heading --}}
        <h1 class="text-3xl font-semibold mb-6 animate-fadeInDown">Payment Transactions</h1>

        {{-- Search & Filter --}}
        <form method="GET" action="{{ route('admin.payments') }}" class="flex flex-wrap gap-4 mb-6 animate-fadeInDown">
            <input type="text" name="search" placeholder="Search by Transaction ID, Order ID, or Email"
                class="border border-gray-300 rounded px-4 py-2 flex-grow max-w-xs focus:outline-none focus:ring-2 focus:ring-indigo-500" />

            <select name="status"
                class="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">All Status</option>
                <option value="approved">Approved</option>
                <option value="declined">Declined</option>
                <option value="pending">Pending</option>
                <option value="refunded">Refunded</option>
            </select>

            <button type="submit"
                class="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition font-semibold">
                Filter
            </button>
        </form>

        {{-- Payments Table --}}
        <div class="overflow-x-auto rounded-lg border border-gray-200 panel animate-fadeInUp">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gradient-to-r from-blue-200 to-blue-300">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Transaction ID</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Order Number</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Customer Email</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Amount</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Payment Method</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date</th>
                        <th class="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    @foreach ($payments as $payment)
                        <tr class="hover:bg-blue-100 transition">
                            <td class="px-6 py-4 text-sm text-gray-900">{{ $payment->transaction_id }}</td>
                            <td class="px-6 py-4 text-sm text-gray-900">{{ $payment->order_number ?? 'N/A' }}</td>
                            <td class="px-6 py-4 text-sm text-gray-900">{{ $payment->email ?? 'N/A' }}</td>
                            <td class="px-6 py-4 text-sm text-gray-900">${{ number_format($payment->amount, 2) }}</td>
                            <td class="px-6 py-4 text-sm">
                                <span class="inline-flex px-2 py-1 rounded text-xs font-semibold
                                    @if ($payment->status === 'approved') bg-green-100 text-green-800
                                    @elseif($payment->status === 'declined') bg-red-100 text-red-800
                                    @elseif($payment->status === 'pending') bg-yellow-100 text-yellow-800
                                    @else bg-gray-100 text-gray-800 @endif">
                                    {{ ucfirst($payment->status) }}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-900">{{ ucfirst($payment->payment_method ?? 'N/A') }}</td>
                            <td class="px-6 py-4 text-sm text-gray-900">{{ $payment->created_at->format('Y-m-d H:i') }}</td>
                            <td class="px-6 py-4 text-center text-sm font-medium space-y-1">
                                <a href="{{ url('admin/payment_view/' . $payment->id) }}"
                                    class="inline-block bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition w-full">
                                    View
                                </a>

                                @if ($payment->status === 'approved')
                                    <a href="{{ url('admin/payment/refund_confirmation/' . $payment->id) }}"
                                        class="w-full bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition mt-1 text-center block">
                                        Refund
                                    </a>
                                @else
                                    <span
                                        class="w-full bg-gray-300 text-gray-600 px-3 py-1 rounded mt-1 text-center block cursor-not-allowed opacity-50">
                                        Refund
                                    </span>
                                @endif
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        {{-- Pagination --}}
        <div class="mt-6 flex justify-center space-x-2 text-gray-600">
            {{ $payments->links() }}
        </div>
    </div>

    {{-- Custom Styles --}}
    <style>
        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(10px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .animate-fadeInDown {
            animation: fadeInDown 0.6s ease-out both;
        }

        .animate-fadeInUp {
            animation: fadeInUp 0.6s ease-out both;
        }

        .panel {
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
            transition: box-shadow 0.3s ease;
        }

        .panel:hover {
            box-shadow: 0 15px 25px rgba(0, 0, 0, 0.1);
        }
    </style>
@endsection
