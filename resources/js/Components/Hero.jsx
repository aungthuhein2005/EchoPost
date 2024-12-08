export default function Hero() {
    return (
        <div className="relative bg-gray-900 dark:bg-black py-16 sm:py-24">
            <div className="absolute inset-0">
                <img 
                    src="https://images.unsplash.com/photo-1499750310107-5fef28a66643" 
                    alt="Hero background" 
                    className="w-full h-full object-cover opacity-40"
                />
            </div>
            
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <span className="text-blue-400 dark:text-blue-300 font-semibold text-base sm:text-lg mb-2 block">
                        Welcome to
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
                        Discover Insights & Stories from Tech World
                    </h1>
                    {/* ... rest of the hero content ... */}
                </div>
            </div>
        </div>
    );
}