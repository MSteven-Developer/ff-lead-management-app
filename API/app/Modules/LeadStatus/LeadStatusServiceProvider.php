<?php

declare(strict_types=1);

namespace App\Modules\LeadStatus;

use Illuminate\Support\ServiceProvider;

class LeadStatusServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadMigrationsFrom(__DIR__.'/Database/Migrations');
    }

    public function register()
    {
        //
    }
}
