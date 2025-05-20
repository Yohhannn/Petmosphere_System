<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        if ($request->has('admin_username') && $request->has('admin_pass')) {
            return $this->adminLogin($request);
        }

        if ($request->has('user_email') && $request->has('user_pass')) {
            return $this->userLogin($request);
        }

        return response()->json([
            'message' => 'Invalid login request. Required credentials missing.'
        ], 400);
    }

    protected function userLogin(Request $request)
    {
        $credentials = [
            'user_email' => $request->input('user_email'),
            'password' => $request->input('user_pass')
        ];

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            if ($user->is_active !== 0) {
                return response()->json([
                    'message' => 'Logged in successfully',
                    'user' => $user,
                ], 200);
            } else {
                return response()->json([
                    'message' => 'Your account is deactivated',
                ], 403);
            }
        } else {
            return response()->json([
                'message' => 'Invalid credentials',
            ], 403);
        }
    }

    protected function adminLogin(Request $request)
    {
        $credentials = [
            'admin_username' => $request->input('admin_username'),
            'password' => $request->input('admin_pass'),
        ];

        if (Auth::guard('admin')->attempt($credentials)) {
            $admin = Auth::guard('admin')->user();
            return response()->json([
                'message' => 'Admin logged in successfully',
                'admin' => $admin,
            ], 200);
        } else {
            return response()->json([
                'message' => 'Invalid credentials',
            ], 403);
        }
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }
}
