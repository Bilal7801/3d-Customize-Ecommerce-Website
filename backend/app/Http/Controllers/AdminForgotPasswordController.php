<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\PasswordReset;

class AdminForgotPasswordController extends Controller
{
    public function showLinkRequestForm()
    {
        return view('admin.forgot-password');
    }

    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $admin = User::where('email', $request->email)
            ->where('role', 'admin')
            ->first();

        if (!$admin) {
            return back()->withErrors(['email' => 'Email not found.']);
        }

        $status = Password::broker('admins')->sendResetLink(
            ['email' => $request->email]
        );

        if ($status === Password::RESET_LINK_SENT) {
            return back()->with('message', 'Password reset link has been sent to your email address.');
        }

        return back()->withErrors(['email' => __($status)]);
    }

    public function showResetForm(Request $request, $token = null)
    {
        return view('admin.reset-password')->with([
            'token' => $token,
            'email' => $request->email,
        ]);
    }

    public function reset(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed|min:8',
        ]);

        $email = strtolower(trim($request->email)); // Normalize email
        $admin = User::where('email', $email)->first();

        if (!$admin) {
            return back()->withErrors(['email' => 'Email not found.']);
        }

        if ($admin->role !== 'admin') {
            return back()->withErrors(['email' => 'Only admins can reset their password.']);
        }

        $status = Password::broker('admins')->reset(
            [
                'email' => $email,
                'password' => $request->password,
                'password_confirmation' => $request->password_confirmation,
                'token' => $request->token,
            ],
            function ($admin, $password) {
                // 🧠 Ensure proper hashing
                $admin->password = $password;
                $admin->setRememberToken(Str::random(60));
                $admin->save();

                event(new PasswordReset($admin));
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return redirect()->route('admin.login')->with('message', __($status));
        }

        return back()->withErrors(['email' => [__($status)]]);
    }
}
