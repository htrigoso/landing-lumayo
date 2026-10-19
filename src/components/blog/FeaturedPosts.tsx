import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import type { BlogPost } from "@/lib/blog/types";
import { services } from "@/lib/site";

type FeaturedPostsProps = { posts: BlogPost[] };

/** Bento grid of up to three highlighted articles: one large tile and up to two smaller ones. */
export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (posts.length === 0) return null;

  const [lead, ...others] = posts;

  return (
    <div className="mt-8 lg:mt-10 grid grid-cols-[minmax(0,1fr)] gap-5 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[repeat(2,minmax(17rem,1fr))] lg:gap-6">
      <FeatureTile post={lead} size="lg" className="md:col-span-2 lg:col-span-2 lg:row-span-2" />
      {others.slice(0, 2).map((post) => (
        <FeatureTile key={post.slug} post={post} size="sm" />
      ))}
    </div>
  );
}

function FeatureTile({ post, size, className = "" }: { post: BlogPost; size: "lg" | "sm"; className?: string }) {
  const cover = services.find((s) => s.id === post.coverServiceId)?.image;
  const isLarge = size === "lg";

  return (
    <article
      className={`group relative isolate flex min-w-0 items-end overflow-hidden rounded-3xl bg-navy-900 shadow-[0_30px_60px_-30px_color-mix(in_srgb,var(--color-azul-950)_45%,transparent)] ring-1 ring-navy-900/5 ${
        isLarge ? "min-h-[24rem] sm:min-h-[28rem] lg:h-full lg:min-h-0" : "min-h-[17rem] lg:h-full lg:min-h-0"
      } ${className}`}
    >
      {cover && (
        <Image
          src={cover}
          alt=""
          fill
          priority={isLarge}
          sizes={isLarge ? "(min-width: 1024px) 46rem, 100vw" : "(min-width: 1024px) 23rem, (min-width: 768px) 50vw, 100vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      )}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-navy-900/0" />

      <div className={`relative z-10 w-full min-w-0 p-6 sm:p-8 ${isLarge ? "lg:p-10" : ""}`}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="pill !bg-white !text-navy-700">{post.category}</span>
          <span className="text-sm text-sky-100/90">{post.readingMinutes} min de lectura</span>
        </div>
        <h3
          className={
            isLarge
              ? "mt-4 font-display text-2xl font-extrabold leading-tight text-white text-balance sm:text-3xl lg:text-4xl"
              : "mt-3 font-display text-xl font-bold leading-snug text-white text-balance"
          }
        >
          <Link
            href={`/blog/${post.slug}`}
            className="rounded-md after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {post.title}
          </Link>
        </h3>
        {isLarge && (
          <>
            <p className="mt-3 max-w-2xl text-pretty text-sky-100/90 sm:text-lg">{post.excerpt}</p>
            <span aria-hidden="true" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
              Leer artículo
              <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
            </span>
          </>
        )}
      </div>
    </article>
  );
}
