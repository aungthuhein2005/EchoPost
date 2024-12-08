import React, { useState, useRef } from "react";
import MainLayout from "@/Layouts/MainLayout";
import { usePage,router } from "@inertiajs/react";

const EditProfile = () => {
    const { auth } = usePage().props;
    const [formData, setFormData] = useState({
        full_name: auth.user.full_name,
        username: auth.user.username,
        bio: auth.user.bio,
        email: auth.user.email,
        avatar_url: auth.user.avatar_url
    });
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'echo_post');

            try {
                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/dmuaggg9o/image/upload`,
                    {
                        method: 'POST',
                        body: formData
                    }
                );
                const data = await response.json();
                setImage(data.secure_url);
                setFormData((prevData) => ({
                    ...prevData,
                    avatar_url: data.secure_url,
                }));
            } catch (error) {
                console.error('Upload failed:', error);
                return;
            }
            setImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit formData to the server
        console.log("Submitting:", formData);
        // Add your submission logic here (e.g., API call)
        router.post(`/profile/${auth.user.id}`,formData,{
            onSuccess: () => {
                console.log("success");
                
            },
            onError: (error) => {
                console.log("fail",error);
                
            }
        })
    };

    return (
        <MainLayout>
            <div className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Edit Profile
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                <div className ="flex items-center justify-center">
                <div className="relative">
                            <img
                            
                                src={formData.avatar_url || `https://via.placeholder.com/150/000000/FFFFFF/?text=${auth.user.full_name.charAt(0)}`}
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700"
                            />
                            <button 
                                type="button" 
                                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
                                onClick={() => document.getElementById('fileInput').click()}
                            >
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
                            </button>
                            <input 
                                id="fileInput"
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageChange}
                                className="absolute bottom-0 right-0 opacity-0 cursor-pointer"
                            />
                        </div>
                </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300" htmlFor="fullName">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullname"
                            value={formData.full_name}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300" htmlFor="bio">
                            Bio
                        </label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2"
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </MainLayout>
    );
};

export default EditProfile;