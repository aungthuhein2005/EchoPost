import { useState } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function MainLayout({ children }) {
    return (
        <div className="bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
}