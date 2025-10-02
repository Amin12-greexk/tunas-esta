import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: "2023-10-01",
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN,
});

export async function fetchSanity<T>(
  query: string,
  params: Record<string, unknown> = {},
  // nilai ini hanya “diteruskan” ke page (lihat catatan di bawah)
  _revalidate = 60
): Promise<T> {
  // Sanity client tidak mengenal `next`, jadi jangan dipaksakan.
  // Kalau ingin kontrol ISR, pakai `export const revalidate = ...` di file page-nya.
  return sanityClient.fetch<T>(query, params, {
    // Properti `cache` valid (bagian dari RequestInit)
    cache: "force-cache",
  });
}

export const client = sanityClient;
