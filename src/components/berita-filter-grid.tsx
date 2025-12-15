"use client";

import { useMemo, useState } from "react";
import { NewsCard } from "./news-card";

type Article = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverUrl?: string;
  date?: string;
  tags?: string[];
};

type Category = { label: string; value: string };

const CATEGORIES: Category[] = [
  { label: "All", value: "all" },
  { label: "Company News", value: "company news" },
  { label: "Industry", value: "industry" },
  { label: "Export", value: "export" },
  { label: "Certification", value: "certification" },
  { label: "Events", value: "events" },
];

function matchCategory(tags: string[] | undefined, category: string) {
  if (!tags?.length) return false;
  const target = category.toLowerCase();
  return tags.some(tag => tag?.toLowerCase().includes(target));
}

export function BeritaFilterGrid({ items }: { items: Article[] }) {
  const [active, setActive] = useState<Category>(CATEGORIES[0]);

  const filtered = useMemo(() => {
    if (active.value === "all") return items;
    return items.filter(item => matchCategory(item.tags, active.value));
  }, [active.value, items]);

  return (
    <div className="space-y-12">
      {/* Categories Filter */}
      <div className="flex flex-wrap gap-3 justify-center">
        {CATEGORIES.map(category => {
          const isActive = category.value === active.value;
          return (
            <button
              key={category.value}
              type="button"
              onClick={() => setActive(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                isActive
                  ? "bg-brand-600 text-white shadow-lg shadow-brand-500/30"
                  : "bg-white text-zinc-700 hover:bg-brand-50 hover:text-brand-600 border border-zinc-200"
              }`}
              aria-pressed={isActive}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      {/* News Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, index) => (
            <NewsCard key={item._id ?? index} {...item} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-zinc-100 rounded-full">
            <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-zinc-700">Belum ada berita untuk kategori ini</h3>
          <p className="text-zinc-500 text-sm">Pilih kategori lain untuk melihat berita</p>
        </div>
      )}
    </div>
  );
}
