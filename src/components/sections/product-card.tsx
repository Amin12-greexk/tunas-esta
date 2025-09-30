// src/components/product-card.tsx
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  nama: string;
  deskripsi: string;
  grade: string;
  fotoUrl?: string;
  spesifikasi?: string[];
  slug?: { current: string };
};

export function ProductCard({ nama, deskripsi, grade, fotoUrl, spesifikasi, slug }: ProductCardProps) {
  return (
    <div className="group rounded-xl border bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <Link href={slug ? `/produk/${slug.current}` : '#'}>
        <div className="relative aspect-square overflow-hidden rounded-t-xl bg-gradient-to-br from-zinc-100 to-zinc-200">
          {fotoUrl ? (
            <Image
              src={fotoUrl}
              alt={nama}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-zinc-400">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          )}
          {/* Grade Badge */}
          <div className="absolute top-4 right-4">
            <div className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
              <span className="text-sm font-bold text-brand-600">
                Grade {grade}
              </span>
            </div>
          </div>
        </div>
      </Link>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold group-hover:text-brand-600 transition-colors mb-2">{nama}</h3>
        <p className="text-sm text-brand-600 font-medium mb-2">Grade {grade}</p>
        <p className="text-sm text-zinc-600 mb-4 line-clamp-2">{deskripsi}</p>
        
        {spesifikasi && spesifikasi.length > 0 && (
          <ul className="mt-3 space-y-1 text-sm text-zinc-700">
            {spesifikasi.slice(0, 3).map((spec, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-brand-600 mt-0.5">•</span>
                <span className="line-clamp-1">{spec}</span>
              </li>
            ))}
            {spesifikasi.length > 3 && (
              <li className="text-zinc-500 text-xs">+{spesifikasi.length - 3} more</li>
            )}
          </ul>
        )}
        
        <Link 
          href={slug ? `/produk/${slug.current}` : '#'}
          className="inline-flex items-center gap-2 mt-4 text-brand-600 hover:text-brand-700 font-semibold transition-colors"
        >
          View Details
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}