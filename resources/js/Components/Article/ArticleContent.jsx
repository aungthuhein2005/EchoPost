export default function ArticleContent({ content }) {
    return (
        <div className="prose prose-lg dark:prose-invert max-w-none">
            {/* This would be your article content, potentially rendered from markdown */}
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
}