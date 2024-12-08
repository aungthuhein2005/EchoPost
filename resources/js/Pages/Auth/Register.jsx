import { useForm } from '@inertiajs/inertia-react';
import { router } from '@inertiajs/react';
import React, { useState } from 'react';

export default function Register() {
    const { data, setData, processing } = useForm({
        username: '',
        fullname: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [error, setError] = useState({});

    const submit = async (e) => {
        e.preventDefault();

        router.post('/register', data, {
            onSuccess: (response) => {
                console.log("success", response);
                setError({}); // Clear any existing errors on success
            },
            onError: (errorResponse) => {
                console.log("error", errorResponse);
                setError(errorResponse);
            },
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">EchoPost</h2>


                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
                        />
                        {error.username && (
                            <div className="text-red-500 text-sm">{error.username}</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Fullname</label>
                        <input
                            type="text"
                            value={data.fullname}
                            onChange={(e) => setData('fullname', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
                        />
                        {error.fullname && (
                            <div className="text-red-500 text-sm">{error.fullname}</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
                        />
                        {error.email && (
                            <div className="text-red-500 text-sm">{error.email}</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
                        />
                        {error.password && (
                            <div className="text-red-500 text-sm">{error.password}</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
                        />
                        {error.password_confirmation && (
                            <div className="text-red-500 text-sm">{error.password_confirmation}</div>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Register
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <button className="w-full bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600 transition">
                        Login with Google
                    </button>
                </div>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-500 hover:underline">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
