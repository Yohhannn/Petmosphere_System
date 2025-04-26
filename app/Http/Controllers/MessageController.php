<?php

namespace App\Http\Controllers;

use App\Models\message;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class MessageController extends Controller
{
    public function getAllMessage(){
        $message = Message::with('sender','receiver','post')->get();
        return response()->json(["message" => "Successfully get data","data" => $message],200);
    }
    public function getMessageById($id){
        $message = Message::with('sender','receiver','post')->find($id);
        if($message){
            return response()->json(["message" => "Successfully get data","data" => $message],200);
        }
        return response()->json(["message" => "Message id doesn't exist"],400);
    }
    public function createMessage(Request $request)
    {
        $ErrorMessage = [];
        if(!User::find($request->sender_id)){
            $ErrorMessage[] = 'Sender id not exist';
        }
        if(!User::find($request->receiver_id)){
            $ErrorMessage[] = 'Receiver id not exist';
        }
        if(!Post::find($request->post_id)){
            $ErrorMessage[] = 'Post id not exist';
        }
        if($ErrorMessage){
            return response()->json(["message"=>$ErrorMessage],400);
        }
        $validated = $request->validate([
            'msg_time' => 'required|date_format:H:i:s',
            'msg_content' => 'required|string',
            'sender_id' => 'required|exists:user,user_id',
            'receiver_id' => 'required|exists:user,user_id',
            'post_id' => 'required|exists:post,post_id',
        ]);

        $message = Message::create($validated);
        return response()->json(['message' => 'Message created successfully', 'data' => $message]);
    }

    // UPDATE message
    public function updateMessage(Request $request, $id)
    {
        $message = Message::findOrFail($id);
        if($message){
            $validated = $request->validate([
                'msg_content' => 'sometimes|required|string',
            ]);

            $message->update($validated);

            return response()->json(['message' => 'Message updated successfully', 'data' => $message],200);
        }
        return response()->json(["message" => "Message id doesn't exist"],404);

    }
    public function deleteMessage($id){
        $message = Message::find($id);
        if($message) {
            $message->delete();
            return response()->json(['message' => 'Message deleted successfully'], 200);
        }
        return response()->json(["message" => "Message id doesn't exist"],404);
    }
}
