import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CtaBand, pageHeroBanner } from "@/components/site/PageHero";
import { blogPosts } from "@/lib/site-data";
import { canonical, ldScript, pageGraph, pageMeta } from "@/lib/seo";
import { ROUTES } from "@/lib/routes";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article unavailable" }, { name: "robots", content: "noindex" }],
      };
    }
    const { post } = loaderData;
    return {
      meta: pageMeta({
        // The brand suffix pushed every post title past the ~60 char SERP cut.
        // Brand is already carried by og:site_name and Google's own domain
        // suffixing, so it costs nothing to drop. seoTitle keeps the <h1> free
        // to stay long and editorial.
        title: post.seoTitle ?? post.title,
        description: post.description,
        path: `/blog/${params.slug}`,
        type: "article",
        // Unlisted section. See the note on ROUTES.blog in lib/routes.ts.
        noindex: true,
      }),
      links: canonical(`/blog/${params.slug}`),
      scripts: [
        ldScript(
          pageGraph({
            path: `/blog/${params.slug}`,
            name: post.title,
            description: post.description,
            crumbs: [
              { name: "Blog", path: "/blog" },
              { name: post.title, path: `/blog/${params.slug}` },
            ],
            primaryImage: post.image,
            article: {
              headline: post.title,
              datePublished: post.date,
              image: post.image,
            },
          }),
        ),
      ],
    };
  },
  component: Page,
});

function Page() {
  const { post } = Route.useLoaderData();

  // Every post previously dead-ended: nothing linked post to post, so four of
  // the five were reachable only from /blog. Take the next two in publication
  // order, wrapping, so each post links onward and every post gets inbound
  // links without hand-maintaining a mapping.
  const index = blogPosts.findIndex((p) => p.slug === post.slug);
  const keepReading =
    index === -1
      ? []
      : [1, 2].map((offset) => blogPosts[(index + offset) % blogPosts.length]!).filter((p) => p.slug !== post.slug);

  return (
    <>
      <article>
        <header className="relative overflow-hidden bg-navy text-navy-foreground">
          <img
            src={pageHeroBanner}
            alt=""
            width={1920}
            height={600}
            fetchPriority="high"
            className="absolute inset-0 size-full object-cover"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-linear-to-r from-navy/90 via-navy/80 to-navy/60"
          />
          <div className="container-page relative py-16 md:py-20">
            <nav aria-label="Breadcrumb" className="mb-6 text-xs font-semibold text-navy-foreground/60">
              <Link to="/" className="hover:text-navy-foreground">
                Home
              </Link>
              <span aria-hidden="true"> / </span>
              <Link to="/blog" className="hover:text-navy-foreground">
                Blog
              </Link>
            </nav>
            <p className="text-xs font-bold tracking-widest uppercase">
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}{" "}
              · {post.readingTime}
            </p>
            <h1 className="mt-5 max-w-3xl text-3xl font-extrabold md:text-5xl">{post.title}</h1>
            <p className="mt-5 max-w-2xl text-navy-foreground/75">{post.description}</p>
          </div>
        </header>

        <div className="container-page py-14 md:py-20">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            width={1200}
            height={800}
            className="aspect-16/9 w-full rounded-3xl object-cover shadow-lift"
          />
          <div className="mx-auto mt-12 max-w-3xl">
            {post.body.map((section) => (
              <section key={section.heading} className="mb-10">
                <h2 className="text-2xl font-extrabold text-navy">{section.heading}</h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 32)}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
            <p className="text-sm text-muted-foreground">
              Questions about your own home?{" "}
              <Link to="/contact" className="font-bold text-brand hover:underline">
                Request a free estimate
              </Link>{" "}
              , or read more about{" "}
              <Link to={ROUTES.radonTesting.path} className="font-bold text-brand hover:underline">
                radon testing
              </Link>{" "}
              and{" "}
              <Link
                to={ROUTES.radonMitigation.path}
                className="font-bold text-brand hover:underline"
              >
                radon mitigation systems
              </Link>
              .
            </p>

            {keepReading.length > 0 ? (
              <div className="mt-12 border-t border-border pt-8">
                <h2 className="text-lg font-bold text-navy">Keep reading</h2>
                <ul className="mt-4 space-y-3">
                  {keepReading.map((other) => (
                    <li key={other.slug}>
                      <Link
                        to="/blog/$slug"
                        params={{ slug: other.slug }}
                        className="font-semibold text-brand hover:underline"
                      >
                        {other.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </article>
      <CtaBand />
    </>
  );
}
