<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Auth\Controller\AuthController;

Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
});

Route::middleware('auth:sanctum')->prefix('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});
