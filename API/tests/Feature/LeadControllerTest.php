<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Modules\Lead\Model\Lead;
use App\Modules\LeadStatus\Model\LeadStatus;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LeadControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_retrieve_leads(): void
    {
        // Create a user and authenticate the request
        $user = \App\Modules\Auth\Model\User::factory()->create();
        $this->actingAs($user, 'sanctum');

        // Send GET request to retrieve leads
        $response = $this->getJson('/api/leads');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'message',
            'data' => [
                'current_page',
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'email',
                        'phone',
                        'lead_status_id',
                        'created_at',
                        'updated_at',
                        'status' => [
                            'id',
                            'name',
                            'created_at',
                            'updated_at'
                        ]
                    ]
                ],
                'first_page_url',
                'from',
                'last_page',
                'last_page_url',
                'links',
                'next_page_url',
                'path',
                'per_page',
                'prev_page_url',
                'to',
                'total'
            ]
        ]);
    }

    public function test_can_create_lead(): void
    {
        // Create a user and authenticate the request
        $user = \App\Modules\Auth\Model\User::factory()->create();
        $this->actingAs($user, 'sanctum');
        $status = LeadStatus::factory()->create();

        $response = $this->postJson('/api/leads', [
            'name' => 'Test Lead',
            'email' => 'testlead@example.com',
            'phone' => '1234567890',
            'lead_status_id' => $status->id,
        ]);

        $response->assertStatus(201)
            ->assertJson(['message' => 'Lead created successfully']);
        $this->assertDatabaseHas('leads', ['email' => 'testlead@example.com']);
    }

    public function test_can_update_lead(): void
    {
        // Create a user and authenticate the request
        $user = \App\Modules\Auth\Model\User::factory()->create();
        $this->actingAs($user, 'sanctum');
        $status = LeadStatus::factory()->create();
        $lead = Lead::factory()->create();

        $response = $this->putJson("/api/leads/{$lead->id}", [
            'name' => 'Updated Lead',
            'email' => 'updated@example.com',
            'phone' => '0987654321',
            'lead_status_id' => $status->id,
        ]);

        $response->assertStatus(200)
            ->assertJson(['message' => 'Lead Updated Successfully']);
        $this->assertDatabaseHas('leads', ['email' => 'updated@example.com']);
    }

    public function test_can_delete_lead(): void
    {
        // Create a user and authenticate the request
        $user = \App\Modules\Auth\Model\User::factory()->create();
        $this->actingAs($user, 'sanctum');
        $lead = Lead::factory()->create();

        $response = $this->deleteJson("/api/leads/{$lead->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('leads', ['id' => $lead->id]);
    }
}
