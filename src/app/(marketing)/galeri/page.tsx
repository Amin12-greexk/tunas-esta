// src/app/(marketing)/galeri/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Grid3x3, Camera } from "lucide-react";

// Dummy data - replace with Sanity data
const galleryData = [
  {
    id: 1,
    category: "Production",
    title: "Modern Production Facility",
    image: "/api/placeholder/800/600",
    description: "State-of-the-art processing equipment"
  },
  {
    id: 2,
    category: "Products",
    title: "Premium Grade A Bird's Nest",
    image: "/api/placeholder/800/600",
    description: "Highest quality products"
  },
  {
    id: 3,
    category: "Events",
    title: "International Food Expo 2024",
    image: "/api/placeholder/800/600",
    description: "Showcasing at global exhibitions"
  },
  {
    id: 4,
    category: "Team",
    title: "Quality Control Team",
    image: "/api/placeholder/800/600",
    description: "Dedicated professionals ensuring excellence"
  },
  {
    id: 5,
    category: "Facilities",
    title: "Cleaning Room",
    image: "/api/placeholder/800/600",
    description: "Hygienic processing environment"
  },
  {
    id: 6,
    category: "Products",
    title: "Export Ready Packaging",
    image: "/api/placeholder/800/600",
    description: "International standard packaging"
  },
  {
    id: 7,
    category: "Certification",
    title: "ISO Certification Ceremony",
    image: "/api/placeholder/800/600",
    description: "Receiving international certifications"
  },
  {
    id: 8,
    category: "Production",
    title: "Raw Material Selection",
    image: "/api/placeholder/800/600",
    description: "Careful selection process"
  },
  {
    id: 9,
    category: "Events",
    title: "Company Anniversary",
    image: "/api/placeholder/800/600",
    description: "Celebrating 25 years of excellence"
  }
];

const categories = ["All", "Production", "Products", "Facilities", "Events", "Team", "Certification"];

export default function GaleriPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredImages = selectedCategory === "All" 
    ? galleryData 
    : galleryData.filter(item => item.category === selectedCategory);

  const openLightbox = (image: any, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  const goToNext = () => {
    const newIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Gallery
            </h1>
            <p className="text-lg md:text-xl text-brand-100">
              Explore our facilities, products, and moments that define our journey of excellence
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-gradient-to-b from-white to-zinc-50">
        <div className="container">
          {/* Category Filter */}
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
                  <span className="ml-2 text-xs opacity-70">
                    ({galleryData.length})
                  </span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Gallery Grid */}
          <motion.div 
            layout
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((item, index) => (
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
                    {/* Image */}
                    <div className="relative h-64 bg-gradient-to-br from-zinc-100 to-zinc-200 overflow-hidden">
                      <div className="absolute inset-0 bg-brand-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                          <Grid3x3 className="w-8 h-8 text-brand-600" />
                        </div>
                      </div>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-brand-600">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-zinc-900 mb-1 group-hover:text-brand-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-zinc-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-zinc-100 rounded-full">
                <Camera className="w-10 h-10 text-zinc-400" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-700 mb-2">
                No images in this category
              </h3>
              <p className="text-zinc-500">
                Try selecting a different category
              </p>
            </div>
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
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-50"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
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

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                width={1200}
                height={800}
                className="object-contain w-full h-full rounded-lg"
              />
              
              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <span className="inline-block px-3 py-1 mb-2 bg-brand-600 text-white text-xs font-semibold rounded-full">
                  {selectedImage.category}
                </span>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {selectedImage.title}
                </h3>
                <p className="text-white/80">
                  {selectedImage.description}
                </p>
              </div>
            </motion.div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
              {currentIndex + 1} / {filteredImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}