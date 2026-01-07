{{-- <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Admin – Fit Forge')</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
    <style>
        .bg-dash-pic {
            background-image: url('{{ asset('images/dash-pic.jpg') }}');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }

        .bg-overlay {
            background: rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(1px);
        }
    </style>
</head>

<body class="min-h-screen bg-dash-pic relative">

    <!-- Dark overlay -->
    <div class="absolute inset-0 bg-overlay"></div>

    <!-- Page Content -->
    <div class="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div class="w-full max-w-md bg-white bg-opacity-90 rounded-xl shadow-2xl p-8">
            @yield('content')
        </div>
    </div>

</body>

@yield('scripts')
</html> --}}

{{-- resources/views/admin/layouts/auth.blade.php --}}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Admin – Fit Forge')</title>

    <!-- Font Awesome & Tailwind -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'primary': '#11181E',
                        'accent': '#3B82F6',
                        'success': '#10B981',
                        'error': '#EF4444'
                    },
                    boxShadow: {
                        'input': '0 2px 10px rgba(59, 130, 246, 0.2)',
                        'card': '0 10px 25px rgba(0, 0, 0, 0.3)'
                    }
                }
            }
        }
    </script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        body {
            font-family: 'Inter', sans-serif;
            background-color: #11181E;
            background-image: radial-gradient(circle at 25% 25%, rgba(37, 52, 66, 0.8) 0%, rgba(17, 24, 30, 0.9) 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }

        .auth-card {
            background: rgba(255, 255, 255, 0.92);
            backdrop-filter: blur(12px);
            border-radius: 16px;
            transition: all 0.3s ease;
            width: 100%;
            max-width: 420px;
        }

        .auth-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.35);
        }

        .input-field {
            transition: all 0.2s ease;
            background: rgba(255, 255, 255, 0.95);
            border: 2px solid #e5e7eb;
        }

        .input-field:focus {
            border-color: #3B82F6;
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
        }

        .btn-primary {
            background: linear-gradient(to right, #11181E, #1e293b);
            transition: all 0.3s ease;
            letter-spacing: 0.5px;
        }

        .btn-primary:hover {
            background: linear-gradient(to right, #1e293b, #11181E);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(17, 24, 30, 0.3);
        }

        .brand-logo {
            font-weight: 700;
            letter-spacing: -0.5px;
            background: linear-gradient(45deg, #11181E, #3B82F6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    </style>

    @yield('styles')
</head>

<body>
    <div class="auth-card p-8 shadow-card">
        @yield('content')
    </div>

    @yield('scripts')
</body>
</html>
