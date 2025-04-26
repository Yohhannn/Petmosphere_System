<?php

namespace App\Http\Controllers;

use App\Models\breed;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class BreedController extends Controller
{
    public function getAllBreed()
    {
        $breeds = Breed::with('type')->get();
        return response()->json(["message" => "Successfully get data Breed","data" => $breeds],200);
    }
    public function getBreedById($id){
        $breeds = Breed::with('type')->find($id);
        if($breeds){
            return response()->json(["message" => "Successfully get data Breed","data" => $breeds],200);
        }
        return response()->json(["message" => "Breed id doesn't exist"],404);
    }
    public function createBreed(Request $request){
        $request->validate([
            "breed_name" => "required|string|max:50",
            "type_id" => "required|integer|exists:type,type_id",
        ]);
        $breed = Breed::create([
            "breed_name" => $request->breed_name,
            "type_id" => $request->type_id,
        ]);
        return response()->json(["message" => "Successfully get created Breed {$breed->breed_name}","data" => $breed],201);
    }
    public function updateBreed(Request $request,$id){
        $breed = Breed::find($id);
        if($breed){
            $validate = $request->validate([
                "breed_name" => "required|string|max:50",
                "type_id" => "required|integer|exists:type,type_id",
            ]);
            $breed->update($validate);
            return response()->json(["message" => "Successfully updated Breed {$request->breed_name}","data" => $breed],200);
        }
        return response()->json(["message" => "Breed id doesnt exist"],404);
    }
    public function deleteBreed($id){
        $breed = Breed::find($id);
        if($breed){
            $breed->delete();
            return response()->json(["message" => "Successfully deleted Breed"],201);
        }
        return response()->json(["message" => "Breed id doesnt exist"],404);
    }
}
