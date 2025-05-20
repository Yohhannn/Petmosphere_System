<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class ReviewController extends Controller
{
    public function getAllReview(){
        $reviews = Review::with('user','reviewBy')->get();
        return response()->json(["message" => "Sucessfully get data of Reviews","data" => $reviews],200);
    }
    public function getReviewById($req_id){
        $reviews = Review::with('user','pet','reviewBy')->find($req_id);
        if(!$reviews){
            return response()->json(["message" => "Review not found"],404);
        }
        return response()->json(["message" => "Sucessfully get data of Reviews","data" => $reviews],200);
    }
    public function getReviewByPetId($req_id){
    $reviews = Review::where('pet_id',$req_id)->first();
    if(!$reviews){
        return response()->json(["message" => "Review not found"],404);
    }
    return response()->json(["message" => "Sucessfully get data of Reviews","data" => $reviews],200);
}
    public function getReviewByUserId($id){
        $reviews = Review::where('user_id',$id)->with('user','pet','reviewBy')->get();
        if(!$reviews){
            return response()->json(["message" => "Review not found"],404);
        }
        return response()->json(["message" => "Sucessfully get data of Reviews","data" => $reviews],200);
    }

    public function createReview(Request $request){
        $validated = $request->validate([
            'rev_rating' => 'required|integer|between:1,5',
            'rev_description' => 'nullable|string|max:255',
            'rev_rated_by' => 'required|integer|exists:user,user_id',
            'user_id' => 'required|integer|exists:user,user_id',
            'pet_id' => 'required|integer|exists:pet,pet_id',
            'rev_date' => 'required|date',
        ]);
        $review = Review::create($validated);
        return response()->json(["message" => "Sucessfully created reviews","data" => $review],201);
    }
    public function updateReview(Request $request,$id){
        $review = Review::find($id);
        if(!$review){
            return response()->json(["message" => "Review not found"],404);
        }
        $validated = $request->validate([
            'rev_date' => 'required|date',
            'rev_rating' => 'required|integer|between:1,5',
            'rev_description' => 'nullable|string|max:255',
            'rev_rated_by' => 'required|integer|exists:user,user_id',
            'user_id' => 'required|integer|exists:user,user_id',
            'pet_id' => 'required|integer|exists:pet,pet_id',
        ]);
        $review->update($validated);
        return response()->json(["message" => "Sucessfully updated reviews","data" => $review],201);
    }
    public function deleteReview($req_id){
        $review = Review::find($req_id);
        if(!$review){
            return response()->json(["message" => "Review not found"],404);
        }
        $review->delete();
        return response()->json(["message" => "Sucessfully deleted reviews","data" => $review],201);
    }
}
