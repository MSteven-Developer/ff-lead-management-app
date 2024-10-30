<?php

declare(strict_types=1);

namespace App\Modules\Auth\Model;

use Illuminate\Foundation\Auth\User as Authenticatable; // Change this line
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $guarded = [];
}
