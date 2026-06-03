import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog/posts";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { HubPageView } from "@/components/seo/hub-page";
import { storySurfaceCardClass } from "@/components/layout/story-page-shell";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog",
  description:
    "Clykur blog: MVP development, Next.js for SaaS, product engineering, and how we build Cusown.",
  path: "/blog",
});

export default function BlogIndexPage() {
  return (
    <HubPageView
      page={{
        path: "/blog",
        title: "Blog",
        description:
          "Insights on product engineering, MVPs, and modern web development.",
        h1: "Blog",
        lede: "Practical guides for founders and product teams, SEO-ready and written for humans and AI search.",
        sections: [],
      }}
    >
      <ul className="space-y-4">
        {BLOG_POSTS.map((post) => (
          <li key={post.slug}>
            <article className={storySurfaceCardClass + " p-5 md:p-6"}>
              <h2 className="text-lg font-semibold text-foreground">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-[#ff3b1f]"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-[14px] text-foreground/55">
                {post.description}
              </p>
              <p className="mt-3 text-[12px] uppercase tracking-[0.14em] text-foreground/40">
                {post.datePublished} · {post.readingMinutes} min read
              </p>
            </article>
          </li>
        ))}
      </ul>
    </HubPageView>
  );
}
