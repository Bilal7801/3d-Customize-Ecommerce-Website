@extends('layouts.dashboard')

@section('title', 'Orders')

@section('content')
    {{-- SweetAlert2 CDN --}}
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <style>
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInUp   { from { opacity: 0; transform: translateY(10px); }  to { opacity: 1; transform: translateY(0); } }

        .animate-fadeInDown { animation: fadeInDown 0.6s ease-out both; }
        .animate-fadeInUp   { animation: fadeInUp   0.6s ease-out both; }

        .panel {
            background: white;
            border-radius: 0.75rem;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
            overflow: hidden;
        }

        thead {
            background: linear-gradient(90deg, #bfdbfe 0%, #93c5fd 100%);
        }

        tbody tr:hover {
            background-color: #e0f2fe;
        }

        table {
            border-collapse: separate;
            border-spacing: 0;
            border-radius: 0.75rem;
        }

        /* Round top corners of first row and bottom corners of last row */
        tbody tr:first-child td:first-child {
            border-top-left-radius: 0.75rem;
        }

        tbody tr:first-child td:last-child {
            border-top-right-radius: 0.75rem;
        }

        tbody tr:last-child td:first-child {
            border-bottom-left-radius: 0.75rem;
        }

        tbody tr:last-child td:last-child {
            border-bottom-right-radius: 0.75rem;
        }
    </style>

    <div class="max-w-full mx-auto">
        <h1 class="text-3xl font-extrabold text-gray-800 mb-6 animate-fadeInDown">Orders</h1>

        {{-- Search --}}
        <form method="GET" action="{{ route('admin.orders') }}" class="flex flex-wrap gap-4 mb-6">
            <input type="text" name="search" value="{{ request('search') }}"
                placeholder="Search by Customer Name, Email or Order ID"
                class="border border-gray-300 rounded px-4 py-2 flex-grow max-w-xs focus:outline-none focus:ring-2 focus:ring-indigo-500" />

            <button type="submit" class="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition">
                Search
            </button>
        </form>

        {{-- Orders Table --}}
        <div class="w-full panel animate-fadeInUp">
            <table class="w-full table-auto divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">#</th>
                        <th class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Customer</th>
                        <th class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Email</th>
                        <th class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                        <th class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Total</th>
                        <th class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                        <th class="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    @forelse ($orders as $order)
                        <tr>
                            <td class="px-6 py-4 text-sm text-gray-900">{{ $order->id }}</td>
                            <td class="px-6 py-4 text-sm text-gray-900">
                                {{ $order->customer->first_name }} {{ $order->customer->last_name }}
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-900">{{ $order->customer->email }}</td>
                            <td class="px-6 py-4 text-sm">
                                <span class="inline-flex px-2 py-1 rounded text-xs font-semibold
                                    {{ $order->status === 'completed' ? 'bg-green-100 text-green-800' : ($order->status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800') }}">
                                    {{ ucfirst($order->status) }}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-900">${{ number_format($order->total, 2) }}</td>
                            <td class="px-6 py-4 text-sm text-gray-900">{{ $order->created_at->format('Y-m-d') }}</td>
                            <td class="px-6 py-4 text-center text-sm font-medium">
                                <a href="{{ route('admin.orders.view', $order->id) }}"
                                    class="inline-block bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition w-full text-center">
                                    View
                                </a>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="7" class="text-center py-4 text-gray-500">No orders found.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        {{-- Pagination --}}
        <div class="mt-6 flex justify-center space-x-2 text-gray-600">
            {{ $orders->links() }}
        </div>
    </div>
@endsection
