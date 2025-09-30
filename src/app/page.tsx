import { fetchSanity } from "@/lib/sanity.client";
import { qHero } from "@/lib/sanity.queries";
import { Hero } from "@/components/sections/hero";

export default async function HomePage() {
  const hero = await fetchSanity<any>(qHero);

  return (
    <main>
      {hero ? (
        <Hero {...hero} />
      ) : (
        <div className="p-12 text-center text-zinc-500">Belum ada konten Hero</div>
      )}
    </main>
  );
}
