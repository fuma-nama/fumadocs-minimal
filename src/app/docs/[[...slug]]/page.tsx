import { source } from "@/lib/source";
import Link from "fumadocs-core/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) notFound();
  const Mdx = page.data.body;

  return (
    <article className="prose dark:prose-invert">
      <h1>{page.data.title}</h1>
      <Mdx
        components={{
          a: Link,
          img: Image,
        }}
      />
    </article>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}
