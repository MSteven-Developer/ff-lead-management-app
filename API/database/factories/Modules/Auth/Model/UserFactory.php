<?php

namespace Database\Factories\Modules\Auth\Model;

use App\Modules\Auth\Model\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{
    // Explicitly specify the model
    protected $model = User::class;

    public function definition()
    {
        return [
            'email' => $this->faker->unique()->safeEmail,
            'password' => bcrypt('password'), // Default password
        ];
    }
}
