<?php

namespace App\Http\Controllers;
use App\Models\Todo;



use Illuminate\Http\Request;

class TodoController extends Controller
{
   // Get all To-Dos
   public function index()
   {
       return response()->json(Todo::all());
   }

   public function store(Request $request)
   {
       $validated = $request->validate([
           'title' => 'required|string|max:255',
           'completed' => 'boolean',
       ]);
   
       $todo = Todo::create($validated);
   
       return response()->json($todo, 201);  // Return the created todo with status 201
   }

   // Update a To-Do
   public function update(Request $request, $id)
   {
       $todo = Todo::findOrFail($id);
       $todo->update($request->only(['title', 'completed']));
       return response()->json($todo);
   }

   // Delete a To-Do
   public function destroy($id)
   {
       $todo = Todo::findOrFail($id);
       $todo->delete();
       return response()->json(null, 204);
   }
}






