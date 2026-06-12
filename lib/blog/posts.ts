import { ALL_BLOG_POSTS } from "@/lib/blog/articles";
export type { BlogPost } from "@/lib/blog/types";

export const BLOG_POSTS = ALL_BLOG_POSTS;

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getBlogSlugs() {
  return BLOG_POSTS.map((p) => p.slug);
}
