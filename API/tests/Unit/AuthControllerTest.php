<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Modules\Auth\Controller\AuthController;
use App\Modules\Auth\Model\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;
use Mockery;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_successful_with_valid_credentials()
    {
        // Create a partial mock for the User model
        $user = Mockery::mock(User::class)->makePartial();
        $user->shouldReceive('createToken')
            ->once()
            ->andReturn((object) ['plainTextToken' => 'mocked_token']);

        // Mock the Auth facade
        Auth::shouldReceive('attempt')
            ->once()
            ->with(['email' => 'test@example.com', 'password' => 'password'])
            ->andReturn(true);

        Auth::shouldReceive('user')->once()->andReturn($user);

        // Create a request
        $request = Request::create('/login', 'POST', [
            'email' => 'test@example.com',
            'password' => 'password',
        ]);

        // Instantiate the AuthController and call the login method
        $controller = new AuthController();
        $response = $controller->login($request);

        // Assertions
        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertArrayHasKey('token', $response->getData(true)['data']);
    }

    public function test_login_fails_with_invalid_credentials()
    {
        // Mock Auth facade for invalid credentials
        Auth::shouldReceive('attempt')->once()->andReturn(false);

        $request = Request::create('/login', 'POST', [
            'email' => 'invalid@example.com',
            'password' => 'wrongpassword',
        ]);

        $controller = new AuthController();
        $response = $controller->login($request);

        $this->assertInstanceOf(JsonResponse::class, $response);
        $this->assertEquals(401, $response->getStatusCode());
        $this->assertEquals('Invalid credentials', $response->getData(true)['message']);
    }

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
