import React, { useState } from 'react';
import { GALLERY_PHOTOS } from '../data/cafeData';
import { GalleryPhoto } from '../types';
import { Eye, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'chiya' | 'food' | 'ambiance'>('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const filteredPhotos = GALLERY_PHOTOS.filter((photo) =>
    filter === 'all' ? true : photo.category === filter
  );

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % filteredPhotos.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex(
        (activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length
      );
    }
  };

  return (
    <section id="gallery" className="py-20 md:py-28 px-4 md:px-12 bg-[#f0eded]/40 border-t border-[#e5e2e1]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-[#c86d3b] font-sans text-xs md:text-sm font-bold tracking-widest uppercase mb-2">
            <Camera className="w-4 h-4" />
            <span>Moments & Flavors</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#271310] tracking-tight mb-4">
            Life at Chiya Hub
          </h2>
          <p className="text-sm md:text-base text-[#504442]">
            A glimpse into our sunlit corners, artisanal brew bars, and delicious daily plates.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {[
            { id: 'all', label: 'All Photos' },
            { id: 'ambiance', label: 'Ambiance & Space' },
            { id: 'chiya', label: 'Chiya & Brews' },
            { id: 'food', label: 'Artisanal Food' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                filter === cat.id
                  ? 'bg-[#271310] text-[#fcf9f8] shadow-sm'
                  : 'bg-[#fcf9f8] text-[#504442] hover:bg-[#eadecc] border border-[#e5e2e1]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setActivePhotoIndex(index)}
              className="relative h-72 rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(39,19,16,0.08)] group cursor-pointer border border-[#e5e2e1]"
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#eadecc] bg-[#271310]/80 px-2 py-0.5 rounded backdrop-blur-sm mb-2 inline-block">
                    {photo.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold mb-1">{photo.title}</h3>
                  <p className="text-xs text-[#f0eded]/90 line-clamp-2">{photo.description}</p>
                </div>
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Viewer */}
      {activePhotoIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={() => setActivePhotoIndex(null)}
        >
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition-colors z-20 cursor-pointer"
            aria-label="Close photo preview"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition-colors z-20 cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition-colors z-20 cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredPhotos[activePhotoIndex].image}
              alt={filteredPhotos[activePhotoIndex].title}
              className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-2xl mb-4 border border-white/10"
            />
            <div className="text-center text-white max-w-lg">
              <h3 className="font-serif text-xl font-bold mb-1">
                {filteredPhotos[activePhotoIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-[#dcd9d9]">
                {filteredPhotos[activePhotoIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
