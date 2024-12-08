import { Link, usePage } from '@inertiajs/react';

export default function ProfileDropdown({ isOpen, setIsOpen }) {
    
    const {auth} = usePage().props;

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="flex items-center space-x-2"
            >
                <img 
                     src={auth.user.avatar_url || `https://via.placeholder.com/150/000000/FFFFFF/?text=${auth.user.full_name.charAt(0)}`}
                    alt="Profile" 
                    className="w-8 h-8 rounded-full"
                />
                <svg 
                    className="w-4 h-4 text-gray-600 dark:text-gray-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>
            
            {/* Dropdown Menu */}
            <div 
                className={`${
                    isOpen ? 'block' : 'hidden'
                } absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50`}
            >
                <Link 
                    href={`/profile/${auth.user.id}`} 
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <div className="flex items-center space-x-2">
                        <svg 
                            className="w-5 h-5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                        <span>Profile</span>
                    </div>
                </Link>

                <Link 
                    href="/articles/create" 
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <div className="flex items-center space-x-2">
                        <svg 
                            className="w-5 h-5" 
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
                        <span>New Article</span>
                    </div>
                </Link>

                <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

                <Link 
                    href="/logout" 
                    method="post" 
                    as="button" 
                    className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <div className="flex items-center space-x-2">
                        <svg 
                            className="w-5 h-5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                        <span>Logout</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}