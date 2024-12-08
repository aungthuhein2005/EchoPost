import { Link } from '@inertiajs/react';

export default function ArticleCard({ image, category, date, readTime, title, excerpt, author, href }) {
console.log(author);

    return (
        <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="relative">
                <img src={image} alt="Article thumbnail" className="w-full h-64 object-cover" />
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                        {category}
                    </span>
                </div>
            </div>
            
            <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span>{date}</span>
                    <span>•</span>
                    <span>{readTime}</span>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    <Link href={href} className="hover:text-blue-600 dark:hover:text-blue-400">
                        {title}
                    </Link>
                </h2>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">{excerpt}</p>
                
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src={author.avatar_url || `https://via.placeholder.com/150/000000/FFFFFF/?text=${author.full_name.charAt(0)}`} alt={author.username} className="w-10 h-10 rounded-full" />
                        <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">{author.username}</h4>
                            {/* <p className="text-sm text-gray-500 dark:text-gray-400">{author.role}</p> */}
                        </div>
                    </div>
                    
                    <Link href={href} className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                        Read More
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                        </svg>
                    </Link>
                </div>
            </div>
        </article>
    );
}