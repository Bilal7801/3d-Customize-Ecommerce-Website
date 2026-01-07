<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminAuthController extends Controller
{
    public function showLoginForm()
    {
        if (Auth::check() && Auth::user()->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }
        return view('admin.login');
    }

    public function login(Request $request)
    {
        // 1. Validate inputs
        $validated = $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required'],
        ]);

        // 2. Normalize email (trim whitespace and lowercase)
        $credentials = [
            'email'    => strtolower(trim($validated['email'])),
            'password' => $validated['password']
        ];

        // 3. Debug: Check processed credentials
        // dd($credentials); // Uncomment to verify values before auth attempt

        // 4. Authentication attempt
        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            // 5. Verify admin role
            if (Auth::user()->role !== 'admin') {
                Auth::logout();
                return back()
                    ->withErrors(['email' => 'Administrator access only'])
                    ->onlyInput('email');
            }

            // 6. Regenerate session
            $request->session()->regenerate();
            return redirect()->route('admin.dashboard');
        }

        // 7. Failed authentication
        return back()
            ->withErrors(['email' => 'Invalid credentials. Please check your email and password.'])
            ->onlyInput('email');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('admin.login');
    }
}