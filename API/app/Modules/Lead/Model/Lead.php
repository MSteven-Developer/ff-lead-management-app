<?php

declare(strict_types=1);

namespace App\Modules\Lead\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Modules\LeadStatus\Model\LeadStatus;
use Illuminate\Support\Facades\Cache;

class Lead extends Model
{
    use HasFactory;

    protected $guarded=[];

    protected $fillable = ['name', 'email', 'phone', 'lead_status_id'];

    protected static function booted()
    {
        static::created(function ($lead) {
            self::clearLeadsCache();
        });

        static::updated(function ($lead) {
            self::clearLeadsCache();
        });

        static::deleted(function ($lead) {
            self::clearLeadsCache();
        });
    }

    protected static function clearLeadsCache()
    {
        // Clear all related cache keys for `leads_index`
        foreach (Cache::get('leads_cache_keys', []) as $key) {
            Cache::forget($key);
        }

        Cache::forget('leads_cache_keys');
    }

    public function status()
    {
        return $this->hasOne(LeadStatus::class, "id", "lead_status_id");
    }
}
