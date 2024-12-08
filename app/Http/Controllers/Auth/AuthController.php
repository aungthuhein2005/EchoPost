<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function create(){
        return Inertia::render('Auth/Register');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|confirmed|min:8',
            'fullname' => 'required|string|max:255',
        ]);

        $user = User::create([
            'username' => $validatedData['username'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'full_name' => $validatedData['fullname'],
        ]);
        Auth::login($user);

        return redirect()->route('profile', ['userId' => $user->id])->with('success', 'Registration successful!');
    }
    
    public function showLoginForm(){
        return Inertia::render('Auth/Login');
    }

    public function login(Request $request)
{
    // Validate the incoming request
    $validatedData = $request->validate([
        'email' => 'required|string|email',
        'password' => 'required|string',
    ]);

    $credentials = $request->only('email', 'password');
    if (Auth::attempt($credentials)) {
        return redirect()->intended('profile/' . Auth::user()->id)->with('success', 'Logged in successfully!');
    } else {
        return back()->withErrors([
            'password' => 'The provided password is incorrect.',
        ]);
    }
    return back()->withErrors([
        'email' => 'The provided credentials do not match our records.',
    ]);
}

}
