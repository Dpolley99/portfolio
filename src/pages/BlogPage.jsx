import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, ArrowRight, Search, X, Grid3x3, List } from 'lucide-react';
import { getAllBlogPosts } from '../utils/blogLoader';

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState(() => {
    // Load saved preference from localStorage, default to 'list'
    return localStorage.getItem('blogViewMode') || 'list';
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    async function loadPosts() {
      try {
        const allPosts = await getAllBlogPosts();
        setPosts(allPosts);
        setFilteredPosts(allPosts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPosts(posts);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = posts.filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(query);
        const excerptMatch = post.excerpt?.toLowerCase().includes(query);
        const tagsMatch = post.tags?.some((tag) => tag.toLowerCase().includes(query));
        
        return titleMatch || excerptMatch || tagsMatch;
      });
      setFilteredPosts(filtered);
    }
  }, [searchQuery, posts]);

  useEffect(() => {
    // Save view mode preference to localStorage whenever it changes
    localStorage.setItem('blogViewMode', viewMode);
  }, [viewMode]);

  const clearSearch = () => {
    setSearchQuery('');
  };

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

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
           Markups and Musings
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animation-delay-100 text-secondary-foreground">
            Blog{" "}
            <span className="font-serif italic font-normal text-white">
              Posts
            </span>
          </h1>
          <p className="text-muted-foreground mb-4 text-center animation-delay-150 max-w-3xl mx-auto italic text-xs">
            "Every line of code, every idea explored, and every experiment attempted tells a story—some triumphant, some flawed, but all worth remembering."
          </p>
          <p className="text-muted-foreground mb-2 text-justify animation-delay-200 max-w-3xl mx-auto text-sm">
            Welcome to Markup and Musings—a space where ideas, experiments, and reflections live side by side. Here, I explore what building, breaking, and learning have meant to me along the way.
          </p>
          <p className="text-muted-foreground mb-2 text-justify animation-delay-200 max-w-3xl mx-auto text-sm">
            Many of the projects you’ll read about reached completion, but the most instructive moments often came from constraints, mistakes, and dead ends—the points where growth happens quietly yet profoundly.
          </p>
          <p className="text-muted-foreground mb-2 text-justify animation-delay-200 max-w-3xl mx-auto text-sm">
            I write about software development through end-to-end projects, capturing design decisions, trade-offs, and the subtle details that only reveal their significance over time. Some posts are technical, others reflective—but all are rooted in the act of creating and experimenting.
          </p>
          <p className="text-muted-foreground mb-2 text-justify animation-delay-200 max-w-3xl mx-auto text-sm">
            Over time, this space has expanded beyond code to include product thinking, startup experiments, and the lessons hidden in both success and failure. The goal isn’t polished outcomes—it’s a clear record of reasoning, insight, and curiosity in motion.
          </p>
        </div>

        {/* Search Bar and View Toggle */}
        <div className="mb-12 animate-fade-in animation-delay-300">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between max-w-4xl mx-auto mb-4">
            {/* Search Bar */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by title, content, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-primary/10 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-5 h-5 text-muted-foreground hover:text-primary" />
                </button>
              )}
            </div>

            {/* View Toggle */}
            <div className="flex gap-2 glass rounded-xl p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-label="List view"
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-label="Grid view"
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Results Count */}
          {searchQuery && (
            <p className="text-center text-sm text-muted-foreground mt-4">
              Found {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
            </p>
          )}
        </div>

        {/* Blog Posts */}
        {filteredPosts.length === 0 ? (
          <div className="text-center text-muted-foreground">
            {searchQuery 
              ? `No posts found for "${searchQuery}". Try a different search term.`
              : "No blog posts yet. Check back soon!"}
          </div>
        ) : (
          <>
            {/* List View */}
            {viewMode === 'list' && (
              <div className="space-y-8 max-w-4xl mx-auto">
                {filteredPosts.map((post, index) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="block animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <article className="glass rounded-2xl p-8 border border-primary/30 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:glow-border">
                      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>

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

                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>

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

                      <div className="flex items-center gap-2 text-primary font-medium group">
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}

            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post, index) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="block animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <article className="glass rounded-2xl p-6 border border-primary/30 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:glow-border h-full flex flex-col">
                      <h2 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </time>
                      </div>

                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>

                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 text-xs bg-surface px-2 py-1 rounded-full text-muted-foreground"
                            >
                              <Tag className="w-3 h-3" />
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="text-xs text-muted-foreground">
                              +{post.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-primary font-medium text-sm">
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default BlogPage;