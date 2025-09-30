"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Grid3x3, Camera } from "lucide-react";
import { sanityPublic } from "@/lib/sanity.client.public";
import { qAllGaleriFoto } from "@/lib/sanity.queries";

type Foto = {
  _id: string;
  caption?: string;
  imageUrl: string;
  album?: { judul?: string; slug?: { current: string } };
  // kalau kamu menambah "category" di GROQ:
  category?: string;
};

type ImageItem = {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  description?: string;
};

export default function GaleriPage() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const photos = await sanityPublic.fetch<Foto[]>(qAllGaleriFoto);
        if (!mounted) return;

        const normalized: ImageItem[] = (photos ?? []).map((p) => ({
          id: p._id,
          title: p.caption || "Untitled",
          imageUrl: p.imageUrl,
          category: p.category || p.album?.judul || "Uncategorized",
          description: p.album?.judul ? `Album: ${p.album.judul}` : "",
        }));
        setImages(normalized);
      } catch (e) {
        console.error(e);
        setErr("Gagal memuat galeri");
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(images.map((i) => i.category)))],
    [images]
  );

  const filtered = selectedCategory === "All"
    ? images
    : images.filter((it) => it.category === selectedCategory);

  const openLightbox = (img: ImageItem, index: number) => {
    setSelectedImage(img);
    setCurrentIndex(index);
  };
  const closeLightbox = () => setSelectedImage(null);
  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? filtered.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(filtered[newIndex]);
  };
  const goToNext = () => {
    const newIndex = currentIndex === filtered.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedImage(filtered[newIndex]);
  };

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold bg-white/20 backdrop-blur-sm rounded-full">
              <Camera className="w-4 h-4" />
              Visual Journey
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Gallery</h1>
            <p className="text-lg md:text-xl text-brand-100">
              Explore our facilities, products, and moments that define our journey of excellence
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-gradient-to-b from-white to-zinc-50">
        <div className="container">
          {/* State loading / error */}
          {loading && <div className="text-center text-zinc-500">Memuat galeri…</div>}
          {err && <div className="text-center text-red-600">{err}</div>}

          {!loading && !err && (
            <>
              {/* Filter */}
              <div className="flex flex-wrap gap-4 justify-center mb-12">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-brand-600 text-white shadow-lg"
                        : "bg-white text-zinc-700 hover:bg-brand-50 hover:text-brand-600 border border-zinc-200"
                    }`}
                  >
                    {category}
                    {category === "All" && (
                      <span className="ml-2 text-xs opacity-70">({images.length})</span>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Grid */}
              <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {filtered.map((item, index) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="group cursor-pointer"
                      onClick={() => openLightbox(item, index)}
                    >
                      <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                        <div className="relative h-64 bg-gradient-to-br from-zinc-100 to-zinc-200 overflow-hidden">
                          <div className="absolute inset-0 bg-brand-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                              <Grid3x3 className="w-8 h-8 text-brand-600" />
                            </div>
                          </div>
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute top-4 left-4 z-20">
                            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-brand-600">
                              {item.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-bold text-zinc-900 mb-1 group-hover:text-brand-600 transition-colors">
                            {item.title}
                          </h3>
                          {item.description && (
                            <p className="text-sm text-zinc-600">{item.description}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {filtered.length === 0 && (
                <div className="text-center py-20">
                  <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-zinc-100 rounded-full">
                    <Camera className="w-10 h-10 text-zinc-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-700 mb-2">No images in this category</h3>
                  <p className="text-zinc-500">Try selecting a different category</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-50"
            >
              <X className="w-6 h-6" />
            </button>

            {filtered.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  className="absolute left-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <motion.div
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              className="relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                width={1200}
                height={800}
                className="object-contain w-full h-full rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <span className="inline-block px-3 py-1 mb-2 bg-brand-600 text-white text-xs font-semibold rounded-full">
                  {selectedImage.category}
                </span>
                <h3 className="text-2xl font-bold text-white mb-1">{selectedImage.title}</h3>
                {selectedImage.description && (
                  <p className="text-white/80">{selectedImage.description}</p>
                )}
              </div>
            </motion.div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
              {currentIndex + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
