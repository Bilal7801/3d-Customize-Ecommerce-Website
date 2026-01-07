@extends('admin.auth')

@section('title', 'Reset Password – Fit Forge Admin')

@section('styles')
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
            background: rgba(255,255,255,0.92);
            backdrop-filter: blur(12px);
            border-radius: 16px;
            transition: all 0.3s ease;
            width: 100%;
            max-width: 420px;
        }
        .auth-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.35);
        }
        .input-field {
            transition: all 0.2s ease;
            background: rgba(255,255,255,0.95);
            border: 2px solid #e5e7eb;
        }
        .input-field:focus {
            border-color: #3B82F6;
            box-shadow: 0 0 0 4px rgba(59,130,246,0.15);
        }
        .btn-primary {
            background: linear-gradient(to right, #11181E, #1e293b);
            transition: all 0.3s ease;
            letter-spacing: 0.5px;
        }
        .btn-primary:hover {
            background: linear-gradient(to right, #1e293b, #11181E);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(17,24,30,0.3);
        }
        .message-box {
            transition: all 0.4s ease;
            opacity: 0;
            height: 0;
            overflow: hidden;
        }
        .message-box.active {
            opacity: 1;
            height: auto;
            padding: 1rem;
            margin-bottom: 1.5rem;
        }
        .password-toggle {
            transition: color 0.2s ease;
            cursor: pointer;
        }
        .password-toggle:hover {
            color: #3B82F6;
        }
        .password-strength {
            height: 4px;
            border-radius: 2px;
            margin-top: 6px;
            transition: width 0.3s ease, background-color 0.3s ease;
        }
        .password-criteria {
            display: flex;
            align-items: center;
            margin-bottom: 4px;
            font-size: 0.75rem;
            color: #6b7280;
        }
        .password-criteria i {
            margin-right: 6px;
            font-size: 0.6rem;
        }
        .password-criteria.valid {
            color: #10B981;
        }
    </style>
@endsection

@section('content')
        <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-gray-800">Reset Password</h2>
        </div>

        <div class="message-container">
            <div id="successMessage" class="message-box success-message bg-green-50 text-green-700 rounded-lg {{ session('message') ? 'active' : '' }}">
                <div class="flex items-start">
                    <i class="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                    <div>
                        @if(session('message'))
                            <p class="font-medium">{{ session('message') }}</p>
                            <p class="text-sm mt-1">Your password has been updated successfully.</p>
                        @endif
                    </div>
                </div>
            </div>

            <div id="errorMessage" class="message-box error-message bg-red-50 text-red-700 rounded-lg {{ $errors->any() ? 'active' : '' }}">
                <div class="flex items-start">
                    <i class="fas fa-exclamation-circle text-red-500 mt-1 mr-3"></i>
                    <div>
                        <p class="font-medium">Something went wrong</p>
                        <ul class="error-list text-sm mt-1 list-disc list-inside">
                            @foreach($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <form id="resetPasswordForm" method="POST" action="{{ route('admin.password.update') }}" class="space-y-5">
            @csrf
            <input type="hidden" name="token" value="{{ $token }}">
            <input type="hidden" name="email" value="{{ $email }}">

            <div>
                <label for="new-password" class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-lock text-gray-400"></i>
                    </div>
                    <input id="new-password" name="password" type="password" placeholder="Enter new password" class="w-full pl-10 pr-12 py-3 input-field rounded-lg focus:outline-none focus:ring-0">
                    <button type="button" id="togglePassword1" class="absolute inset-y-0 right-0 pr-3 flex items-center password-toggle text-gray-500">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>

            <div>
                <label for="confirm-password" class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-lock text-gray-400"></i>
                    </div>
                    <input id="confirm-password" name="password_confirmation" type="password" placeholder="Confirm password" class="w-full pl-10 pr-12 py-3 input-field rounded-lg focus:outline-none focus:ring-0">
                    <button type="button" id="togglePassword2" class="absolute inset-y-0 right-0 pr-3 flex items-center password-toggle text-gray-500">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>

            <div>
                <button type="submit" class="btn-primary w-full py-3 text-white rounded-lg font-semibold text-sm">Reset Password</button>
            </div>
        </form>
@endsection
 