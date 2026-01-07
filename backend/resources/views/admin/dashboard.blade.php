@extends('layouts.dashboard')

@section('content')
    <h1 class="text-3xl font-bold mb-6 flex items-center gap-2">
        <i class='bx bx-grid-alt text-xl'></i> Welcome to the Admin Dashboard
    </h1>

    <!-- Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
            <i class='bx bx-shopping-bag text-3xl text-blue-500'></i>
            <div>
                <h3 class="text-lg font-semibold text-gray-600">Total Products</h3>
                <p class="text-3xl font-bold text-gray-800 mt-2">120</p>
            </div>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
            <i class='bx bx-package text-3xl text-indigo-500'></i>
            <div>
                <h3 class="text-lg font-semibold text-gray-600">Total Orders</h3>
                <p class="text-3xl font-bold text-gray-800 mt-2">45</p>
            </div>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
            <i class='bx bx-user text-3xl text-green-500'></i>
            <div>
                <h3 class="text-lg font-semibold text-gray-600">Total Customers</h3>
                <p class="text-3xl font-bold text-gray-800 mt-2">80</p>
            </div>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
            <i class='bx bx-dollar text-3xl text-teal-500'></i>
            <div>
                <h3 class="text-lg font-semibold text-gray-600">Revenue</h3>
                <p class="text-3xl font-bold text-gray-800 mt-2">$5,000</p>
            </div>
        </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <!-- Sales Chart -->
        <div class="bg-white p-6 rounded-lg shadow-md h-64">
            <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
                <i class='bx bx-bar-chart text-xl text-blue-600'></i> Sales Chart
            </h3>
            <canvas id="salesChart" class="h-full w-full"></canvas>
        </div>

        <!-- Revenue Trend -->
        <div class="bg-white p-6 rounded-lg shadow-md h-64">
            <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
                <i class='bx bx-trending-up text-xl text-green-600'></i> Revenue Trend
            </h3>
            <canvas id="revenueChart" class="h-full w-full"></canvas>
        </div>
    </div>

    <!-- Recent Orders & Latest Products -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Recent Orders -->
        <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
                <i class='bx bx-time text-xl'></i> Recent Orders
            </h2>
            <ul>
                <li class="mb-3 border-b pb-2">
                    <span class="font-semibold">Order #123</span> - $250 - <span class="text-green-600">Shipped</span>
                </li>
                <li class="mb-3 border-b pb-2">
                    <span class="font-semibold">Order #124</span> - $80 - <span class="text-yellow-500">Pending</span>
                </li>
                <li class="mb-3 border-b pb-2">
                    <span class="font-semibold">Order #125</span> - $120 - <span class="text-red-500">Cancelled</span>
                </li>
            </ul>
        </div>

        <!-- Latest Products -->
        <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
                <i class='bx bx-box text-xl'></i> Latest Products
            </h2>
            <ul>
                <li class="mb-3 border-b pb-2">
                    <span class="font-semibold">Sports T-Shirt</span> - In Stock
                </li>
                <li class="mb-3 border-b pb-2">
                    <span class="font-semibold">Running Shoes</span> - 5 Left
                </li>
                <li class="mb-3 border-b pb-2">
                    <span class="font-semibold">Gym Shorts</span> - Out of Stock
                </li>
            </ul>
        </div>
    </div>

    <!-- Top Customers -->
    <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
            <i class='bx bx-user-check text-xl'></i> Top Customers
        </h2>
        <table class="min-w-full table-auto">
            <thead>
                <tr class="bg-gray-100 text-left">
                    <th class="px-4 py-2">Name</th>
                    <th class="px-4 py-2">Email</th>
                    <th class="px-4 py-2">Orders</th>
                    <th class="px-4 py-2">Spent</th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-b">
                    <td class="px-4 py-2">John Doe</td>
                    <td class="px-4 py-2">john@example.com</td>
                    <td class="px-4 py-2">12</td>
                    <td class="px-4 py-2">$1,200</td>
                </tr>
                <tr class="border-b">
                    <td class="px-4 py-2">Ali Khan</td>
                    <td class="px-4 py-2">ali@example.com</td>
                    <td class="px-4 py-2">9</td>
                    <td class="px-4 py-2">$950</td>
                </tr>
                <tr>
                    <td class="px-4 py-2">Sara Ahmed</td>
                    <td class="px-4 py-2">sara@example.com</td>
                    <td class="px-4 py-2">7</td>
                    <td class="px-4 py-2">$730</td>
                </tr>
            </tbody>
        </table>
    </div>
@endsection

@section('scripts')
    <!-- Chart.js CDN -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        // Dummy labels & data
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
        const salesData = [100, 150, 130, 170, 160];
        const revenueData = [4000, 4500, 4800, 5000, 5300];

        // Sales Bar Chart
        new Chart(document.getElementById('salesChart').getContext('2d'), {
            type: 'bar',
            data: {
                labels: months,
                datasets: [{
                    label: 'Sales',
                    data: salesData,
                    backgroundColor: '#3b82f6',
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true, position: 'top' }
                }
            }
        });

        // Revenue Line Chart
        new Chart(document.getElementById('revenueChart').getContext('2d'), {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'Revenue ($)',
                    data: revenueData,
                    fill: true,
                    backgroundColor: 'rgba(16,185,129,0.2)',
                    borderColor: '#10b981',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true, position: 'top' }
                }
            }
        });
    </script>
@endsection