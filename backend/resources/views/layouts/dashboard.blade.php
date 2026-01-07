<!-- resources/views/layouts/admin.blade.php -->

<!DOCTYPE html>
<html lang="en" x-data="{ openDropdown: null }" x-cloak>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>

    <!-- Tailwind CSS -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">

    <!-- Boxicons -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>

    <!-- Alpine.js -->
    <script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" defer></script>

    <!-- Tagify (optional enhancement support) -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@yaireo/tagify/dist/tagify.css">
    <script src="https://cdn.jsdelivr.net/npm/@yaireo/tagify"></script>

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
</head>

<body class="font-sans bg-gray-900 text-white">

    <div class="min-h-screen flex bg-gray-800">

        <!-- Sidebar -->
        <div class="w-72 flex flex-col justify-between rounded-xl shadow-lg" style="background-color: #11181E;">

            <div class="p-6">
                <h2 class="text-2xl font-bold mb-6">Admin Panel</h2>
                <ul class="space-y-2">
                    <li>
                        <a href="{{ route('admin.dashboard') }}"
                            class="inline-flex items-center gap-2 w-full px-4 py-2 rounded hover:bg-white hover:text-black transition-all duration-300">
                            <i class='bx bx-home-alt'></i> Dashboard
                        </a>
                    </li>

                    <!-- Products Dropdown -->
                    <li>
                        <button @click="openDropdown === 'products' ? openDropdown = null : openDropdown = 'products'"
                            class="inline-flex items-center justify-between w-full px-4 py-2 rounded hover:bg-white hover:text-black transition-all duration-300">
                            <div class="flex items-center gap-2">
                                <i class='bx bx-store-alt'></i> Products
                            </div>
                            <i :class="openDropdown === 'products' ? 'bx bx-chevron-up' : 'bx bx-chevron-down'"></i>
                        </button>
                        <ul x-show="openDropdown === 'products'" x-transition class="pl-8 mt-2 space-y-2">
                            <li>
                                <a href="{{ route('admin.products.create') }}"
                                    class="inline-flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700 transition-all duration-300">
                                    Insert Product
                                </a>
                            </li>
                            <li>
                                <a href="{{ route('admin.products.index') }}"
                                    class="inline-flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700 transition-all duration-300">
                                    View Products
                                </a>
                            </li>
                        </ul>
                    </li>

                    <!-- Product Categories Dropdown -->
                    <li>
                        <button @click="openDropdown === 'product_categories' ? openDropdown = null : openDropdown = 'product_categories'"
                            class="inline-flex items-center justify-between w-full px-4 py-2 rounded hover:bg-white hover:text-black transition-all duration-300">
                            <div class="flex items-center gap-2">
                                <i class='bx bx-category'></i> Product Categories
                            </div>
                            <i :class="openDropdown === 'product_categories' ? 'bx bx-chevron-up' : 'bx bx-chevron-down'"></i>
                        </button>
                        <ul x-show="openDropdown === 'product_categories'" x-transition class="pl-8 mt-2 space-y-2">
                            <li>
                                <a href="{{ url('/admin/product-categories/create') }}"
                                    class="flex items-center gap-2 px-4 py-2 rounded text-white hover:bg-gray-700 transition-all duration-300 whitespace-nowrap">
                                    Insert Product Category
                                </a>
                            </li>
                            <li>
                                <a href="{{ url('/admin/product-categories') }}"
                                    class="flex items-center gap-2 px-4 py-2 rounded text-white hover:bg-gray-700 transition-all duration-300 whitespace-nowrap">
                                    View Product Categories
                                </a>
                            </li>
                        </ul>
                    </li>

                    <!-- Categories Dropdown -->
                    <li>
                        <button @click="openDropdown === 'categories' ? openDropdown = null : openDropdown = 'categories'"
                            class="inline-flex items-center justify-between w-full px-4 py-2 rounded hover:bg-white hover:text-black transition-all duration-300">
                            <div class="flex items-center gap-2">
                                <i class='bx bx-grid-alt'></i> Categories
                            </div>
                            <i :class="openDropdown === 'categories' ? 'bx bx-chevron-up' : 'bx bx-chevron-down'"></i>
                        </button>
                        <ul x-show="openDropdown === 'categories'" x-transition class="pl-8 mt-2 space-y-2">
                            <li>
                                <a href="{{ url('/admin/categories/create') }}"
                                    class="inline-flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700 transition-all duration-300">
                                    Insert Category
                                </a>
                            </li>
                            <li>
                                <a href="{{ url('/admin/categories') }}"
                                    class="inline-flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700 transition-all duration-300">
                                    View Categories
                                </a>
                            </li>
                        </ul>
                    </li>

                    <!-- Static Links -->
                    <li>
                        <a href="{{ route('admin.orders') }}"
                            class="inline-flex items-center gap-2 w-full px-4 py-2 rounded hover:bg-white hover:text-black transition-all duration-300">
                            <i class='bx bx-box'></i> Orders
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('admin.payments') }}"
                            class="inline-flex items-center gap-2 w-full px-4 py-2 rounded hover:bg-white hover:text-black transition-all duration-300">
                            <i class='bx bx-wallet'></i> Payments
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('admin.customer.customers') }}"
                            class="inline-flex items-center gap-2 w-full px-4 py-2 rounded hover:bg-white hover:text-black transition-all duration-300">
                            <i class='bx bx-user'></i> Customers
                        </a>
                    </li>
                    <li>
                        <a href="#"
                            class="inline-flex items-center gap-2 w-full px-4 py-2 rounded hover:bg-white hover:text-black transition-all duration-300">
                            <i class='bx bx-line-chart'></i> Statistics
                        </a>
                    </li>

                    <hr class="my-3 border-gray-600">

                    <li>
                        <a href="#"
                            class="inline-flex items-center gap-2 w-full px-4 py-2 rounded hover:bg-white hover:text-black transition-all duration-300">
                            <i class='bx bx-bell'></i> Notification
                        </a>
                    </li>
                    <li>
                        <a href="#"
                            class="inline-flex items-center gap-2 w-full px-4 py-2 rounded hover:bg-white hover:text-black transition-all duration-300">
                            <i class='bx bx-help-circle'></i> Help
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('admin.settings') }}"
                            class="inline-flex items-center gap-2 w-full px-4 py-2 rounded hover:bg-white hover:text-black transition-all duration-300">
                            <i class='bx bx-cog'></i> Settings
                        </a>
                    </li>
                </ul>
            </div>

            <!-- Logout -->
            <form method="POST" action="{{ route('admin.logout') }}">
                @csrf
                <ul class="space-y-2 px-6 pb-6">
                    <li>
                        <button type="submit"
                            class="inline-flex items-center gap-2 w-full px-4 py-2 rounded hover:bg-white hover:text-black transition-all duration-300">
                            <i class='bx bx-log-out'></i> Logout
                        </button>
                    </li>
                </ul>
            </form>
        </div>

        <!-- Content Area -->
        <div class="absolute top-2 left-72 right-2 bottom-2 bg-white text-black rounded-xl shadow-2xl p-8 z-10 overflow-auto">
            @yield('content')
        </div>
    </div>

    @yield('scripts')
</body>

</html>
