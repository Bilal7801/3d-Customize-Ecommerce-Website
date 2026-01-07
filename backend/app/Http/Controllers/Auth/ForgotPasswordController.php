<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Support\Facades\Log;

class ForgotPasswordController extends Controller
{
    public function sendResetLinkEmail(Request $request)
    {
        // Validate email
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'The provided email address is not registered.',
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        // Create a reset token using Laravel's Password facade
        $token = Password::createToken($user);

        Log::info('Reset token generated for '.$user->email.': '.$token);

        // Send custom reset email notification
        $user->notify(new ResetPasswordNotification($token, $user->email));

        return response()->json(['message' => 'Password reset link sent to your email.']);
    }
}
