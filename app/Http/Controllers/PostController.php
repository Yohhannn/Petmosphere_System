<?php

namespace App\Http\Controllers;

use App\Models\Pet;
use App\Models\post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class PostController extends Controller
{
    public function getAllPost()
    {
        $posts = Post::with('user','breed','pet','tag','type')->get();
        return response()->json([
            'message' => 'All posts retrieved successfully',
            'data' => $posts
        ]);
    }

    public function getPostById($id)
    {
        $post = Post::with('user','breed','pet','tag','type')->find($id);

        if (!$post) {
            return response()->json([
                'message' => "id doesn't exist"], 404);
        }

        return response()->json([
            'message' => 'Post retrieved successfully',
            'data' => $post
        ]);
    }

    public function createPost(Request $request)
    {
        $validated = $request->validate([
            'post_date' => 'required|date',
            'post_img' => 'required|string|max:250',
            'post_descrip' => 'required|string|max:100',
            'pet_id' => 'required|integer|exists:pet,pet_id',
            'tag_id' => 'required|integer|exists:tag,tag_id',
            'type_id' => 'required|integer|exists:type,type_id',
            'breed_id' => 'required|integer|exists:breed,breed_id',
            'user_id' => 'required|integer|exists:user,user_id',
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
            'post_img' => 'required|string|max:250',
            'post_descrip' => 'required|string|max:100',
            'pet_id' => 'required|integer|exists:pet,pet_id',
            'tag_id' => 'required|integer|exists:tag,tag_id',
            'type_id' => 'required|integer|exists:type,type_id',
            'breed_id' => 'required|integer|exists:breed,breed_id',
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
