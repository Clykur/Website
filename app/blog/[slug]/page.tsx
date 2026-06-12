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
import { BlogPostCta } from "@/components/blog/blog-post-cta";
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
          contentWidth="wide"
          showSectionDivider={false}
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
        <StoryPageMain as="article" width="default" className="!pt-0">
          <div className="flex w-full min-w-0 flex-col gap-12 md:gap-14 lg:gap-16">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <div className={storySurfaceCardClass + " p-6 md:p-9 lg:p-10"}>
                  <h2 className={storySectionH2Class + " mb-5 md:mb-6"}>
                    {section.heading}
                  </h2>
                  <div className="max-w-4xl space-y-5">
                    {section.paragraphs.map((p, i) => (
                      <p
                        key={i}
                        className={
                          storyBodyProseClass +
                          " text-[15px] md:text-[17px] md:leading-[1.85]"
                        }
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </section>
            ))}
            <nav
              aria-label="Related pages"
              className={
                storySurfaceCardClass +
                " flex flex-wrap gap-x-4 gap-y-2 p-6 text-[14px] md:p-8"
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
            <BlogPostCta />
            <SeoCta />
          </div>
        </StoryPageMain>
      </StoryPageBackdrop>
    </>
  );
}
