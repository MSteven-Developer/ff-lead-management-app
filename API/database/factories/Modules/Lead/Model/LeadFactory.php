<?php

namespace Database\Factories\Modules\Lead\Model;

use App\Modules\Lead\Model\Lead;
use Illuminate\Database\Eloquent\Factories\Factory;

class LeadFactory extends Factory
{
    protected $model = Lead::class;

    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'phone' => $this->faker->phoneNumber,
            'lead_status_id' => \App\Modules\LeadStatus\Model\LeadStatus::factory(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
