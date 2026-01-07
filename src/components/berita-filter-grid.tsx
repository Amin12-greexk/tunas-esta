"use client";

import { useEffect, useMemo, useState } from "react";
import { NewsCard } from "./news-card";
import { useI18n } from "@/lib/i18n";

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

function normalizeTag(input: string) {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function matchCategory(tags: string[] | undefined, category: string) {
  if (!tags?.length) return false;
  const target = normalizeTag(category);
  return tags.some(tag => normalizeTag(tag).includes(target));
}

export function BeritaFilterGrid({ items }: { items: Article[] }) {
  const { t } = useI18n();
  const categories: Category[] = useMemo(
    () => [
      { label: t("news.filter.all", "Semua"), value: "all" },
      { label: t("news.filter.company", "Berita Perusahaan"), value: "company news" },
      { label: t("news.filter.industry", "Industri"), value: "industry" },
      { label: t("news.filter.export", "Ekspor"), value: "export" },
      { label: t("news.filter.certification", "Sertifikasi"), value: "certification" },
      { label: t("news.filter.events", "Acara"), value: "events" },
    ],
    [t],
  );
  const [active, setActive] = useState<Category>(categories[0]);

  useEffect(() => {
    setActive(categories[0]);
  }, [categories]);

  const filtered = useMemo(() => {
    if (active.value === "all") return items;
    return items.filter(item => matchCategory(item.tags, active.value));
  }, [active.value, items]);

  return (
    <div className="space-y-12">
      {/* Categories Filter */}
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map(category => {
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
          <h3 className="text-lg font-semibold text-zinc-700">
            {t("news.filter.empty.title", "Belum ada berita untuk kategori ini")}
          </h3>
          <p className="text-zinc-500 text-sm">
            {t("news.filter.empty.desc", "Pilih kategori lain untuk melihat berita")}
          </p>
        </div>
      )}
    </div>
  );
}
