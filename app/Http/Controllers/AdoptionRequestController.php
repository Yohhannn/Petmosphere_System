<?php

namespace App\Http\Controllers;

use App\Models\AdoptionRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class AdoptionRequestController extends Controller
{
    public function getAllAdoptionRequest(){
        $adoption = AdoptionRequest::with('pet','user')->get();
        return response()->json(["message" => "Successfully get data Adoption","data" => $adoption],200);
    }
    public function getAdoptionRequestById($id){
        $adoption = AdoptionRequest::with('pet','user')->find($id);
        if($adoption){
            return response()->json(["message" => "Successfully get data Adoption","data" => $adoption],200);
        }
        return response()->json(["message" => "Request id not found"],404);
    }
    public function checkAdoption(Request $request){
        $user_id = $request->input('user_id');
        $pet_id = $request->input('pet_id');
        $adoption = AdoptionRequest::where('user_id', $user_id)->where('pet_id', $pet_id)->first();
        if($adoption){
            return response()->json(["message" => "Successfully get data Adoption","data" => $adoption],200);
        }
        return response()->json(["message" => "Request id not found"],404);
    }
    public function createAdoptionRequest(Request $request){
        $validated = $request->validate([
            'req_status' => 'required|string|max:50',
            'req_date' => 'required|date',
            'pet_id' => 'required|integer|exists:pet,pet_id',
            'user_id' => 'required|integer|exists:user,user_id',
            'req_message' => 'required|string'
        ]);
        $adoption = AdoptionRequest::create($validated);
        return response()->json(["message" => "Request created successfully","data" => $adoption],201);
    }
    public function updateAdoptionRequest(Request $request, $id){
        $adoption = AdoptionRequest::find($id);
        if($adoption){
            $validated = $request->validate([
                'req_status' => 'required|string|max:50',
                'req_date' => 'required|date',
                'pet_id' => 'required|integer|exists:pet,pet_id',
                'req_message' => 'required|string'

            ]);
            $adoption->update($validated);
            return response()->json(["message" => "Request updated successfully","data" => $adoption],200);
        }
        return response()->json(["message" => "Request id not found"],404);
    }
    public function deleteAdoptionRequest($id){
        $adoption = AdoptionRequest::find($id);
        if($adoption){
            $adoption->delete();
            return response()->json(["message" => "Request deleted successfully"],200);
        }
        return response()->json(["message" => "Request id not found"],404);
    }
}
