<?php
namespace App\Services;

use GuzzleHttp\Client;

class OneLinkService
{
    protected Client $http;
    protected string $clientId;
    protected string $clientSecret;
    protected string $apiKey;
    protected string $tokenUrl;
    protected string $baseUrl;

    public function __construct()
    {
        $this->http         = new Client();
        $this->clientId     = config('services.onelink.client_id');
        $this->clientSecret = config('services.onelink.client_secret');
        $this->apiKey       = config('services.onelink.api_key');
        $this->tokenUrl     = config('services.onelink.token_url');
        $this->baseUrl      = config('services.onelink.base_url');
    }

    /** Fetch OAuth2 token */
    public function getAccessToken(): string
    {
        $resp = $this->http->post($this->tokenUrl, [
            'form_params' => [
                'grant_type'    => 'client_credentials',
                'client_id'     => $this->clientId,
                'client_secret' => $this->clientSecret,
            ],
        ]);

        $data = json_decode((string)$resp->getBody(), true);
        if (empty($data['access_token'])) {
            throw new \Exception('1Link token error: '.$data['error'] ?? 'no token');
        }
        return $data['access_token'];
    }

    /** Onboard merchant via createMerchantProfile */
    public function registerMerchantProfile(array $payload): array
    {
        $token = $this->getAccessToken();

        $resp = $this->http->post("{$this->baseUrl}/createMerchantProfile", [
            'headers' => [
                'Authorization'    => "Bearer {$token}",
                'X-IBM-Client-Id'  => $this->apiKey,
                'Accept'           => 'application/json',
                'Content-Type'     => 'application/json',
            ],
            'json' => $payload,
        ]);

        return json_decode((string)$resp->getBody(), true);
    }
}
