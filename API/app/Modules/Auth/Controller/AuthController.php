<?php

declare(strict_types=1);

namespace App\Modules\Auth\Controller;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Modules\Auth\Model\User;
use App\Traits\ResponseTrait;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    use ResponseTrait;

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();
            $token = $user->createToken('token_name')->plainTextToken;
            return $this->successResponse(["token"=>$token], 'User login successfully', 200);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function register(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        return $this->successResponse($user, 'User registered successfully', 200);

    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request)
    {
        $user = Auth::user();

        if ($user) {
            $user->currentAccessToken()->delete();
            return $this->successResponse(null, 'Successfully logged out', 200);
        }

        return response()->json(['message' => 'User not authenticated'], 401);
    }
}
