<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ResetPasswordController extends Controller
{
    public function reset(Request $request)
    {
        // 1) Validate incoming data
        $request->validate([
            'token'                 => 'required',
            'email'                 => 'required|email',
            'password'              => 'required|min:6|confirmed',
        ]);
    
        // 2) Let Laravel’s broker handle token check & deletion
        $status = Password::reset(
            $request->only('email','password','password_confirmation','token'),
            function ($user, $rawPassword) {
                // No need to hash the password again here. The setPasswordAttribute will handle it.
                $user->forceFill([
                    'password' => $rawPassword, // Raw password, no hashing needed here
                    'remember_token' => Str::random(60),
                ])->save();
            }
        );
    
        // 3) Return response based on broker status
        return $status === Password::PASSWORD_RESET
            ? response()->json(['message' => 'Password reset successful.'])
            : response()->json(['message' => 'Invalid or expired token.'], 422);
    }
    
}
