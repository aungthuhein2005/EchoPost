import { useState } from "react";
import { usePage } from "@inertiajs/react";
import axios from "axios";

export default function ReactionSection({ article }) {
    const { auth } = usePage().props;
    const { user } = auth;

    const isAuthenticated = !!user;

    const [likeCount, setLikeCount] = useState(
        article.reactions.filter(
            (reaction) => reaction.reaction_type === "like"
        ).length
    );
    const [saveReaction, setSaveReaction] = useState(
        isAuthenticated && article.reactions.length === 0
            ? ""
            : isAuthenticated && article.reactions.find(
                  (reaction) =>
                      reaction.user_id === user.id &&
                      reaction.reaction_type === "save"
              )?.reaction_type || ""
    );
    const [likeReaction, setLikeReaction] = useState(
        isAuthenticated && article.reactions.length === 0
            ? ""
            : isAuthenticated && article.reactions.find(
                  (reaction) =>
                      reaction.user_id === user.id &&
                      reaction.reaction_type === "like"
              )?.reaction_type || ""
    );

    const toggleLike = async () => {
        axios
            .post(`/articles/${article.slug}/toggleLike`)
            .then((response) => {
                if (response.data.message !== "Liked") {
                    setLikeReaction("");
                    setLikeCount(likeCount-1);
                }
                if (response.data.message === "Liked") {
                    setLikeReaction("like");
                    setLikeCount(likeCount+1);
                }
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    const toggleSave = async () => {
        axios
            .post(`/articles/${article.slug}/toggleSave`)
            .then((response) => {
                if (response.data.message !== "Saved") setSaveReaction("");
                if (response.data.message === "Saved") setSaveReaction("save");
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    return (
        <div className="flex items-center gap-6 border-t border-gray-200 dark:border-gray-700 mt-12 pt-8">
            <button
                onClick={() => isAuthenticated && toggleLike()}
                className={`flex items-center gap-2 ${
                    likeReaction === "like"
                        ? "text-blue-600"
                        : "text-gray-600 dark:text-gray-300"
                } hover:text-blue-600 dark:hover:text-blue-400`}
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                </svg>
                <span>
                    {likeCount} {likeCount > 1 ? "Likes" : "Like"}
                </span>
            </button>

            <button
                onClick={() => isAuthenticated && toggleSave()}
                className={`flex items-center gap-2 ${
                    saveReaction === "save"
                        ? "text-green-600"
                        : "text-gray-600 dark:text-gray-300"
                } hover:text-blue-600 dark:hover:text-blue-400`}
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                </svg>
                <span>Save</span>
            </button>
        </div>
    );
}
