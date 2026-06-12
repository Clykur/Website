import { blogPosts0107 } from "@/lib/blog/articles/posts-01-07";
import { blogPosts0814 } from "@/lib/blog/articles/posts-08-14";
import { blogPosts1520 } from "@/lib/blog/articles/posts-15-20";
import type { BlogPost } from "@/lib/blog/types";

export const ALL_BLOG_POSTS: BlogPost[] = [
  ...blogPosts0107,
  ...blogPosts0814,
  ...blogPosts1520,
].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
