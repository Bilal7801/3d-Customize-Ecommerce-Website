<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use App\Mail\OTPMail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // POST /api/request-otp
    public function requestOtp(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name'  => 'required|string|max:255',
            'email'      => 'required|email|unique:users,email',
            'password'   => 'required|min:6',
            'agreement'  => 'required|boolean',
        ]);

        $otp = rand(100000, 999999);

        // Store data temporarily in cache (NOT hashed here!)
        Cache::put('register_' . $request->email, [
            'first_name' => $request->first_name,
            'last_name'  => $request->last_name,
            'email'      => $request->email,
            'password'   => $request->password, // plain, will be hashed in model
            'agreed'     => $request->agreement,
            'otp'        => $otp,
        ], now()->addMinutes(10));

        // Send OTP via email
        Mail::to($request->email)->send(new OTPMail($otp));

        return response()->json(['message' => 'OTP sent to email.'], 200);
    }

    // POST /api/verify-otp
    public function verifyOtp(Request $request)
    {
        $email = $request->input('email');
        $otp = $request->input('otp');

        $cachedUser = Cache::get("register_{$email}");

        if (!$cachedUser || $cachedUser['otp'] != $otp) {
            return response()->json(['message' => 'Invalid OTP or expired.'], 400);
        }

        $user = User::create([
            'first_name' => $cachedUser['first_name'],
            'last_name'  => $cachedUser['last_name'],
            'email'      => $cachedUser['email'],
            'password'   => $cachedUser['password'], // model will hash it
            'agreed'     => $cachedUser['agreed'],
        ]);

        Cache::forget("register_{$email}");

        return response()->json(['message' => 'User registered successfully']);
    }

    // POST /api/resend-otp
    public function resendOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $cachedData = Cache::get('register_' . $request->email);

        if (!$cachedData) {
            return response()->json(['message' => 'Signup session expired. Please sign up again.'], 404);
        }

        $otp = rand(100000, 999999);
        $cachedData['otp'] = $otp;

        Cache::put('register_' . $request->email, $cachedData, now()->addMinutes(10));

        try {
            Mail::to($request->email)->send(new OTPMail($otp));
            return response()->json(['message' => 'OTP has been resent successfully.'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to send OTP email.'], 500);
        }
    }

    // POST /api/login
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Create a token
        $token = $user->createToken('user-token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token'   => $token,
            'user'    => $user,
        ]);
    }


    public function logout(Request $request)
    {
        $user = $request->user();

        // Revoke current access token
        $user->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
}
