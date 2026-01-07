<?php

return [ 
    'visa' => [
        'api_key' => env('VISA_API_KEY'),
        'api_secret' => env('VISA_API_SECRET'),
        'base_url' => env('VISA_BASE_URL'),
],

'payoneer' => [
    'partner_id' => env('PAYONEER_PARTNER_ID'),
    'username' => env('PAYONEER_USERNAME'),
    'password' => env('PAYONEER_PASSWORD'),
    'base_url' => env('PAYONEER_BASE_URL')
],

];