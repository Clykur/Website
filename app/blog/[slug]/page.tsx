import Link from "next/link";
import { notFound } from "next/navigation";
import {
  StoryPageBackdrop,
  StoryPageHero,
  StoryPageMain,
  storyBodyProseClass,
  storySectionH2Class,
  storySurfaceCardClass,
} from "@/components/layout/story-page-shell";
import { SeoCta } from "@/components/seo/seo-cta";
import { getBlogPost, getBlogSlugs } from "@/lib/blog/posts";
import { articleSchema } from "@/lib/seo/schemas";
import { buildPageMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return buildPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const path = `/blog/${slug}`;

  const schema = articleSchema({
    title: post.title,
    description: post.description,
    path,
    datePublished: post.datePublished,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <StoryPageBackdrop>
        <StoryPageHero
          titleId="blog-post-heading"
          title={post.title}
          lede={post.description}
          eyebrow="Blog"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title, href: path },
          ]}
          headerExtra={
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/40">
              {post.datePublished} · {post.readingMinutes} min read
            </p>
          }
        />
        <StoryPageMain as="article" width="narrow">
          {post.sections.map((section) => (
            <section key={section.heading} className="mb-8 md:mb-10">
              <div className={storySurfaceCardClass + " p-6 md:p-8"}>
                <h2
                  className={storySectionH2Class + " mb-4 text-xl md:text-2xl"}
                >
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className={"mb-4 last:mb-0 " + storyBodyProseClass}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
          <nav
            aria-label="Related pages"
            className={
              storySurfaceCardClass +
              " mb-10 flex flex-wrap gap-x-4 gap-y-2 p-5 text-[14px] md:p-6"
            }
          >
            <Link
              href="/services"
              className="font-semibold text-[#ff3b1f] hover:underline"
            >
              Services
            </Link>
            <Link
              href="/products"
              className="font-semibold text-[#ff3b1f] hover:underline"
            >
              Products
            </Link>
            <Link
              href="/case-studies"
              className="font-semibold text-[#ff3b1f] hover:underline"
            >
              Case studies
            </Link>
            <Link
              href="/contact"
              className="font-semibold text-[#ff3b1f] hover:underline"
            >
              Contact
            </Link>
          </nav>
          <SeoCta />
        </StoryPageMain>
      </StoryPageBackdrop>
    </>
  );
}
