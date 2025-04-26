<?php

namespace App\Http\Controllers;

use App\Models\PetTag;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class PetTagController extends Controller
{
    public function createPetTag(Request $request)
    {
        $validated = $request->validate([
            'pet_id' => 'required|exists:pet,pet_id',
            'req_id' => 'required|exists:adoption_request,req_id',
        ]);

        $petTag = PetTag::create($validated);

        return response()->json(['message' => 'Pet tag created successfully', 'data' => $petTag]);
    }

    public function updatePetTag(Request $request, $id)
    {
        $petTag = PetTag::findOrFail($id);
        if($petTag){
            $validated = $request->validate([
                'pet_id' => 'sometimes|required|exists:pet,pet_id',
                'req_id' => 'sometimes|required|exists:adoption_request,req_id',
            ]);

            $petTag->update($validated);

            return response()->json(['message' => 'Pet tag updated successfully', 'data' => $petTag]);
        }
        return response()->json(['message' => 'Pet tag id not found'], 404);

    }

    public function getAllPetTag()
    {
        $tags = PetTag::with('adoption_request','pet')->get();
        return response()->json(["message" => "Successfully get data of Pet tag","data" => $tags],200);
    }

    public function getPetTagById($id)
    {
        $petTag = PetTag::with('adoption_request','pet')->find($id);
        if (!$petTag) {
            return response()->json(['message' => 'Pet tag not found'], 404);
        }
        return response()->json(["message" => "Successfully get data of Pet tag","data" => $petTag],200);
    }

    public function deletePetTag($id)
    {
        $petTag = PetTag::find($id);

        if (!$petTag) {
            return response()->json(['message' => 'Pet tag not found'], 404);
        }

        $petTag->delete();

        return response()->json(['message' => 'Pet tag deleted successfully']);
    }

}
