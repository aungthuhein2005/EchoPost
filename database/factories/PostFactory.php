<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    protected $model = Post::class;

    public function definition(): array
    {
        return [
            'title' => fake()->sentence(),
            'content' => fake()->paragraphs(3, true),
            'excerpt' => fake()->paragraph(),
            'slug' => fake()->slug(),
            'status' => fake()->randomElement(['published', 'draft']),
            // Remove or comment out the category_id field
            // 'category_id' => Category::factory(), // Remove this line
            'author_id' => User::inRandomOrder()->first()->id,
        ];
    }
}