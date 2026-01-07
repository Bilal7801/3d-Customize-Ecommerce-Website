<?php

namespace App\Http\Controllers;

use App\Models\Design;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage; // ✅ yahan hona chahiye
use Illuminate\Support\Facades\Auth;


class DesignController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'price' => 'required|numeric',
             'quantity'   => 'required|integer|min:1',
            'image_front' => 'required|string',
            'image_back' => 'required|string',
        ]);

        // Image save
        $frontPath = $this->saveBase64Image($request->image_front, 'front');
        $backPath = $this->saveBase64Image($request->image_back, 'back');

        $design = Design::create([
              'user_id' => Auth::id(), // ✅ Add this line
            'title' => $request->title,
             'quantity' => $request->quantity,
            'price' => $request->price,
            'image_front' => $frontPath,
            'image_back' => $backPath,
           
        ]);

        return response()->json(['message' => 'Design saved', 'design' => $design]);
    }

    private function saveBase64Image($base64Image, $prefix)
    {
        if (preg_match('/^data:image\/(\w+);base64,/', $base64Image, $type)) {
            $data = substr($base64Image, strpos($base64Image, ',') + 1);
            $type = strtolower($type[1]); // jpg, png, gif

            $data = base64_decode($data);
            $filename = $prefix . '_' . uniqid() . '.' . $type;
            $path = 'designs/' . $filename;

            Storage::disk('public')->put($path, $data);

            return 'storage/' . $path; // for public URL
        }

        return null;
    }

      public function index()
    {
        // ✅ Fetch only designs of the logged-in user
        $designs = Design::where('user_id', Auth::id())->get();

        return response()->json($designs);
    }
 

public function destroy($id, Request $request)
{
    $design = Design::where('id', $id)->where('user_id', $request->user()->id)->first();

    if (!$design) {
        return response()->json(['message' => 'Design not found or unauthorized'], 404);
    }

    $design->delete();

    return response()->json(['message' => 'Design deleted successfully']);
}
public function updateQuantity($id, Request $request)
{
    $request->validate([
        'quantity' => 'required|integer|min:1'
    ]);

    $design = Design::where('id', $id)
                    ->where('user_id', Auth::id())
                    ->first();

    if (!$design) {
        return response()->json(['message' => 'Design not found'], 404);
    }

    $design->quantity = $request->input('quantity');
    $design->save();

    return response()->json([
        'message' => 'Quantity updated successfully',
        'quantity' => $design->quantity
    ]);
}
}
