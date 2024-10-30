<?php

use Illuminate\Support\Facades\Route;
use App\Modules\LeadStatus\Controller\LeadStatusController;

Route::prefix('lead-statuses')->group(function () {
    Route::get('/', [LeadStatusController::class, 'index']);       
});
