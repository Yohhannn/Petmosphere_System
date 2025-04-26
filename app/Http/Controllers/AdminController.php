<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function createAdmin(Request $request){
        $request->validate([
            'admin_username' => 'required|string',
            'admin_pass' => 'required|string',
        ]);
        if(Admin::where('admin_username',$request->admin_username)->exists()){
            return response()->json(["message" => 'Username already exists'],400);
        }
        $admin = Admin::create([
            'admin_username' => $request->admin_username,
            'admin_pass' => Hash::make($request->admin_pass),
        ]);
        return response()->json(['message' => 'Admin created successfully', 'data' => $admin],201);
    }
    public function getAllAdmin(){
        $admin = Admin::all();
        return response()->json(["message" => "Successfully get data","data" => $admin], 200);
    }
    public function getAdminById($id){
        $admin = Admin::find($id);
        if($admin){
            return response()->json(["message" => "Successfully get data","data" => $admin], 200);
        }
        return response()->json(["message" => "id doesnt exist"], 404);
    }
    public function updateAdmin(Request $request,$id){
        $adminDetail = Admin::find($id);
        if($adminDetail){
            if($adminDetail->admin_pass != $request->admin_pass){
                $request->admin_pass = Hash::make($request->admin_pass);
            }
            if($adminDetail->admin_username !== $request->admin_username){
                if(Admin::where('admin_username',$request->admin_username)->exists()){
                    return response()->json(["message" => 'Username already exists'],400);
                }
            }
            Admin::where('admin_id',$id)->update([
                "admin_username" => $request->admin_username,
                "admin_pass" => $request->admin_pass,
            ]);
            $updatedAdmin = Admin::find($id);
            return response()->json(['message' => 'Admin updated successfully', 'data' => $updatedAdmin],200);
        }
       else{
           return response()->json(["message" => "Admin id doesn't exist"],404);
       }
    }
    public function deleteAdmin($id){
        $admin = Admin::find($id);
        if($admin){
            $admin->delete();
            return response()->json(['message' => 'Admin deleted successfully'],200);
        }else{
            return response()->json(['message' => "Admin id doesn't exist"],404);
        }
    }
}
