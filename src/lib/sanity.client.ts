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
  revalidate = 60,
  locale: "id" | "en" | "zh" = "id"
): Promise<T> {
  const options =
    typeof window === "undefined"
      ? { cache: "force-cache" as const, next: { revalidate } }
      : { cache: "no-store" as const };

  return sanityClient.fetch<T>(query, { ...params, locale: locale ?? "id", $locale: locale ?? "id" }, options);
}
