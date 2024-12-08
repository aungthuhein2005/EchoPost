import React, { useState,useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';

export default function CommentForm({ postSlug }) {
    const {auth} = usePage().props;
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(`/articles/${postSlug}/comments`, {
            content,
            onSuccess: () => {
                setContent(''); 
            },
            onError: (errors) => {
                console.error(errors); // Handle errors as needed
            }
        });
    };

    return (
        <form className="mb-8" onSubmit={handleSubmit}>
            <div className="flex gap-4">
                <img 
                    src={auth.user.avatar_url || `https://via.placeholder.com/150/000000/FFFFFF/?text=${auth.user.full_name.charAt(0)}`}
                    alt="Your profile" 
                    className="w-10 h-10 rounded-full" 
                />
                <div className="flex-1">
                    <textarea 
                        rows="3" 
                        value={content}
                        onChange={(e) => setContent(e.target.value)} // Update state on change
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Add a comment..."
                    ></textarea>
                    <div className="flex justify-end mt-4">
                        <button 
                            type="submit" 
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Post Comment
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}