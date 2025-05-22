<?php

namespace App\Http\Controllers;

use App\Models\Alert;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class AlertController extends Controller
{
    public function getAllAlert() {
        $alert = Alert::with('user','admin')->get();
        return response()->json(["message" => "Successfully get data","data" => $alert]);
    }
    public function getAlertByUser($id) {
        $alert = Alert::where("user_id", $id)
            ->whereNotIn('alert_type', ['sign_up'])
            ->with(['user', 'admin'])
            ->get();
        return response()->json(["message" => "Successfully get data","data" => $alert]);
    }
    public function getAlertByAdmin($id) {
        $alert = Alert::where('admin_id',$id)->with('user','admin')->get();
        return response()->json(["message" => "Successfully get data","data" => $alert]);
    }
    public function createAlert(Request $request) {
        $validated = $request->validate([
            'user_id' => 'nullable|exists:user,user_id',
            'admin_id' => 'nullable|exists:admin,admin_id',
            'alert_type' => 'required|in:login,sign_up,post_created,post_rejected,user_verified,user_deactivated,adoption_request,adoption_approved,adoption_rejected,warning,update,announcement,user_rejected',
            'alert_title' => 'required|string|max:255',
            'alert_message' => 'nullable|string',
        ]);

        $alert = Alert::create($validated);
        return response()->json(["message" => "Successfully created alert"], 201);
    }
    public function updateAlert(Request $request, $id) {
        $alert = Alert::findOrFail($id);
        $validated = $request->validate([
            'user_id' => 'nullable|exists:users,user_id',
            'admin_id' => 'nullable|exists:admins,admin_id',
            'alert_type' => 'nullable|in:login,sign_up,post_created,post_rejected,user_verified,user_deactivated,adoption_request,adoption_approved,adoption_rejected,warning',
            'alert_title' => 'nullable|string|max:255',
            'alert_message' => 'nullable|string',
        ]);
        $alert->update($validated);
        return response()->json(["message" => "Successfully updated alert"], 200);
    }
    public function CountAlertByUserId($id)
    {
        $count = Alert::where("user_id",$id)->where("alert_type","warning")->count();
        return response()->json(["count" => $count]);
    }
}
