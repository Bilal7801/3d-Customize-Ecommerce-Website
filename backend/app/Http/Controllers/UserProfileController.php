<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\UserProfile;

class UserProfileController extends Controller
{
    /**
     * GET /api/profile
     * Return the authenticated user and their profile.
     */
    public function show()
    {
        $user    = Auth::user();
        $profile = $user->profile; // may be null if no profile yet

        return response()->json([
            'user'    => $user,
            'profile' => $profile,
        ]);
    }

    /**
     * PUT /api/profile
     * Update the authenticated user’s account and profile.
     */
    public function update(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name'  => 'required|string|max:255',
            'email'      => 'required|email|unique:users,email,' . $user->id,
            'phone'      => 'nullable|string',
            'gender'     => 'nullable|string|in:Male,Female,Other,Prefer not to say',
            'dob'        => 'nullable|date',
            'country'    => 'nullable|string',
            'city'       => 'nullable|string',
            'state'      => 'nullable|string',
            'address'    => 'nullable|string',
            'zip'        => 'nullable|string',
        ]);

        // 1️⃣ Update core user fields
        $user->update([
            'first_name'        => $validated['first_name'],
            'last_name'         => $validated['last_name'],
            'email'             => $validated['email'],
            'email_verified_at' => $validated['email'] !== $user->email
                ? null
                : $user->email_verified_at,
        ]);

        // 2️⃣ Update or create extended profile
        $profileData = collect($validated)
            ->except(['first_name', 'last_name', 'email'])
            ->toArray();

        $user->profile()->updateOrCreate(
            ['user_id' => $user->id],
            $profileData
        );

        // 3️⃣ Return fresh user + profile
        return response()->json([
            'message' => 'Profile updated successfully',
            'user'    => $user->load('profile'),
        ]);
    }
}
