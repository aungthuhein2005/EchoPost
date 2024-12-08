import { formatDate } from '@/utils/dateFormatter';
import { calculateReadTime } from '../../utils/readTime';

export default function ArticleHeader({ article }) {
    return (
        <div className="text-center">
            <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full mb-4">
                {article.categories[0].name}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {article.title}
            </h1>
            
            {/* Article Meta */}
            <div className="flex items-center justify-center gap-4 text-gray-600 dark:text-gray-400 mb-8">
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <span>{formatDate(article.created_at)}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>{calculateReadTime(article.content)} read</span>
                </div>
            </div>

            {/* Author Info */}
            {/* <div className="flex items-center justify-center gap-4 mb-8">
                <img src={article.author.avatar} 
                     alt={article.author.name} 
                     className="w-12 h-12 rounded-full" />
                <div className="text-left">
                    <h4 className="font-medium text-gray-900 dark:text-white">{article.author.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{article.author.role}</p>
                </div>
            </div> */}

            {/* Featured Image */}
            <img src={article.featured_image} 
                 alt="Featured image" 
                 className="w-full h-[400px] object-cover rounded-2xl mb-12" />
        </div>
    );
}