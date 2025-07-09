<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PostFactory extends Factory
{
    public function definition()
    {
        $title = fake()->sentence(6, true);
        
        return [
            'title' => $title,
            'content' => fake()->paragraphs(5, true),
            'slug' => Str::slug($title),
            'user_id' => User::factory(),
        ];
    }
}