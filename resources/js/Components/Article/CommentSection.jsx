import { useState } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

export default function CommentSection({ comments ,postSlug}) {
    return (
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Comments ({comments.length})
            </h3>
            
            <CommentForm  postSlug={postSlug}/>
            <CommentList comments={comments} />
        </div>
    );
}