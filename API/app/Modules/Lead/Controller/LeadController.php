<?php

declare(strict_types=1);

namespace App\Modules\Lead\Controller;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Modules\Lead\Model\Lead;
use App\Traits\ResponseTrait;

class LeadController extends Controller
{
    use ResponseTrait;

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $currentPage = $request->query('currentPage', 1);
        $perPage = $request->query('recordsPerPage', 10);
        $sort = $request->query('sortColumn', 'id');
        $orderBy = $request->query('orderBy', 'asc');
        $searchQuery = $request->query('searchQuery', null);

        $cacheKey = 'leads_index_' . md5(json_encode([
                'currentPage' => $currentPage,
                'perPage' => $perPage,
                'sort' => $sort,
                'orderBy' => $orderBy,
                'searchQuery' => $searchQuery,
                'filters' => $request->only(['lead_status_id', 'name', 'email', 'phone']),
            ]));

        $cacheKeys = Cache::get('leads_cache_keys', []);
        $cacheKeys[] = $cacheKey;
        Cache::put('leads_cache_keys', array_unique($cacheKeys), 60);

        $leads = Cache::remember($cacheKey, 60, function () use ($request, $perPage, $sort, $orderBy, $currentPage) {
                $leadsQuery = Lead::query();

            if ($this->hasFilters($request)) {
                $this->applyFilters($leadsQuery, $request);
            }

            if ($request->query('searchQuery')) {
                $this->applySearch($leadsQuery, $request->query('searchQuery'));
            }

                return $leadsQuery->with("status")
                ->orderBy($sort, $orderBy)
                ->paginate($perPage, ['*'], 'page', $currentPage);
        });

        return $this->successResponse($leads, 'Leads retrieved successfully', 200);
    }

    /**
     * @param Request $request
     * @return bool
     */
    private function hasFilters(Request $request)
    {
        return $request->query('lead_status_id') ||
           $request->query('name') ||
           $request->query('email') ||
           $request->query('phone');
    }

    /**
     * @param Builder $query
     * @param Request $request
     * @return void
     */
    private function applyFilters($query, Request $request)
    {
        if ($request->query('lead_status_id')) {
            $query->where('lead_status_id', $request->query('lead_status_id'));
        }
        if ($request->query('name')) {
            $query->where('name', 'like', "%" . $request->query('name') . "%");
        }
        if ($request->query('email')) {
            $query->where('email', 'like', "%" . $request->query('email') . "%");
        }
        if ($request->query('phone')) {
            $query->where('phone', 'like', "%" . $request->query('phone') . "%");
        }
    }

    /**
     * @param Builder $query
     * @param string $search
     * @return void
     */
    private function applySearch($query, $search)
    {
        $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%$search%")
              ->orWhere('email', 'like', "%$search%");
        });
    }


    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:191',
            'email' => 'required|email',
            'phone' => 'required',
            'lead_status_id' => 'required',

        ]);

        $lead = Lead::create($validatedData);
        return $this->successResponse($lead, 'Lead created successfully', 201);
    }

    /**
     * @param string $id
     * @return JsonResponse
     */
    public function show($id)
    {
        $lead = Lead::findOrFail($id);
        return $this->successResponse($lead);
    }

    /**
     * @param Request $request
     * @param string $id
     * @return JsonResponse
     */
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:191',
            'email' => 'required|email',
            'phone' => 'required',
            'lead_status_id' => 'required',
        ]);

        $lead = Lead::findOrFail($id);
        $lead->update($validatedData);
        return $this->successResponse($lead, 'Lead Updated Successfully', 200);
    }

    /**
     * @param string $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        $lead = Lead::findOrFail($id);
        $lead->delete();
        return $this->successResponse(null, 'Lead deleted successfully', 204);
    }
}
