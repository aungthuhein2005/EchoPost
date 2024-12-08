export function calculateReadTime(content) {
    // Average reading speed (words per minute)
    const wordsPerMinute = 200;
    
    // Count words in the content
    // Remove HTML tags and count words
    const words = content
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .split(/\s+/)
        .filter(word => word.length > 0)
        .length;
    
    // Calculate reading time in minutes
    const readTime = Math.ceil(words / wordsPerMinute);
    
    return `${readTime} min read`;
}