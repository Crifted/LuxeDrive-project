<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin account for the LuxeDrive dashboard
        User::updateOrCreate(
            ['email' => 'admin@luxedrive.nl'],
            [
                'name'     => 'LuxeDrive Admin',
                'password' => Hash::make('luxedrive2026'),
            ]
        );

        $this->call([
            CarSeeder::class,
        ]);
    }
}
