<?php

declare(strict_types=1);

namespace App\Modules\Auth;

use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
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
