import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CtaBand, PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { blogPosts } from "@/lib/site-data";
import { absoluteUrl, canonical, ldScript, pageGraph, pageMeta } from "@/lib/seo";

const title = "Radon Blog | Ohio Radon Levels, Testing & Mitigation";
const description =
  "Practical guides on radon testing, how mitigation systems work, radon levels across Ohio and Cincinnati, and what homebuyers should know before closing.";

/* Unlisted section: still live, deliberately out of the nav, the sitemap and
   every inbound link. See the note on ROUTES.blog in lib/routes.ts. */
export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: pageMeta({ title, description, path: "/blog", noindex: true }),
    links: canonical("/blog"),
    scripts: [
      ldScript(
        pageGraph({
          path: "/blog",
          name: title,
          description,
          type: "CollectionPage",
          crumbs: [{ name: "Blog", path: "/blog" }],
          itemList: blogPosts.map((p) => ({
            name: p.title,
            url: absoluteUrl(`/blog/${p.slug}`),
          })),
        }),
      ),
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Radon, explained for Cincinnati homeowners"
        subtitle="Guides written by the people who install the systems. No fear marketing, no filler."
        crumbs={[{ name: "Blog", path: "/blog" }]}
      />
      <section className="section-y">
        <div className="container-page grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.06} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  width={1200}
                  height={800}
                  className="aspect-3/2 w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold tracking-widest text-brand uppercase">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    · {post.readingTime}
                  </p>
                  <h2 className="mt-3 text-lg font-bold text-navy">{post.title}</h2>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {post.description}
                  </p>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:gap-2.5"
                  >
                    Read article
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
