import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import ArticleHeader from '@/Components/Article/ArticleHeader';
import ArticleContent from '@/Components/Article/ArticleContent';
import ReactionSection from '@/Components/Article/ReactionSection';
import CommentSection from '@/Components/Article/CommentSection';
import ShareButtons from '@/Components/Article/ShareButtons';

export default function ArticleDetail({article}) {

    return (
        <div className='bg-white dark:bg-gray-900'>
            <Head title={article.title} />
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-12 ">
                <ArticleHeader article={article} />
                <ArticleContent content={article.content} />
                <div className="mt-4 flex items-center">
                    <img 
                       src={article.author.avatar_url || `https://via.placeholder.com/150/000000/FFFFFF/?text=${article.author.full_name.charAt(0)}`} // Assuming the avatar URL is available in the author object
                        alt={`${article.author.full_name}'s profile`}
                        className="w-10 h-10 rounded-full mr-3" // Adjust size and margin as needed
                    />
                    <div>
                        <p className="text-gray-900 dark:text-white font-semibold">
                            <a href={`/profile/${article.author.id}`}>{article.author.full_name}</a>
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            <a href={`/profile/${article.author.id}`}>@{article.author.username}</a>
                        </p>
                    </div>
                </div>
                <ReactionSection article={article}  />
                <CommentSection comments={article.comments} postSlug={article.slug} />
                <ShareButtons />
                
            </div>
        </div>
    );
}