<?php

declare(strict_types=1);

namespace App\Modules\LeadStatus\Controller;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Modules\LeadStatus\Model\LeadStatus;
use App\Traits\ResponseTrait;
use Illuminate\Support\Facades\Cache;

class LeadStatusController extends Controller
{
    use ResponseTrait;

    /**
     * Retrieve all lead statuses with optional caching and pagination.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $cacheKey = "lead_statuses_filter";

        $leadStatuses = Cache::remember($cacheKey, 60, function () {
            return LeadStatus::all();
        });

        return $this->successResponse($leadStatuses, 'Lead statuses retrieved successfully');
    }
}
