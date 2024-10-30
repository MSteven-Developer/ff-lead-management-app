<?php

declare(strict_types=1);

namespace App\Modules\Lead;

use Illuminate\Support\ServiceProvider;

class LeadServiceProvider extends ServiceProvider
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
