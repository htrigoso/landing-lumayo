import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog/types";
import { services } from "@/lib/site";

type PostCardProps = {
  post: BlogPost;
};

/** Article teaser. The title link stretches over the whole card. */
export function PostCard({ post }: PostCardProps) {
  const cover = services.find((s) => s.id === post.coverServiceId)?.image;

  return (
    <article
      className="group relative isolate flex min-w-0 flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-[0_18px_40px_-28px_color-mix(in_srgb,var(--color-azul-950)_40%,transparent)]"
    >
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-sky-100">
        {cover && (
          <Image
            src={cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 24rem, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3 text-sm text-ink-600">
          <span className="pill w-fit">{post.category}</span>
          <span>{post.readingMinutes} min de lectura</span>
        </div>
        <h3 className="mt-4 font-display text-xl font-bold leading-snug text-navy-700 sm:text-2xl">
          <Link
            href={`/blog/${post.slug}`}
            className="rounded-md after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-pretty leading-relaxed text-ink-600">{post.excerpt}</p>
      </div>
    </article>
  );
}
