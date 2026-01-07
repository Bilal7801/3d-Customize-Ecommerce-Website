@extends('layouts.dashboard')

@section('content')
    <style>
        /* Animations */
        @keyframes fadeInDown {
            0% {
                opacity: 0;
                transform: translateY(-20px);
            }

            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeInUp {
            0% {
                opacity: 0;
                transform: translateY(20px);
            }

            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .animate-fadeInDown {
            animation: fadeInDown 0.6s ease forwards;
        }

        .animate-fadeInUp {
            animation: fadeInUp 0.6s ease forwards;
        }

        /* Table row hover */
        tbody tr:hover {
            background-color: #e0f2fe;
        }

        /* Image zoom */
        .product-image {
            transition: transform 0.3s ease;
        }

        .product-image:hover {
            transform: scale(1.1);
        }

        /* Focus ring */
        button:focus,
        a:focus {
            outline: 2px solid transparent;
            outline-offset: 2px;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.6);
        }

        /* Panel styling */
        .panel {
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
            transition: box-shadow 0.3s ease;
        }

        .panel:hover {
            box-shadow: 0 15px 25px rgba(0, 0, 0, 0.1);
        }

        /* Table header */
        thead {
            background: linear-gradient(90deg, #bfdbfe 0%, #93c5fd 100%);
        }

        th,
        td {
            padding: 0.75rem 1rem;
            font-size: 0.9rem;
        }

        /* Delete button */
        .btn-delete {
            color: #dc2626;
            background: transparent;
            border: none;
            cursor: pointer;
            font-weight: 600;
            padding: 0.25rem 0.5rem;
            border-radius: 6px;
            transition: color 0.3s ease;
        }

        .btn-delete:hover {
            color: #b91c1c;
        }

        /* SweetAlert2 */
        .swal2-confirm-btn {
            background-color: #16a34a;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            font-weight: 600;
            border: none;
            margin-right: 10px;
            transition: background-color 0.3s ease;
        }

        .swal2-confirm-btn:hover {
            background-color: #15803d;
        }

        .swal2-cancel-btn {
            background-color: #dc2626;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            font-weight: 600;
            border: none;
            transition: background-color 0.3s ease;
        }

        .swal2-cancel-btn:hover {
            background-color: #b91c1c;
        }

        .swal2-actions-custom {
            gap: 1rem;
            justify-content: center;
        }

        tbody tr:last-child td:first-child {
            border-bottom-left-radius: 0.5rem;
        }

        tbody tr:last-child td:last-child {
            border-bottom-right-radius: 0.5rem;
        }
    </style>

    <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8 animate-fadeInDown">
            <h1 class="text-3xl font-bold text-gray-800 mb-8">View Products</h1>
        </div>


        <div class="panel animate-fadeInUp" role="region" aria-labelledby="products-table-title">

            <div class="overflow-x-auto">
                <table class="min-w-full table-auto text-sm text-left text-gray-700 rounded-lg overflow-hidden">
                    <thead class="rounded-t-lg">
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Image
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Price
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Keyword
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Edit
                            </th>
                            <th class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($products as $index => $product)
                            <tr class="bg-white border-b hover:bg-blue-50 transition-all">
                                <td>{{ $index + 1 }}</td>
                                <td class="font-medium text-gray-900">{{ $product->product_title }}</td>
                                <td class="text-center">
                                    @php $imgPath = $product->product_img1; @endphp
                                    @if ($imgPath && file_exists(public_path('storage/' . $imgPath)))
                                        <img src="{{ asset('storage/' . $imgPath) }}" alt="Product Image"
                                            class="w-16 h-12 object-cover rounded shadow product-image">
                                    @else
                                        <img src="{{ asset('images/default-product.png') }}" alt="No Image"
                                            class="w-16 h-12 object-cover opacity-50 rounded">
                                    @endif
                                </td>
                                <td class="text-center">
                                    <span
                                        class="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full shadow">
                                        ${{ number_format($product->product_price, 2) }}
                                    </span>
                                </td>
                                <td class="text-center">{{ $product->product_keyword }}</td>
                                <td class="text-center">{{ $product->date ? $product->date->format('d-m-Y h:i A') : 'N/A' }}
                                <td class="text-center">
                                    <a href="{{ route('admin.products.edit', $product) }}"
                                        class="inline-block bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-400">
                                        Edit
                                    </a>
                                </td>
                                </td>
                                <td class="text-center">
                                    <form action="{{ route('admin.products.destroy', $product) }}" method="POST"
                                        data-swal-delete>
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit"
                                            class="inline-flex items-center bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-400"
                                            aria-label="Delete product {{ $product->product_title }}">
                                            Delete
                                        </button>
                                    </form>
                                </td>

                            </tr>
                        @empty
                            <tr>
                                <td colspan="8" class="text-center text-gray-500 py-6">No products found</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- SweetAlert2 -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script>
        // Delete confirmation
        document.querySelectorAll('form[data-swal-delete]').forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();

                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'No, cancel!',
                    reverseButtons: true,
                    customClass: {
                        confirmButton: 'swal2-confirm-btn',
                        cancelButton: 'swal2-cancel-btn',
                        actions: 'swal2-actions-custom'
                    },
                    buttonsStyling: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.submit();
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire('Cancelled', 'Your product is safe :)', 'error');
                    }
                });
            });
        });

        // Success toast
        @if (session('success'))
            Swal.fire({
                toast: true,
                icon: 'success',
                title: "{{ session('success') }}",
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            });
        @endif
    </script>
@endsection
