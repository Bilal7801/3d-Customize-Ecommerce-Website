<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CyberSourceService;
use App\Models\Payment;
use Illuminate\Support\Facades\Log;
use Exception;
use Illuminate\Support\Str;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;


class CybersourcePaymentController extends Controller
{
    protected $cyberSource;

    public function __construct(CyberSourceService $cyberSource)
    {
        $this->cyberSource = $cyberSource;
    }

    public function pay(Request $request)
    {
        try {
            // Validate basic required fields
            $validated = $request->validate([
                'amount' => 'required|numeric',
                'currency' => 'required|string',
                'customer.email' => 'required|email',
                'customer.phone' => 'required|string',
                'shipping.firstName' => 'required|string',
                'shipping.lastName' => 'required|string',
                'shipping.address' => 'required|string',
                'shipping.city' => 'required|string',
                'shipping.state' => 'required|string',
                'shipping.zip' => 'required|string',
                'shipping.country' => 'required|string',
                'card.number' => 'required|string',
                'card.expirationMonth' => 'required|string',
                'card.expirationYear' => 'required|string',
                'card.securityCode' => 'required|string',
                // new field
                'items' => 'nullable|array',
            ]);

            // Static order code
            $orderCode = 'ORDER' . time(); // e.g. ORDER1748632422

            // Prepare CyberSource payload
            $payload = [
                "clientReferenceInformation" => [
                    "code" => $orderCode
                ],
                "processingInformation" => [
                    "capture" => true
                ],
                "paymentInformation" => [
                    "card" => [
                        "number" => $validated['card']['number'],
                        "expirationMonth" => $validated['card']['expirationMonth'],
                        "expirationYear" => $validated['card']['expirationYear'],
                        "securityCode" => $validated['card']['securityCode']
                    ]
                ],
                "orderInformation" => [
                    "amountDetails" => [
                        "totalAmount" => number_format($validated['amount'], 2, '.', ''),
                        "currency" => $validated['currency']
                    ],
                    "billTo" => [
                        "firstName" => $validated['shipping']['firstName'],
                        "lastName" => $validated['shipping']['lastName'],
                        "address1" => $validated['shipping']['address'],
                        "locality" => $validated['shipping']['city'],
                        "administrativeArea" => $validated['shipping']['state'],
                        "postalCode" => $validated['shipping']['zip'],
                        "country" => $validated['shipping']['country'],
                        "email" => $validated['customer']['email'],
                        "phoneNumber" => $validated['customer']['phone']
                    ]
                ]
            ];

            // Send request to CyberSource
            $response = app('App\Services\CyberSourceService')->sendPayment($payload);

            $order = Order::create([
                'customer_id' => auth()->id(), // or pass explicitly
                'status' => 'pending',
                'total' => $validated['amount'],
                'data' => json_encode($request->all()),
            ]);

            Payment::create([
                'order_id' => $order->id, // ✅ Link payment to this order
                'transaction_id' => $response['id'] ?? null,
                'order_number' => $orderCode,
                'email' => $validated['customer']['email'],
                'amount' => $validated['amount'],
                'status' => $response['status'] ?? 'pending',
                'payment_method' => 'visa',
            ]);


            // Return success response 
            return response()->json([
                'message' => 'Payment request sent and stored successfully',
                // new field
                'order_id' => $order->id
            ]);

            return response()->json(['message' => 'Payment request sent successfully', 'response' => $response]);
        } catch (\Throwable $e) {
            Log::error('Visa Payment Exception', ['error' => $e->getMessage()]);
            return response()->json([
                'error' => 'Visa payment failed',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function payWithCOD(Request $request)
    {
        try {
            // Validate COD-specific fields
            $validated = $request->validate([
                'amount' => 'required|numeric',
                'currency' => 'required|string',
                'customer.email' => 'required|email',
                'customer.phone' => 'required|string',
                'shipping.firstName' => 'required|string',
                'shipping.lastName' => 'required|string',
                'shipping.address' => 'required|string',
                'shipping.city' => 'required|string',
                'shipping.state' => 'required|string',
                'shipping.zip' => 'required|string',
                'shipping.country' => 'required|string',
            ]);

            $order = Order::create([
                'customer_id' => auth()->id(), // or manually get user
                'status' => 'pending',
                'total' => $validated['amount'],
                'data' => json_encode($request->all()),
            ]);


            // Static order code
            $orderCode = 'ORDER' . time(); // e.g. ORDER1748632422

            // Optional: generate a dummy transaction ID
            $fakeTransactionId = 'COD-' . strtoupper(Str::random(10));

            // Store COD payment directly without CyberSource
            Payment::create([
                'order_id' => $order->id, // ✅ Link to this order
                'transaction_id' => $fakeTransactionId,
                'order_number' => $orderCode,
                'email' => $validated['customer']['email'],
                'amount' => $validated['amount'],
                'status' => 'pending',
                'payment_method' => 'cod',
            ]);

            return response()->json([
                'success' => true,
                'message' => 'COD order stored successfully',
                'order_number' => $orderCode
            ]);
        } catch (\Throwable $e) {
            Log::error('COD Payment Exception', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'error' => 'COD payment failed',
                'message' => $e->getMessage()
            ], 500);
        }
    }


    public function listPayments(Request $request)
    {
        $query = Payment::query();

        $search = $request->input('search', '');
        $status = $request->input('status', '');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('transaction_id', 'like', "%{$search}%")
                    ->orWhere('order_number', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($status) {
            $query->where('status', $status);
        }

        $payments = $query->orderBy('created_at', 'desc')->paginate(10);

        // Preserve filter inputs when paginating with GET requests by appending them
        if ($request->isMethod('get')) {
            $payments->appends($request->query());
        }

        return view('admin.payment.payments', compact('payments'));
    }



    public function showPayment($id)
    {
        $payment = Payment::find($id);
        if (!$payment) {
            abort(404);
        }

        return view('admin.payment.payment_view', ['payment' => $payment]);
    }

    public function showRefundConfirmation($id)
    {
        $payment = Payment::findOrFail($id);
        return view('admin.payment.refund_confirmation', compact('payment'));
    }

    public function processRefund(Request $request, $id)
    {
        $payment = Payment::findOrFail($id);
        $payment->status = 'refunded'; // or integrate refund API here
        $payment->save();

        return redirect()->route('admin.payment.payments')->with('success', 'Refund processed successfully.');
    }

    public function handleResponse(Request $request)
    {
        Log::info('CyberSource Callback Received', $request->all());
        return response()->json(['message' => 'received']);
    }
}
