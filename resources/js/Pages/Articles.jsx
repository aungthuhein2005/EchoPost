import { useState } from 'react';
import { Head } from '@inertiajs/react';
import ArticleCard from '@/Components/Article/ArticleCard';
import Pagination from '@/Components/Pagination';
import MainLayout from '@/Layouts/MainLayout';
import { formatDate } from '@/utils/dateFormatter';

export default function Articles({posts,categories}) {  
    
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Function to filter posts by selected category and search query
    const filteredPosts = posts.filter(post => {
        const matchesCategory = selectedCategory === 'all' || post.categories.some(category => category.id === selectedCategory);
        const matchesSearch = searchQuery === '' || 
                              (post.title && post.title.toLowerCase().includes(searchQuery.toLowerCase())) || 
                              (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <>
            <Head title="Articles" />
            <MainLayout>
                
            {/* Page Header */}
            <div className="bg-white dark:bg-gray-800 py-8 sm:py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">All Articles</h1>
                    
                    {/* Filter and Search Section */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2">
                            {/* Add button for "All" categories */}
                            <button
                                key="all"
                                onClick={() => setSelectedCategory('all')}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                    selectedCategory === 'all'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-600 hover:text-white'
                                }`}
                            >
                                All
                            </button>
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                        selectedCategory === category.id
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-600 hover:text-white'
                                    }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                        
                        {/* Search Bar */}
                        <div className="relative w-full sm:w-64">
                            <input
                                type="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search articles..."
                                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                            />
                            <svg className="w-5 h-5 absolute right-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Articles Grid */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredPosts.map((post) => (
                        <ArticleCard
                            key={post.id}
                            image={post.featured_image}
                            category={post.categories[0].name}
                            date={formatDate(post.created_at)}
                            readTime="5 min read"
                            title={post.title}
                            excerpt={post.excerpt}
                            author={post.author}
                            href={`/articles/${post.slug}`}
                        />
                    ))}
                </div>
                {/* <Pagination /> */}
            </div>
        </MainLayout>
        </>
    );
}