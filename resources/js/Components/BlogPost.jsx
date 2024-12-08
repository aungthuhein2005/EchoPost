import { formatDate } from '@/utils/dateFormatter';
import { calculateReadTime } from '@/utils/readTime';
import { Link } from '@inertiajs/react';

export default function BlogPost({ post }) {
    
    return (
        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
                <div className="absolute top-4 left-4 z-10">
                    <span className={`px-3 py-1 bg-${post.categoryColor}-600 text-white text-sm font-medium rounded-full`}>
                        {post.category}
                    </span>
                </div>
                <img 
                    src={post.featured_image} 
                    alt={post.title} 
                    className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                />
            </div>
            
            <div className="p-6">
            <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            <span>{formatDate(post.created_at)}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>{calculateReadTime(post.content)}</span>
                        </div>
                    </div>

                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <Link href={`/articles/${post.slug}`}>{post.title}</Link>
                    </h3>
                    {/* <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        Learn how to set up and use Tailwind CSS in your next project with this comprehensive guide. We'll cover installation, configuration, and best practices.
                    </p> */}

                    <div class="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <img src={post.author.avatar_url || `https://via.placeholder.com/150/000000/FFFFFF/?text=${post.author.full_name.charAt(0)}`} 
                             alt={post.author.username} 
                             class="w-10 h-10 rounded-full"/>
                        <div>
                            <h4 class="font-medium text-gray-900 dark:text-white">{post.author.username}</h4>
                            {/* <p class="text-sm text-gray-500 dark:text-gray-400">Technical Writer</p> */}
                        </div>
                    </div>
            </div>
        </article>
    );
}