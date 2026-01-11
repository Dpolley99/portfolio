import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import { getAllBlogPosts } from '../utils/blogLoader';

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const allPosts = await getAllBlogPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-muted-foreground">Loading posts...</div>
      </div>
    );
  }

  return (
    <section className="py-32 relative min-h-screen">
      <div className="absolute top-1/2 left-1/2 w-150 h-120 bg-highlight/7 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
            My Writing
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animation-delay-100 text-secondary-foreground">
            Blog{" "}
            <span className="font-serif italic font-normal text-white">
              Posts
            </span>
          </h1>
          <p className="text-muted-foreground animation-delay-200">
            Thoughts, tutorials, and insights on web development and technology.
          </p>
        </div>

        {/* Blog Posts List */}
        {posts.length === 0 ? (
          <div className="text-center text-muted-foreground">
            No blog posts yet. Check back soon!
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post, index) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="block animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <article className="glass rounded-2xl p-8 border border-primary/30 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:glow-border">
                  {/* Post Title */}
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  {/* Post Meta */}
                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
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

                  {/* Excerpt */}
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
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

                  {/* Read More Link */}
                  <div className="flex items-center gap-2 text-primary font-medium group">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default BlogPage;