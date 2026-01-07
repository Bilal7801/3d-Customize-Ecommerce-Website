<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class DHLTrackingService
{
    protected $apiKey;
    protected $baseUrl;

    public function __construct()
    {
        $this->apiKey = env('DHL_API_KEY');
        $this->baseUrl = 'https://api-eu.dhl.com/track/shipments';
    }

    public function trackShipment($trackingNumber)
    {
        $response = Http::withHeaders([
            'DHL-API-Key' => $this->apiKey,
            'Accept' => 'application/json',
            'Accept-Language' => 'en',
        ])->get($this->baseUrl, [
            'trackingNumber' => $trackingNumber,
        ]);

        return [
            'status' => $response->status(),
            'data' => $response->json(),
        ];
    }
}
