<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\OneLinkService;

class OneLinkMerchantController extends Controller
{
    public function onboard(Request $req, OneLinkService $oneLink)
    {
        $data = $req->validate([
            'merchantDetails.dbaName'              => 'required|string',
            'merchantDetails.merchantName'         => 'required|string',
            'merchantDetails.iban'                 => 'required|string|size:24',
            'merchantDetails.bankBic'              => 'required|string|size:6',
            'merchantDetails.merchantCategoryCode' => 'required|string',
            'merchantDetails.merchantID'           => 'required|string',
            'merchantDetails.accountTitle'         => 'required|string',
            'merchantDetails.postalAddress.townName'    => 'required|string',
            'merchantDetails.postalAddress.addressLine' => 'required|string',
            'merchantDetails.contactDetails.phoneNo'    => 'nullable|string',
            'merchantDetails.contactDetails.mobileNo'   => 'nullable|string',
            'merchantDetails.contactDetails.email'      => 'nullable|email',
            'merchantDetails.contactDetails.dept'       => 'nullable|string',
            'merchantDetails.contactDetails.website'    => 'nullable|url',
            'merchantDetails.paymentDetails.feeType'    => 'required|string|in:F,P',
            'merchantDetails.paymentDetails.feeValue'   => 'required|numeric',
        ]);

        try {
            $result = $oneLink->registerMerchantProfile($data);
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json([
                'error'   => 'Onboarding failed',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
