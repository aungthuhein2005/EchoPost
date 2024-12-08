<?php

namespace Database\Seeders;
use App\Models\Post;
use App\Models\Category;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    public function run()
    {
        Post::factory(50)->create()->each(function ($post) {
            $categories = Category::inRandomOrder()->limit(rand(1, 3))->get();
            $post->categories()->attach($categories);
        });
    }
}