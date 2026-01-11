import grayMatter from 'gray-matter';

// This will be used to dynamically import all blog posts
const blogModules = import.meta.glob('../data/blog/*.md', { 
  query: '?raw', 
  import: 'default' 
});

export async function getAllBlogPosts() {
  const posts = [];
  
  for (const path in blogModules) {
    const content = await blogModules[path]();
    const { data, content: markdown } = grayMatter(content);
    
    posts.push({
      ...data,
      content: markdown,
      slug: path.split('/').pop().replace('.md', '')
    });
  }
  
  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getBlogPost(slug) {
  const path = `../data/blog/${slug}.md`;
  const module = blogModules[path];
  
  if (!module) return null;
  
  const content = await module();
  const { data, content: markdown } = grayMatter(content);
  
  return {
    ...data,
    content: markdown,
    slug
  };
}