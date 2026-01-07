<?php 

return [
    'merchant_id' => env('CYBERSOURCE_MERCHANT_ID'),
    'api_key' => env('CYBERSOURCE_KEY_ID'),
    'secret_key' => base64_decode(env('CYBERSOURCE_SECRET_KEY')),
    'api_url' => env('CYBERSOURCE_API_URL'),
];
