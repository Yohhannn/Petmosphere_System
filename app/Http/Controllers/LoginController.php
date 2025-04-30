<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        if($request->admin_password && $request->admin_username){
            return $this->adminAuth($request);
        }
        return $this->userAuth($request);
    }
    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }
    public function userAuth(Request $request){
        $user = User::where('user_email',$request->user_email)->first();
        if(!$user || !Hash::check($request->user_pass, $user->user_pass)){
            return response()->json(["message" => " User Invalid email or password"],401);
        }
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'token' => $token,
            'message' => "Logged in successfully",
            'token_type' => 'Bearer',
        ],200);
    }
    public function adminAuth(Request $request)
    {
        $admin_username = $request->input('admin_username');
        $admin_password = $request->input('admin_pass');

        if($admin = Admin::where('admin_username', $admin_username)->first()){
            if(Hash::check($admin_password, $admin->admin_pass)){
                return response()->json(['message' => 'Login Successfully!','data' => $admin],200);
            }
        }
        return response()->json(['message' => 'Invalid email or password'],401);
    }
}
