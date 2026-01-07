<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
        'scheme' => 'https',
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'onelink' => [
        'client_id'     => env('ONELINK_CLIENT_ID'),
        'client_secret' => env('ONELINK_CLIENT_SECRET'),
        'api_key'       => env('ONELINK_API_KEY'),
        'token_url'     => env('ONELINK_TOKEN_URL'),
        'base_url'      => env('ONELINK_BASE_URL'),
    ],

    'cybersource' => [
        'merchant_id' => env('CYBERSOURCE_MERCHANT_ID'),
        'key_id'      => env('CYBERSOURCE_KEY_ID'),
        'secret_key'  => env('CYBERSOURCE_SECRET_KEY'),
        'base_url'    => env('CYBERSOURCE_BASE_URL'),
    ],


];
