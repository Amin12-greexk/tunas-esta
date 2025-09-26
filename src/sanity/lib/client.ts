import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: "2023-10-01",
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN, // optional
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
