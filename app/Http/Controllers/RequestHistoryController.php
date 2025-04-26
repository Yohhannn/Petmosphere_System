<?php

namespace App\Http\Controllers;

use App\Models\RequestHistory;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class RequestHistoryController extends Controller
{
    public function getAllRequestHistory(){
        $requestHistory = RequestHistory::with('user','adoptionRequest')->get();
        return response()->json(["message" => "Successfully get data of Request History",]);
    }
    public function getRequestHistoryById($id){
        $request_history = RequestHistory::with('user','adoptionRequest')->find($id);
        if($request_history){
            return response()->json(["message" => "Successfully get data of Request History","data"=> $request_history],200);
        }
        return response()->json(["message" => "Request History not found"],404);
    }

    public function createRequestHistory(Request $request){
        // Validate the incoming request data
        $validated = $request->validate([
            'status_old' => 'required|string|max:50',
            'status_new' => 'required|string|max:50',
            'change_at' => 'nullable|date',
            'req_id' => 'required|exists:adoption_request,req_id',
            'change_by' => 'required|exists:user,user_id',
        ]);

        // Create the new request history record
        $history = RequestHistory::create($validated);

        // Return a JSON response with the success message and the created data
        return response()->json([
            'message' => 'Successfully created request history',
            'data' => $history
        ], 201);
    }
    public function updateRequestHistory(Request $request,$id){
        $history = RequestHistory::find($id);
        if($history){
            $validated = $request->validate([
                'status_old' => 'required|string|max:50',
                'status_new' => 'required|string|max:50',
                'change_at' => 'nullable|date',
                'req_id' => 'required|exists:adoption_request,req_id',
                'change_by' => 'required|exists:user,user_id',
            ]);
            $updated = $history->update($validated);
            return response()->json([
                'message' => 'Successfully created request history',
                'data' => $updated
            ], 201);
        }
        return response()->json(["message" => "Request History not found"],404);
    }
    public function deleteRequestHistory($id){
        $history = RequestHistory::find($id);
        if($history){
            $history->delete();
            return response()->json(["message" => "Successfully deleted request history"],200);
        }
        return response()->json(["message" => "Request History not found"],404);
    }
}
