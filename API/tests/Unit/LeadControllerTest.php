<?php

namespace Tests\Unit;

use App\Modules\Lead\Controller\LeadController;
use App\Modules\Lead\Model\Lead;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Tests\TestCase;
use Mockery;

/**
 * @runTestsInSeparateProcesses
 * @preserveGlobalState disabled
 */
class LeadControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_retrieves_leads()
    {
        // Create a mock for the Eloquent builder
        $queryBuilder = Mockery::mock('Illuminate\Database\Eloquent\Builder');

        // Mock the `with` method to return the query builder instance
        $queryBuilder->shouldReceive('with')
            ->once()
            ->with('status')
            ->andReturnSelf();

        // Mock the `orderBy` method to return the query builder instance
        $queryBuilder->shouldReceive('orderBy')
            ->once()
            ->with('id', 'asc') // Assuming the default ordering parameters
            ->andReturnSelf();

        // Mock the `paginate` method to return a sample paginated response
        $queryBuilder->shouldReceive('paginate')
            ->once()
            ->with(10, ['*'], 'page', 1)
            ->andReturn((object) ['data' => [['id' => 1, 'name' => 'Test Lead']]]);

        // Mock the Lead model's `query()` method to return the builder mock
        $leadMock = Mockery::mock('alias:' . Lead::class);
        $leadMock->shouldReceive('query')->andReturn($queryBuilder);

        // Create a request with pagination parameters
        $request = Request::create('/leads', 'GET', [
            'currentPage' => 1,
            'recordsPerPage' => 10,
        ]);

        // Instantiate the controller and call the index method
        $controller = new LeadController();
        $response = $controller->index($request);

        // Assertions
        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertArrayHasKey('data', $response->getData(true));
    }

    public function test_store_creates_new_lead()
    {
        // Create a valid lead status to satisfy the foreign key constraint
        $leadStatus = \App\Modules\LeadStatus\Model\LeadStatus::factory()->create();

        // Define sample lead data with the valid `lead_status_id`
        $leadData = [
            'name' => 'Test Lead',
            'email' => 'testlead@example.com',
            'phone' => '1234567890',
            'lead_status_id' => $leadStatus->id,
        ];

        // Mock the static `create` method on the Lead model to return a lead instance
        $leadMock = Mockery::mock('alias:' . Lead::class);
        $leadMock->shouldReceive('create')
            ->once()
            ->with($leadData)
            ->andReturn((object) array_merge($leadData, ['id' => 1]));

        // Create a request with lead data
        $request = Request::create('/leads', 'POST', $leadData);

        // Instantiate the controller and call the store method
        $controller = new LeadController();
        $response = $controller->store($request);

        // Assertions
        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(201, $response->getStatusCode());
        $this->assertEquals('Lead created successfully', $response->getData(true)['message']);
        $this->assertEquals($leadData['email'], $response->getData(true)['data']['email']);
    }

    public function test_update_lead()
    {
        // Create a valid lead status and lead to satisfy the foreign key constraint
        $leadStatus = \App\Modules\LeadStatus\Model\LeadStatus::factory()->create();
        $lead = \App\Modules\Lead\Model\Lead::factory()->create(['lead_status_id' => $leadStatus->id]);

        // Define updated lead data
        $updatedData = [
            'name' => 'Updated Lead',
            'email' => 'updated@example.com',
            'phone' => '0987654321',
            'lead_status_id' => $leadStatus->id,
        ];

        // No need to mock the entire Lead model; just ensure it exists and update it directly
        $request = Request::create("/leads/{$lead->id}", 'PUT', $updatedData);

        // Instantiate the controller and call the update method
        $controller = new LeadController();
        $response = $controller->update($request, (string)$lead->id);

        // Assertions
        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('Lead updated successfully', $response->getData(true)['message']);
    }

    public function test_destroy_deletes_lead()
    {
        // Create a lead status to satisfy the foreign key constraint
        $leadStatus = \App\Modules\LeadStatus\Model\LeadStatus::factory()->create();

        // Create a lead instance with the valid lead_status_id
        $lead = \App\Modules\Lead\Model\Lead::factory()->create(['lead_status_id' => $leadStatus->id]);

        // Instantiate the controller and call the destroy method with the lead's ID
        $controller = new LeadController();
        $response = $controller->destroy((string)$lead->id);

        // Assertions
        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(204, $response->getStatusCode());
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
