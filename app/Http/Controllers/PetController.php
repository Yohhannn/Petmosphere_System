<?php

namespace App\Http\Controllers;

use App\Models\Breed;
use App\Models\Pet;
use App\Models\Type;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class PetController extends Controller
{
    public function getAllPet(){
        $pets = Pet::with('breed','type','user')->get();
        return response()->json(["message" => "Successfully Fetch Data","data"=> $pets],200);
    }
    public function getPetByUserId($id)
    {
        $pets = Pet::where('user_id',$id)->with('breed','type','user')->get();
        if ($pets) {
            return response()->json(["message" => "Successfully Fetch Data", "data" => $pets], 200);
        }
        return response()->json(["message" => "Pet id doesn't exist"], 404);
    }
    public function getPetById($id)
    {
        $pets = Pet::with('breed','type','user')->find($id);
        if ($pets) {
            return response()->json(["message" => "Successfully Fetch Data", "data" => $pets], 200);
        }
        return response()->json(["message" => "Pet id doesn't exist"], 404);
    }
    public function deletePet($id){
        $pets = Pet::find($id);
        if ($pets) {
            $pets->delete();
            return response()->json(['message' => 'Deleted Successfully'],200);
        }
        return response()->json(["message" => "Pet id doesn't exist"], 404);
    }
    public function createPet(Request $request)
    {
        $validated = $request->validate([
            'pet_name' => 'required|string|max:50',
            'pet_location' => 'required|string|max:50',
            'pet_age' => 'required|string|max:20',
            'pet_description' => 'required|string|max:100',
            'pet_status' => 'required|string|max:50',
            'breed_id' => 'required|exists:breed,breed_id',
            'type_id' => 'required|exists:type,type_id',
            'user_id' => 'required|exists:user,user_id',
            'pet_tag' => 'string|max:250',
            'pet_medical' => 'string|max:100',
        ]);
        $pet = Pet::create($validated);
        return response()->json(['message' => 'Pet created successfully', 'data' => $pet]);
    }

    // UPDATE existing pet
    public function updatePet(Request $request, $id)
    {
        $pet = Pet::findOrFail($id);
        if($pet) {
            $validated = $request->validate([
                'pet_name' => 'sometimes|string|max:50',
                'pet_location' => 'sometimes|string|max:50',
                'pet_age' => 'sometimes|string|max:20',
                'pet_description' => 'sometimes|string|max:100',
                'pet_status' => 'sometimes|string|max:50',
                'breed_id' => 'required|exists:breed,breed_id',
                'type_id' => 'required|exists:type,type_id',
                'pet_tag' => 'string|max:250',
                'pet_medical' => 'string|max:100',
            ]);

            $pet->update($validated);

            return response()->json(['message' => 'Pet updated successfully', 'data' => $pet]);
        }
        return response()->json(["message" => "Id doesn't exist"], 404);
    }
    public function updatePetStatus(Request $request, $id)
    {
        $pet = Pet::findOrFail($id);
        if($pet) {
            $validated = $request->validate([
                'pet_status' => 'sometimes|string|max:50',
            ]);

            $pet->update($validated);

            return response()->json(['message' => 'Pet updated successfully', 'data' => $pet]);
        }
        return response()->json(["message" => "Id doesn't exist"], 404);
    }
    public function countPet()
    {
        $adoptedPet = Pet::where('pet_status','Adopted')->count();
        return response()->json(["adopted" => $adoptedPet]);
    }

}
