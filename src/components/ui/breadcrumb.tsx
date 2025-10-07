// src/components/ui/breadcrumb.tsx
"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  title: string;
  href?: string;
  current?: boolean;
};

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: React.ComponentType<{ className?: string }>;
  showHome?: boolean;
}

export function Breadcrumb({ 
  items, 
  className,
  separator: Separator = ChevronRight,
  showHome = true
}: BreadcrumbProps) {
  // Tambahkan home item jika showHome true dan belum ada
  const allItems = showHome && items[0]?.title !== "Home" 
    ? [{ title: "Home", href: "/" }, ...items]
    : items;

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={cn("flex items-center space-x-1 text-sm text-gray-500", className)}
    >
      <ol className="flex items-center space-x-1">
        {allItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <Separator className="w-4 h-4 mx-2 text-gray-400" aria-hidden="true" />
            )}
            
            {item.current || !item.href ? (
              <span 
                className="font-medium text-gray-900 flex items-center gap-2"
                aria-current="page"
              >
                {index === 0 && showHome && <Home className="w-4 h-4" />}
                {item.title}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-green-600 transition-colors flex items-center gap-2 hover:underline"
              >
                {index === 0 && showHome && <Home className="w-4 h-4" />}
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Komponen untuk structured data (SEO)
export function BreadcrumbStructuredData({ items }: { items: BreadcrumbItem[] }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.title,
      ...(item.href && { "item": `${process.env.NEXT_PUBLIC_SITE_URL || ''}${item.href}` })
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}