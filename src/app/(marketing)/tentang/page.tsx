import { fetchSanity } from "@/lib/sanity.client";
import { qPageBySlug } from "@/lib/sanity.queries";
import { PortableText } from "@portabletext/react";

export default async function TentangPage() {
  const data = await fetchSanity<any>(qPageBySlug, { slug: "tentang" });

  if (!data) {
    return (
      <main className="container py-16">
        <h1 className="text-3xl font-bold">Tentang Kami</h1>
        <p className="mt-4 text-zinc-600">Konten belum tersedia di CMS.</p>
      </main>
    );
  }

  return (
    <main className="container py-16 prose max-w-3xl">
      <h1>{data.title}</h1>
      <PortableText value={data.body} />
    </main>
  );
}
