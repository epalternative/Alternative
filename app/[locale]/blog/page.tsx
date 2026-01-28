import { getAllPostsAsync } from '@/lib/blog';
import { BlogPageClient } from '@/components/blog/BlogPageClient';

export default async function BlogPage() {
  const posts = await getAllPostsAsync();
  return <BlogPageClient initialPosts={posts} />;
}
