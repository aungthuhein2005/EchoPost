<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        User::create([
            'username' => 'admin',
            'email' => 'admin@example.com',
            'password' => 'password',
            'full_name' => 'Admin User',
            'role' => User::ROLE_ADMIN,
            'bio' => 'System Administrator',
            'email_verified_at' => now(),
        ]);

        // Create some regular users
        User::factory(10)->create();
    }
}