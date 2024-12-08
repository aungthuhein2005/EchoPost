export default function ShareButtons() {
    const shareUrls = {
        twitter: "https://twitter.com/intent/tweet?url=",
        facebook: "https://www.facebook.com/sharer/sharer.php?u=",
        linkedin: "https://www.linkedin.com/shareArticle?mini=true&url="
    };

    const icons = {
        twitter: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
        ),
        facebook: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h7v-7h-2v-3h2V8.5C12 6.57 13.57 5 15.5 5H18v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3H15v7h4a2 2 0 002-2V5a2 2 0 00-2-2z"/>
            </svg>
        ),
        linkedin: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
        )
    };

    return (
        <div className="flex items-center gap-4 border-t border-gray-200 dark:border-gray-700 mt-12 pt-8">
            <span className="text-gray-700 dark:text-gray-300">Share this article:</span>
            {Object.entries(shareUrls).map(([platform, baseUrl]) => (
                <button
                    key={platform}
                    onClick={() => window.open(baseUrl + window.location.href)}
                    className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                    {icons[platform]}
                </button>
            ))}
        </div>
    );
}