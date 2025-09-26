import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "g022i6r9", // ganti sesuai projectId Anda
  dataset: "production",
  apiVersion: "2023-10-01", // bebas pilih versi terbaru
  useCdn: true, // true = cache cepat, false = data real-time
});

export async function fetchSanity<T>(
  query: string,
  params: Record<string, unknown> = {},
  revalidate = 60
) {
  return sanityClient.fetch<T>(query, params, {
    cache: "force-cache",
    next: { revalidate },
  } as any);
}
