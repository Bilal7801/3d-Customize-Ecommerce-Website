<?php

namespace App\Helpers;

class VisaHelper
{
    public static function generateXPayToken(string $resourcePath, array $queryParams = [], string $payload = ''): string
    {
        $apiKey       = env('VISA_API_KEY');
        $sharedSecret = env('VISA_SHARED_SECRET');  // your decrypted secret (plain text)
        $timestamp    = time();

        // Build the query string exactly as it will appear in the URL
        $queryString = http_build_query(array_merge($queryParams, ['apikey' => $apiKey]));

        // The string to sign is: timestamp + resourcePath + '?' + queryString + payload
        $stringToSign = $timestamp . $resourcePath . '?' . $queryString . $payload;

        // HMAC-SHA256 using the raw shared secret
        $signature = hash_hmac('sha256', $stringToSign, $sharedSecret);

        return "xv2:{$timestamp}:{$signature}";
    }
}
