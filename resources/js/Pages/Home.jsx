import MainLayout from '@/Layouts/MainLayout';
import Hero from '@/Components/Hero';
import BlogPost from '@/Components/BlogPost';
import Newsletter from '@/Components/Newsletter';
import { Link } from '@inertiajs/react';

export default function Home({ posts }) {
    
    return (
        <MainLayout>
            <Hero />
            
            <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Latest Articles
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Discover our most recent blog posts and insights
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map(post => (
                        <BlogPost key={post.id} post={post} />
                    ))}
                </div>
                <div className="text-center mt-8 ">
                    <Link  href="/articles" className=" bg-blue-500 text-white font-bold py-2 px-4 rounded mx-auto">
                        <span>More Articles </span>
                        <svg className="ml-2 w-4 h-4 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                        </svg>
                    </Link>
                </div>
            </div>

            <Newsletter />
        </MainLayout>
    );
}