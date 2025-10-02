// src/sanity/lib/live.ts
import { defineLive } from "next-sanity/live";
// Ubah baris ini:
// import { client } from "./client";
import { sanityClient } from "./client";

export const { sanityFetch, SanityLive } = defineLive({
  client: sanityClient,
});
