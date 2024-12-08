import React, { useState, useRef } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { router, usePage } from '@inertiajs/react';
import Alert from '@/Components/Alert';

function CreateArticle({categories, tags: availableTags}) {

    const {auth} = usePage().props;
    const {user} = auth;
    const [errors,setErros] = useState({});
    console.log(user);
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const [processing, setProcessing] = useState(false);

    // Quill modules configuration
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'color': [] }, { 'background': [] }],
            ['link', 'image', 'code-block'],
            ['clean']
        ]
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add('border-blue-500');
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('border-blue-500');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('border-blue-500');
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };

    const handleSubmit = async (e, isDraft = false) => {
        e.preventDefault();
        setProcessing(true);

        let imageUrl = null;
        if (fileInputRef.current?.files[0]) {
            const formData = new FormData();
            formData.append('file', fileInputRef.current.files[0]);
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
                imageUrl = data.secure_url;
            } catch (error) {
                console.error('Upload failed:', error);
                setProcessing(false);
                return;
            }
        }

        router.post('/articles', {
            
            title,
            content,
            status: isDraft ? 'draft' : 'published',
            categories: category,
            tags: selectedTags,
            slug: generateSlug(title),
            featured_image: imageUrl,
            author_id: user.id
        }, {
            onSuccess: () => {
                // Handle success
            },
            onError: (errors) => {
                console.error(errors);
                setErros(errors);
                setProcessing(false);
            }
        });
    };

    return (
        <MainLayout>
            <div className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Create New Article</h1>
                {Object.keys(errors).map((field, index) => (
                    <Alert key={index} type="error" message={errors[field]} />
                ))}
                <form className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="lg:w-2/3 space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                placeholder="Enter article title"
                            />
                        </div>

                        {/* Featured Image Upload */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Featured Image</h3>
                            <div
                                id="image-upload-container"
                                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg"
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                {imagePreview ? (
                                    <div className="p-4">
                                        <div className="relative">
                                            <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
                                            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                                                <div className="flex gap-4">
                                                    <button
                                                        type="button"
                                                        onClick={removeImage}
                                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                                            </svg>
                                                            Remove
                                                        </div>
                                                    </button>
                                                    <label
                                                        htmlFor="featured-image"
                                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                                            </svg>
                                                            Change
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <label
                                        htmlFor="featured-image"
                                        className="flex flex-col items-center justify-center p-8 cursor-pointer"
                                    >
                                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                        </svg>
                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </label>
                                )}
                                <input
                                    type="file"
                                    id="featured-image"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </div>
                        </div>

                        {/* Content Editor */}
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">Content</label>
                            <ReactQuill
                                theme="snow"
                                value={content}
                                onChange={setContent}
                                modules={modules}
                                className="bg-white dark:bg-gray-800 rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-1/3 space-y-6">
                        {/* Category */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Category</h3>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Tags */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tags</h3>
                            <div className="relative">
                                <select
                                    multiple
                                    value={selectedTags}
                                    onChange={(e) => {
                                        const values = Array.from(
                                            e.target.selectedOptions,
                                            option => option.value
                                        );
                                        setSelectedTags(values);
                                    }}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                >
                                    {availableTags.map((tag) => (
                                        <option key={tag.id} value={tag.id}>
                                            {tag.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            {/* Selected tags display */}
                            <div className="mt-4 flex flex-wrap gap-2">
                                {selectedTags.map((tagId) => {
                                    const tag = availableTags.find(t => t.id === parseInt(tagId));
                                    return (
                                        <span key={tagId} className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm">
                                            {tag?.name}
                                            <button
                                                type="button"
                                                onClick={() => setSelectedTags(selectedTags.filter(id => id !== tagId))}
                                                className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Publish Options */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Publish</h3>
                            <div className="space-y-4">
                                <button
                                    type="button"
                                    onClick={(e) => handleSubmit(e, true)}
                                    disabled={processing}
                                    className="w-full px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white disabled:opacity-50"
                                >
                                    {processing ? 'Saving...' : 'Save as Draft'}
                                </button>
                                <button
                                    type="button"
                                    onClick={(e) => handleSubmit(e, false)}
                                    disabled={processing}
                                    className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {processing ? 'Publishing...' : 'Publish'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}

export default CreateArticle;