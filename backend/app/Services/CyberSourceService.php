<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CyberSourceService
{
    protected $merchantId;
    protected $apiKey;
    protected $secretKey;
    protected $apiUrl;

    public function __construct()
    {
        $this->merchantId = config('cybersource.merchant_id');
        $this->apiKey = config('cybersource.api_key');
        $this->secretKey = config('cybersource.secret_key');
        $this->apiUrl = config('cybersource.api_url'); // https://apitest.cybersource.com
    }

    public function sendPayment(array $payload)
    {
        $resource = '/pts/v2/payments';
        $url = $this->apiUrl . '/pts/v2/payments';

        $body = json_encode($payload);
        $date = gmdate('D, d M Y H:i:s T');
        $digest = base64_encode(hash('sha256', $body, true));

        $signatureHeader = $this->generateSignature($date, $digest, $resource);

        $response = Http::withHeaders([
            'v-c-merchant-id' => $this->merchantId,
            'Date' => $date,
            'Host' => parse_url($this->apiUrl, PHP_URL_HOST),
            'Digest' => 'SHA-256=' . $digest,
            'Signature' => $signatureHeader,
            'Content-Type' => 'application/json',
        ])->post($url, $payload);

        Log::info('CyberSource API Request', ['url' => $url, 'payload' => $payload, 'response' => $response->json()]);

        if ($response->failed()) {
            throw new \Exception('CyberSource API request failed: ' . $response->body());
        }

        return $response->json();
    }

    protected function generateSignature($date, $digest, $resource)
    {
        $host = parse_url($this->apiUrl, PHP_URL_HOST);
        $signatureComponents = [
            "host: {$host}",
            "date: {$date}",
            "digest: SHA-256={$digest}",
            "v-c-merchant-id: {$this->merchantId}",
            "(request-target): post {$resource}"
        ];

        $signatureString = implode("\n", $signatureComponents);
        $signatureHash = base64_encode(hash_hmac('sha256', $signatureString, $this->secretKey, true));

        return 'keyid="' . $this->apiKey . '", algorithm="HmacSHA256", headers="host date digest v-c-merchant-id (request-target)", signature="' . $signatureHash . '"';
    }
}
