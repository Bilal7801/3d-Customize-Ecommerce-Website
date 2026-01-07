<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\DHLTrackingService;

class DhlController extends Controller
{
    protected $dhl;

    public function __construct(DHLTrackingService $dhl)
    {
        $this->dhl = $dhl;
    }

    public function track(Request $request)
    {
        $request->validate([
            'tracking_number' => 'required|string',
        ]);

        $result = $this->dhl->trackShipment($request->tracking_number);

        return response()->json([
            'status' => $result['status'],
            'response' => $result['data']
        ]);
    }
}
