import { groq } from "next-sanity";

export const qSettings = groq`*[_type=="settings"][0]`;
export const qHero = groq`*[_type=="hero"][0]`;
