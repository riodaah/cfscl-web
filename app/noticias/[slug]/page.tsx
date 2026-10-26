import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Photo from "@/components/Photo";
import JsonLd from "@/components/JsonLd";
import { ContactSection } from "@/components/Sections";
import { posts, formatDate } from "@/lib/news";
import { site, social } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  const url = `/noticias/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    ...social({ url, title: post.title, description: post.excerpt, type: "article" }),
  };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: post.title,
          datePublished: post.date,
          image: `${site.url}/media/${post.image}.webp`,
          publisher: { "@type": "Organization", name: "CFS Central Frutícola Sur", logo: { "@type": "ImageObject", url: `${site.url}/media/logo.png` } },
        }}
      />
      <article className="wrap max-w-4xl pt-10 pb-24">
        <Link href="/noticias" className="text-sm font-semibold text-verde underline underline-offset-4">Todas las noticias</Link>
        <p className="mt-8 text-niebla">
          <time dateTime={post.date}>{formatDate(post.date)}</time> — {post.tag}
        </p>
        <h1 className="mt-3 display-lg">{post.title}</h1>
        <Photo name={post.image} alt="Afiche de Asia Fruit Logistica 2025, Hong Kong" priority className="mt-10 aspect-[1179/756] rounded-3xl" sizes="(min-width:896px) 896px, 100vw" />
        <div className="prose-cfs mt-10 max-w-[68ch] text-lg leading-relaxed">
          {post.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>
      <ContactSection />
    </>
  );
}
