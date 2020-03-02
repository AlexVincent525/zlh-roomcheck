<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function index()
    {
        return view('login');
    }

    public function login(Request $request)
    {
        $studentNumber = $request->input('student_number');
        $password = $request->input('password');

        $result = auth()->attempt([
            'student_number' => $studentNumber,
            'password' => $password,
            'active' => 1
        ]);

        if ($result){
            return response()->json(['status' => 1]);
        } else {
            return response()->json(['status' => 0]);
        }
    }

    public function changePassword(Request $request)
    {
        $user = \Auth::user();
        $oldPassword = $request->input('old_password');
        $newPassword = $request->input('new_password');

        $result = \Hash::check($oldPassword, $user->password);

        if ($result) {
            $newPassword = \Hash::make($newPassword);
            $user->password = $newPassword;
            $user->save();
            return response()->json(['status' => 1]);
        } else {
            return response()->json(['status' => 0]);
        }
    }

    public function logout()
    {
        \Auth::logout();
        return response()->redirectTo('/admin/login');
    }
}