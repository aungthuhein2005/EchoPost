<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    public function run(): void
    {
        $tags = [
            'PHP', 'Laravel', 'JavaScript', 'Vue.js', 'React',
            'Programming', 'Web Development', 'Database', 'API',
            'DevOps', 'Testing', 'Security', 'Design', 'UI/UX'
        ];

        foreach ($tags as $tagName) {
            Tag::create([
                'name' => $tagName,
                'slug' => str()->slug($tagName)
            ]);
        }
    }
}