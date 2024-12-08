<?php

namespace App\Helpers;

class DummyData
{
    public static function getPosts()
    {
        return [
            [
                'id' => 1,
                'title' => 'Getting Started with Tailwind CSS',
                'excerpt' => 'Learn how to set up and use Tailwind CSS in your next project with this comprehensive guide. We\'ll cover installation, configuration, and best practices.',
                'content' => 'Full article content here...',
                'image' => 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                'category' => 'Tutorial',
                'categoryColor' => 'blue',
                'readTime' => '5 min read',
                'publishedAt' => '2024-03-15',
                'author' => [
                    'name' => 'John Doe',
                    'role' => 'Technical Writer',
                    'avatar' => 'https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg'
                ]
            ],
            [
                'id' => 2,
                'title' => 'Web Development Best Practices for 2024',
                'excerpt' => 'Discover the essential best practices that every web developer should follow to create maintainable and scalable applications.',
                'content' => 'Full article content here...',
                'image' => 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
                'category' => 'Best Practices',
                'categoryColor' => 'green',
                'readTime' => '8 min read',
                'publishedAt' => '2024-03-14',
                'author' => [
                    'name' => 'Jane Smith',
                    'role' => 'Senior Developer',
                    'avatar' => 'https://api.uifaces.co/our-content/donated/FJkauyEa.jpg'
                ]
            ],
            [
                'id' => 3,
                'title' => 'Mastering React Hooks',
                'excerpt' => 'Deep dive into React Hooks and learn how to build more efficient and cleaner React components.',
                'content' => 'Full article content here...',
                'image' => 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
                'category' => 'React',
                'categoryColor' => 'blue',
                'readTime' => '10 min read',
                'publishedAt' => '2024-03-13',
                'author' => [
                    'name' => 'Mike Johnson',
                    'role' => 'React Developer',
                    'avatar' => 'https://api.uifaces.co/our-content/donated/KtCFjlD4.jpg'
                ]
            ],
            [
                'id' => 4,
                'title' => 'Introduction to Laravel 11',
                'excerpt' => 'Explore the new features and improvements in Laravel 11 and how they can enhance your development workflow.',
                'content' => 'Full article content here...',
                'image' => 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2',
                'category' => 'Laravel',
                'categoryColor' => 'red',
                'readTime' => '7 min read',
                'publishedAt' => '2024-03-12',
                'author' => [
                    'name' => 'Sarah Wilson',
                    'role' => 'PHP Developer',
                    'avatar' => 'https://api.uifaces.co/our-content/donated/N4aA96n.jpg'
                ]
            ],
            [
                'id' => 5,
                'title' => 'Modern CSS Techniques',
                'excerpt' => 'Learn about the latest CSS features and techniques that can help you create better user interfaces.',
                'image' => 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2',
                'category' => 'CSS',
                'categoryColor' => 'purple',
                'readTime' => '6 min read',
                'publishedAt' => '2024-03-11',
                'author' => [
                    'name' => 'Emily Chen',
                    'role' => 'UI Developer',
                    'avatar' => 'https://api.uifaces.co/our-content/donated/PAqDZqW-.jpg'
                ]
            ],
            [
                'id' => 6,
                'title' => 'Getting Started with TypeScript',
                'excerpt' => 'A comprehensive guide to starting with TypeScript in your JavaScript projects.',
                'image' => 'https://images.unsplash.com/photo-1516116216624-53e697fedbea',
                'category' => 'TypeScript',
                'categoryColor' => 'blue',
                'readTime' => '9 min read',
                'publishedAt' => '2024-03-10',
                'author' => [
                    'name' => 'Alex Thompson',
                    'role' => 'Full Stack Developer',
                    'avatar' => 'https://api.uifaces.co/our-content/donated/AVQ0V28X.jpg'
                ]
            ]
        ];
    }
}