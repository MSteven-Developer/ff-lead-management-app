<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class ModularMigration extends Command
{
    /**
     * @var string
     */
    protected $signature = 'migrate:modular';

    /**
     * @var string
     */
    protected $description = 'Run migrations in a specific sequence';

    public function handle()
    {
        // Specifying the paths to migration files
        $migrations = [
            'app/Modules/Auth/Database/Migrations/2024_10_27_000001_create_users_table.php',
            'app/Modules/Auth/Database/Migrations/2024_10_27_000002_create_personal_access_tokens_table.php',
            'app/Modules/Lead/Database/Migrations/2024_10_27_000005_add_indexes_to_leads_table.php',
        ];

        foreach ($migrations as $migration) {
            $this->info("Running migration: $migration");
            Artisan::call('migrate', [
                '--path' => $migration, // Use the specific migration path
                '--force' => true, // Force the migration in production
            ]);
            $this->info("Migration $migration completed.");
        }

        $this->info('All migrations completed successfully.');
    }
}
