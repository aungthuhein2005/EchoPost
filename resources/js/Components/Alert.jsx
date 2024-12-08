import React, { useState } from 'react';

const Alert = ({ message, type }) => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible || !message) return null; // Don't render if dismissed or there's no message

    const alertClasses = {
        success: 'bg-green-100 border-green-400 text-green-700',
        error: 'bg-red-100 border-red-400 text-red-700',
    };

    return (
        <div className={`flex items-start border-l-4 p-4 my-2 ${alertClasses[type]} rounded relative`} role="alert">
            <div className="flex-1">
                <strong className="font-bold mr-2">{type === 'error' ? 'Error!' : 'Success!'}</strong>
                <span className="block sm:inline">{message}</span>
            </div>
            <button
                onClick={() => setIsVisible(false)}
                className="absolute top-0 right-0 mt-2 mr-2 text-lg font-semibold text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Close"
            >
                ×
            </button>
        </div>
    );
};

export default Alert;
