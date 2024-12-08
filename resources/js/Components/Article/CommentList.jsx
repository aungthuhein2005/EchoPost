export default function CommentList({ comments }) {
    console.log(comments);
    
    return (
        <div className="space-y-8">
            {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                    <img 
                        // src={comment.author.avatar}
                        alt={comment.user == null ? "unknown" : comment.user.full_name} 
                        className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                                {comment.user == null ? "unknown" : comment.user.full_name}
                            </h4>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {comment.timeAgo}
                            </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-3">
                            {comment.content}
                        </p>
                        {/* <div className="flex items-center gap-4">
                            <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                Reply
                            </button>
                            <button className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
                                </svg>
                                <span>{comment.likes}</span>
                            </button>
                        </div> */}
                    </div>
                </div>
            ))}
        </div>
    );
}