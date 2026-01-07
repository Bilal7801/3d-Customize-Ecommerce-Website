<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        'api/*',
        'api/cybersource/*',
        'api/login',
        'api/request-otp',
        'api/reset-password',
        'api/forgot-password',
        'api/verify-otp',
        'api/user',
        'api/logout',
        '/api/logout',
        'api/cart'
    ];
}
