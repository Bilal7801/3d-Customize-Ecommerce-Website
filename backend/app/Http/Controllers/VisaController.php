<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log; // Import the Log facade for easy logging

class VisaController extends Controller
{
    /**
     * Tests the connection to the Visa Sandbox API using mTLS.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function testVisaConnection()
    {
        // Define absolute paths to your certificate files
        // IMPORTANT: Ensure these files are correctly formatted and accessible by the web server.
        $certPath = 'D:/visa-certs/visa-client-cert.pem';  // Path to your client certificate (BEGIN CERTIFICATE)
        $keyPath  = 'D:/visa-certs/key_9b4ee565-934c-49b0-94a1-6113f4302428.pem';  // Path to your private key (BEGIN RSA PRIVATE KEY)
        $caBundle = 'D:/visa-certs/visa-ca-bundle.pem';    // Path to the Visa CA bundle (Intermediate + Root CAs)

        // The Visa Sandbox API endpoint for the Hello World example
        $url = 'https://sandbox.api.visa.com/vdp/helloworld';

        // Initialize cURL session
        $ch = curl_init();

        // Set cURL options
        curl_setopt($ch, CURLOPT_URL, $url);

        // --- SSL/TLS Configuration ---
        // Provide the client certificate file
        curl_setopt($ch, CURLOPT_SSLCERT, $certPath);
        // Provide the private key file for the client certificate
        curl_setopt($ch, CURLOPT_SSLKEY, $keyPath);

        // If your private key is encrypted, uncomment the line below and provide the passphrase.
        // Based on your provided key, it does NOT appear to be encrypted, so keep this commented.
        // curl_setopt($ch, CURLOPT_SSLCERTPASSWD, 'your_private_key_passphrase_if_encrypted');

        // Provide the CA bundle to verify the Visa API server's SSL certificate
        curl_setopt($ch, CURLOPT_CAINFO, $caBundle);

        // Ensure cURL returns the response as a string instead of printing it
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        // Set necessary HTTP headers for the Visa API
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Accept: application/json',
            // You might need other headers like 'x-correlation-id', 'x-request-id', etc.
            // based on specific Visa API requirements. For helloworld, Accept is usually enough.
        ]);

        // Enable verbose output for detailed debugging.
        // This output will be logged to storage/logs/laravel.log.
        curl_setopt($ch, CURLOPT_VERBOSE, true);

        // Execute the cURL request
        $response = curl_exec($ch);

        // Check for cURL errors
        if (curl_errno($ch)) {
            $error_msg = curl_error($ch);
            $error_code = curl_errno($ch); // Get the cURL error number
            curl_close($ch);

            // Log the detailed cURL error for debugging purposes
            Log::error("Visa API cURL Error ($error_code): " . $error_msg);

            return response()->json([
                'status' => 'error',
                'message' => 'cURL Error connecting to Visa API',
                'curl_error' => $error_msg,
                'curl_error_code' => $error_code
            ], 500);
        }

        // Close the cURL session
        curl_close($ch);

        // Decode the JSON response
        $decodedResponse = json_decode($response, true);

        // Check if JSON decoding was successful
        if (json_last_error() !== JSON_ERROR_NONE) {
            Log::error("Visa API Response JSON Error: " . json_last_error_msg() . " - Raw Response: " . $response);
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to decode JSON response from Visa API',
                'raw_response' => $response,
                'json_error' => json_last_error_msg()
            ], 500);
        }

        // Return the decoded response
        Log::info("Visa API Hello World Success: ", $decodedResponse); // Log successful responses too
        return response()->json($decodedResponse);
    }
}