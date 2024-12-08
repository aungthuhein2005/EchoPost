import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ProfileDropdown from './ProfileDropdown'

export default function Navbar() {
    const {auth} = usePage().props;
    
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const toggleDarkMode = () => {
        
        const isDark = document.documentElement.classList.contains('dark');
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
    };

    useEffect(() => {
        if (localStorage.getItem('theme') === 'dark' || 
            (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="text-2xl font-bold text-gray-800 dark:text-white">EchoPost</div>
                    
                    {/* Mobile menu button */}
                    <button 
                        className="md:hidden p-2" 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>

                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Home</Link>
                        <Link href="/articles" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Articles</Link>
                        <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">About</Link>
                        <button onClick={toggleDarkMode} className="text-gray-600 dark:text-gray-300">
                            <span className="dark:hidden">🌙</span>
                            <span className="hidden dark:inline">☀️</span>
                        </button>
                        
                        {/* Profile Dropdown Component */}
                        {auth.user ? (<ProfileDropdown 
                            isOpen={isProfileDropdownOpen} 
                            setIsOpen={setIsProfileDropdownOpen} 
                        />) : (
                            <Link href="/login" className="bg-blue-500 text-white hover:bg-blue-600 rounded px-4 py-2">
                                Login
                            </Link>
                        )}
                        
                    </div>
                </div>

                {/* Mobile menu */}
                <div className={`md:hidden pb-4 ${isMobileMenuOpen ? '' : 'hidden'}`}>
                    <Link href="/" className="block py-2 text-gray-600 dark:text-gray-300">Home</Link>
                    <Link href="/articles" className="block py-2 text-gray-600 dark:text-gray-300">Articles</Link>
                    <Link href="/about" className="block py-2 text-gray-600 dark:text-gray-300">About</Link>
                    {auth.user ? (
                        <>
                            <Link href={`/profile/${auth.user.id}`} className="block py-2 text-gray-600 dark:text-gray-300">Profile</Link>
                            <Link href="/articles/create" className="block py-2 text-gray-600 dark:text-gray-300">New Article</Link>
                            <Link href="/logout" className="block py-2 text-red-600 dark:text-red-400">Logout</Link>
                        </>
                    ) : (<>
                    <Link href="/login" className="block py-2 text-red-600 dark:text-red-400">Login</Link>
                    </>)}
                    
                    <button onClick={toggleDarkMode} className="w-full text-left py-2 text-gray-600 dark:text-gray-300">
                        <span className="dark:hidden">Switch to Dark Mode</span>
                        <span className="hidden dark:inline">Switch to Light Mode</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}