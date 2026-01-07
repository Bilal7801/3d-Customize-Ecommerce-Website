{{-- resources/views/admin/product_categories.blade.php --}}

@extends('layouts.dashboard')

@section('title', 'Product Categories')

@section('content')
    {{-- SweetAlert2 CDN --}}
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    {{-- Success & Error Toasts --}}
    @if (session('success'))
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

    @if (session('error'))
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
        @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInDown { animation: fadeInDown 0.6s ease-out both; }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out both; }

        .panel {
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
            transition: box-shadow 0.3s ease;
        }
        .panel:hover {
            box-shadow: 0 15px 25px rgba(0, 0, 0, 0.1);
        }
        thead {
            background: linear-gradient(90deg, #bfdbfe 0%, #93c5fd 100%);
        }
        th, td {
            padding: 0.75rem 1rem;
            font-size: 0.9rem;
            text-align: left;
        }
        tbody tr:hover {
            background-color: #e0f2fe;
        }

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
    </style>

    <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8 animate-fadeInDown">
            <h1 class="text-3xl font-bold text-gray-800 mb-8">Product Categories</h1>
        </div>

        {{-- Categories Table --}}
        <div class="overflow-x-auto rounded-lg border border-gray-200 panel animate-fadeInUp">
            <table class="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">#</th>
                        <th class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Title</th>
                        <th class="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Description</th>
                        <th class="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Edit</th>
                        <th class="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Delete</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    @foreach ($categories as $index => $cat)
                        <tr>
                            <td class="px-6 py-4 text-sm text-gray-900">{{ $index + 1 }}</td>
                            <td class="px-6 py-4 text-sm text-gray-900">{{ $cat->p_cat_title }}</td>
                            <td class="px-6 py-4 text-sm text-gray-900">{{ $cat->p_cat_desc }}</td>
                            <td class="px-6 py-4 text-center text-sm">
                                <a href="{{ route('admin.product_categories.edit', $cat->p_cat_id) }}"
                                   class="inline-block bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition w-16">
                                    Edit
                                </a>
                            </td>
                            <td class="px-6 py-4 text-center text-sm">
                                <form id="delete-form-{{ $cat->p_cat_id }}"
                                      action="{{ route('admin.product_categories.destroy', $cat->p_cat_id) }}"
                                      method="POST">
                                    @csrf
                                    @method('DELETE')
                                    <button type="button"
                                            onclick="confirmDelete({{ $cat->p_cat_id }})"
                                            class="inline-block bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition w-16">
                                        Delete
                                    </button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

        {{-- Pagination --}}
        @if (method_exists($categories, 'links'))
            <div class="mt-6 flex justify-center space-x-2 text-gray-600">
                {{ $categories->links() }}
            </div>
        @endif
    </div>

    <script>
        function confirmDelete(id) {
            Swal.fire({
                title: 'Are you sure?',
                text: "This action cannot be undone.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                customClass: {
                    confirmButton: 'swal2-confirm-btn',
                    cancelButton: 'swal2-cancel-btn',
                    actions: 'swal2-actions-custom'
                },
                buttonsStyling: false
            }).then((result) => {
                if (result.isConfirmed) {
                    document.getElementById('delete-form-' + id).submit();
                }
            });
        }
    </script>
@endsection
