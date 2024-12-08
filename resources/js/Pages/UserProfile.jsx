import React, { useEffect, useState, useMemo } from "react";
import MainLayout from "@/Layouts/MainLayout";
import Pagination from "../Components/Pagination";
import { Link, usePage, router } from "@inertiajs/react";
import ArticleCard from "@/Components/Article/ArticleCard";
import { formatDate } from "@/utils/dateFormatter";

const UserProfile = ({ posts, saved, commentCount }) => {
    const { auth } = usePage().props;
    const [status, setStatus] = useState("all");
    

    const filteredArticles = useMemo(() => {
        if (status === "saved") return saved;
        if (status === "all") return posts;
        return posts.filter((article) => article.status === status);
    }, [posts, status, saved]);

    const handleStatusFilter = (e) => {
        setStatus(e.target.value); // Update status based on selection
    };

    return (
        <MainLayout>
            <div className="bg-white dark:bg-gray-800 shadow-lg">
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="relative">
                            <img
                                src={auth.user.avatar_url || `https://via.placeholder.com/150/000000/FFFFFF/?text=${auth.user.full_name.charAt(0)}`}
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700"
                            />
                            <Link href={`/profile/${auth.user.id}/edit`} className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                </svg>
                            </Link>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                {auth.user.full_name}
                            </h1>
                            <h6 className="text-gray-600 dark:text-gray-400 mb-4">
                                @{auth.user.username}
                            </h6>
                            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                                {auth.user.bio}
                            </p>
                        </div>
                        <div>
                            <Link
                                href="/articles/create"
                                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <svg
                                    className="w-5 h-5 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                                Create New Article
                            </Link>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {filteredArticles.length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Articles
                            </div>
                        </div>
                        {/* <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">128k</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Views</div>
                        </div> */}
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {commentCount}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Comments
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {saved.length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Saved
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8 min-h-[200px]">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        My Articles
                    </h2>
                    <div>
                        <select
                            onChange={handleStatusFilter}
                            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white me-2"
                        >
                            <option value="all">All Articles</option>
                            <option value="published">Published</option>
                            <option value="draft">Drafts</option>
                            {/* <option value="most viewed">Most Viewed</option> */}
                        </select>
                        <button onClick={() => setStatus("saved")} className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="inline"
                            >
                                <path
                                    fill="rgba(0, 0, 0, 1)"
                                    d="M19 10.132v-6c0-1.103-.897-2-2-2H7c-1.103 0-2 .897-2 2V22l7-4.666L19 22V10.132z"
                                ></path>
                            </svg>{" "}
                            Saved
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredArticles.map((post) => (
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
    );
};

export default UserProfile;
