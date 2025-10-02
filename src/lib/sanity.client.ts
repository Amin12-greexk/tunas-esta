import { createClient, type ClientConfig } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "g022i6r9",
  dataset: "production",
  apiVersion: "2023-10-01",
  useCdn: true,
});

export async function fetchSanity<T>(
  query: string,
  params: Record<string, unknown> = {},
  revalidate = 60
): Promise<T> {
  return sanityClient.fetch<T>(query, params, {
    cache: "force-cache",
    next: { revalidate },
  });
}
