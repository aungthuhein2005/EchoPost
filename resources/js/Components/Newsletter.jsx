export default function Newsletter() {
    return (
        <div className="bg-blue-600 dark:bg-blue-800 py-12 sm:py-16">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Subscribe to our Newsletter</h2>
                <p className="text-blue-100 mb-8">Get the latest posts delivered right to your inbox.</p>
                <div className="max-w-md mx-auto">
                    <form className="flex gap-2">
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="flex-1 px-4 py-2 rounded-lg focus:outline-none"
                        />
                        <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}