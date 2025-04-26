<?php

namespace App\Http\Controllers;

use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class TypeController extends Controller
{
    public function getAllType(){
        $type = Type::all();
        return response()->json(["message" => "Successfully get data of Type","data" => $type],200);
    }
    public function getTypeById($id){
        $type = Type::find($id);
        if(!$type){
            return response()->json(["message" => "Type not found"],404);
        }
        return response()->json(["message" => "Successfully get data of Type","data" => $type],200);
    }
    public function createType(Request $request){
        $validator = $request->validate([
            "type_name" => "required|string|max:50"
        ]);
        $type = Type::create($validator);
        return response()->json(["message" => "Successfully created Type","data" => $type],201);
    }
    public function updateType(Request $request,$id){
        $type = Type::find($id);
        if(!$type){
            return response()->json(["message" => "Type not found"],404);
        }
        $validator = $request->validate([
           "type_name" => "required|string|max:50"
        ]);
        $type->update($validator);
        return response()->json(["message" => "Successfully updated Type","data" => $type],201);
    }
    public function deleteType($id){
        $type = Type::find($id);
        if(!$type){
            return response()->json(["message" => "Type not found"],404);
        }
        $type->delete();
        return response()->json(["message" => "Successfully deleted Type","data" => $type],201);
    }
}
