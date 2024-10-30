<?php

namespace Database\Factories\Modules\LeadStatus\Model;

use App\Modules\LeadStatus\Model\LeadStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

class LeadStatusFactory extends Factory
{
    protected $model = LeadStatus::class;

    public function definition()
    {
        return [
            'name' => $this->faker->word, // Generate a random status name
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
