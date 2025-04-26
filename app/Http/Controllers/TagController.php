<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class TagController extends Controller
{
    public function getAllTag(){
        $tag = Tag::all();
        return response()->json(["message" => "Successfully get data of Tag","data" => $tag],200);
    }
    public function getTagById($id){
        $tag = Tag::find($id);
        if(!$tag){
            return response()->json(["message" => "Tag not found"],404);
        }
        return response()->json(["message" => "Successfully get data of Tag","data" => $tag],200);
    }
    public function createTag(Request $request){
        $validated = $request->validate([
            'tag_name' => 'required|string|max:50',
        ]);
        $tag = Tag::create($validated);
        return response()->json(["message" => "Successfully created Tag","data" => $tag],201);
    }
    public function updateTag(Request $request,$id){
        $tag = Tag::find($id);
        if(!$tag){
            return response()->json(["message" => "Tag not found"],404);
        }
        $validated = $request->validate([
           "tag_name" => "required|string|max:50",
        ]);
        $tag->update($validated);
        return response()->json(["message" => "Successfully updated Tag","data" => $tag],201);
    }
    public function deleteTag($id){
        $tag = Tag::find($id);
        if(!$tag){
            return response()->json(["message" => "Tag not found"],404);
        }
        $tag->delete();
        return response()->json(["message" => "Successfully deleted Tag","data" => $tag],200);
    }
}
