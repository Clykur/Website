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
      contentWidth="wide"
      showSectionDivider={false}
      mainClassName="!pt-0"
    >
      <ul className="flex w-full min-w-0 flex-col gap-6 md:gap-8 lg:gap-10">
        {BLOG_POSTS.map((post) => (
          <li key={post.slug}>
            <article className={storySurfaceCardClass + " p-6 md:p-8 lg:p-10"}>
              <h2 className="font-poppins text-xl font-medium tracking-[-0.02em] text-foreground md:text-2xl">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-[#ff3b1f]"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 max-w-4xl text-[15px] leading-relaxed text-foreground/58 md:text-base">
                {post.description}
              </p>
              <p className="mt-4 text-[12px] uppercase tracking-[0.14em] text-foreground/40">
                {post.datePublished} · {post.readingMinutes} min read
              </p>
            </article>
          </li>
        ))}
      </ul>
    </HubPageView>
  );
}
