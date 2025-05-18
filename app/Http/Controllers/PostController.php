<?php

namespace App\Http\Controllers;

use App\Models\Breed;
use App\Models\Pet;
use App\Models\post;
use App\Models\Tag;
use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class PostController extends Controller
{
    public function getAllPost()
    {
        $posts = Post::with('user','pet','pet.type','pet.breed')->get();
        return response()->json([
            'message' => 'All posts retrieved successfully',
            'data' => $posts,
        ]);
    }

    public function getPostById($id)
    {
        $post = Post::with('user','pet','pet.type','pet.breed')->find($id);
        if (!$post) {
            return response()->json([
                'message' => "id doesn't exist"], 404);
        }

        return response()->json([
            'message' => 'Post retrieved successfully',
            'data' => $post,
        ]);
    }
    public function getPostByPetId($id)
    {
        $post = Post::where('pet_id',$id)->with('user','pet','pet.type','pet.breed')->get();
        if (!$post) {
            return response()->json([
                'message' => "pet id  doesn't exist".$id], 404);
        }

        return response()->json([
            'message' => 'Post retrieved successfully',
            'data' => $post,
        ]);
    }
    public function getPostByUserId($id)
    {
        $post = Post::where('user_id',$id)->with('user','pet','pet.type','pet.breed')->get();
        if (!$post) {
            return response()->json([
                'message' => "id doesn't exist"], 404);
        }

        return response()->json([
            'message' => 'Post retrieved successfully',
            'data' => $post,
        ]);
    }

    public function createPost(Request $request)
    {
        $validated = $request->validate([
            'post_date' => 'required|date',
            'post_img' => 'required|string|max:500',
            'post_descrip' => 'required|string|max:100',
            'pet_id' => 'required|integer|exists:pet,pet_id',
            'user_id' => 'required|integer|exists:user,user_id',
            'post_reason' => 'required|string|max:100',
        ]);

        $post = Post::create($validated);

        return response()->json([
            'message' => 'Post created successfully',
            'data' => $post
        ], 201);
    }

    public function updatePost(Request $request, $id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json([
                'message' => "id doesn't exist",
                'data' => null
            ], 404);
        }
        $validated = $request->validate([
            'post_date' => 'required|date',
            'post_img' => 'required|string|max:500',
            'post_descrip' => 'required|string|max:100',
            'pet_id' => 'required|integer|exists:pet,pet_id',
            'post_reason' => 'required|string|max:250',
        ]);
        $post->update($validated);
        return response()->json(['message' => 'Post updated successfully',"data" => $post],200);
    }
    public function updatePostStatus(Request $request, $id)
    {
        $post = Post::where('pet_id',$id)->first();

        if (!$post) {
            return response()->json([
                'message' => "id doesn't exist",
                'data' => null
            ], 404);
        }
        $validated = $request->validate([
            'post_status' => 'required|string|max:20'
        ]);
        $post->update($validated);
        return response()->json(['message' => 'Post updated successfully',"data" => $post],200);
    }

    public function deletePost($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json(['message' => "id doesn't exist"], 404);
        }

        $post->delete();

        return response()->json([
            'message' => 'Post deleted successfully',
            'data' => null
        ]);
    }
}
