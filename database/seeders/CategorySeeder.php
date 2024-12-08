<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Technology' => 'Articles about software, hardware, and tech trends',
            'Programming' => 'Coding tutorials and development best practices',
            'Web Development' => 'Web technologies and frameworks',
            'Mobile Development' => 'iOS, Android, and cross-platform development',
            'Data Science' => 'AI, Machine Learning, and Data Analytics',
            'DevOps' => 'Development operations and deployment',
            'Security' => 'Cybersecurity and data protection',
            'Career' => 'Professional development and tech industry insights'
        ];

        foreach ($categories as $name => $description) {
            Category::create([
                'name' => $name,
                'slug' => str()->slug($name),
                'description' => $description
            ]);
        }
    }
}