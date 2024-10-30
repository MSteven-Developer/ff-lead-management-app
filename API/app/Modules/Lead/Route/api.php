<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Lead\Controller\LeadController;

Route::middleware('auth:sanctum')->prefix('leads')->group(function () {
    Route::get('/', [LeadController::class, 'index']);           
    Route::get('/{id}', [LeadController::class, 'show']);           
    Route::post('/', [LeadController::class, 'store']);         
    Route::put('/{id}', [LeadController::class, 'update']);     
    Route::delete('/{id}', [LeadController::class, 'destroy']);  
});