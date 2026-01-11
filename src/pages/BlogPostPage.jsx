import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getBlogPost } from '../utils/blogLoader';

function BlogPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      try {
        const blogPost = await getBlogPost(id);
        setPost(blogPost);
      } catch (error) {
        console.error('Error loading blog post:', error);
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-muted-foreground">Loading post...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="text-xl text-muted-foreground">Post not found</div>
        <Link to="/blog" className="text-primary hover:text-primary/80">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <section className="py-32 relative min-h-screen">
      <div className="absolute top-1/2 left-1/2 w-150 h-120 bg-highlight/7 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <article className="container mx-auto px-6 relative z-10 max-w-3xl">
        {/* Back Button */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors animate-fade-in"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Post Header */}
        <header className="mb-12 animate-fade-in animation-delay-100">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            {post.title}
          </h1>

          {/* Post Meta */}
          <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-xs bg-surface px-3 py-1 rounded-full text-muted-foreground"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Post Content */}
        <div className="glass rounded-2xl p-8 md:p-12 border border-primary/30 animate-fade-in animation-delay-200">
          <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold mb-4 text-foreground">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold mb-3 mt-8 text-foreground">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-bold mb-2 mt-6 text-foreground">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="mb-4 text-muted-foreground leading-relaxed">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-4 text-muted-foreground space-y-2">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-4 text-muted-foreground space-y-2">{children}</ol>
                ),
                code: ({ inline, children }) =>
                  inline ? (
                    <code className="bg-surface px-2 py-1 rounded text-primary">{children}</code>
                  ) : (
                    <code className="block bg-surface p-4 rounded-lg mb-4 overflow-x-auto text-sm">{children}</code>
                  ),
                a: ({ children, href }) => (
                  <a
                    href={href}
                    className="text-primary hover:text-primary/80 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Back to Blog Link */}
        <div className="mt-12 text-center animate-fade-in animation-delay-300">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Posts
          </Link>
        </div>
      </article>
    </section>
  );
}

export default BlogPostPage;