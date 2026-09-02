import React from 'react';
import { HERO_IMAGE } from '../data/cafeData';
import { Sparkles, ArrowDown, MapPin, Clock } from 'lucide-react';

interface HeroProps {
  onExploreMenu: () => void;
  onVisitUs: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onVisitUs }) => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Background Image with Layered Depth */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Chiya Hub warm café interior with artisan coffee and pastries"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 text-center px-4 md:px-12 max-w-5xl mx-auto flex flex-col items-center">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#271310]/70 border border-[#ae8d87]/40 text-[#ede1cf] text-xs md:text-sm font-medium backdrop-blur-md mb-6 shadow-lg animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Open Today 7:00 AM – 9:00 PM</span>
          <span className="text-[#ae8d87]">•</span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#eadecc]" />
            Fresh Morning Roast Ready
          </span>
        </div>

        {/* Hero Title */}
        <h1
          id="hero-title"
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] md:leading-[1.15] mb-6 drop-shadow-lg max-w-4xl"
        >
          Brewed With Passion,<br />
          <span className="text-[#eadecc] italic font-normal">Served With Love.</span>
        </h1>

        {/* Hero Subtitle */}
        <p
          id="hero-subtitle"
          className="font-sans text-base sm:text-lg md:text-xl text-[#f0eded]/95 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow"
        >
          Freshly roasted coffee, authentic Himalayan Chiya, delicious artisanal bites, and a cozy place to make every moment special.
        </p>

        {/* Hero Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mb-12">
          <a
            id="hero-explore-menu-btn"
            href="#menu"
            onClick={(e) => {
              e.preventDefault();
              onExploreMenu();
            }}
            className="w-full sm:w-auto bg-[#271310] hover:bg-[#3e2723] text-[#ffffff] font-sans font-semibold text-base px-8 py-3.5 rounded-xl border border-[#ae8d87]/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
          >
            Explore Menu
          </a>

          <a
            id="hero-visit-us-btn"
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onVisitUs();
            }}
            className="w-full sm:w-auto border-2 border-white/80 text-white hover:bg-white/15 font-sans font-semibold text-base px-8 py-3.5 rounded-xl backdrop-blur-md transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
          >
            Visit Us
          </a>
        </div>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6 w-full max-w-3xl pt-6 border-t border-white/20 text-white/90">
          <div className="flex items-center justify-center gap-2.5 py-2 px-3 rounded-lg bg-black/25 backdrop-blur-sm">
            <span className="text-xl">☕</span>
            <span className="text-xs md:text-sm font-medium">Himalayan Single-Origin</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 py-2 px-3 rounded-lg bg-black/25 backdrop-blur-sm">
            <span className="text-xl">🫖</span>
            <span className="text-xs md:text-sm font-medium">Authentic Matka Chiya</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 py-2 px-3 rounded-lg bg-black/25 backdrop-blur-sm">
            <span className="text-xl">🥐</span>
            <span className="text-xs md:text-sm font-medium">Daily Handcrafted Bites</span>
          </div>
        </div>

        {/* Scroll down indicator */}
        <a
          href="#about"
          className="mt-8 text-white/60 hover:text-white transition-colors animate-bounce p-2"
          aria-label="Scroll to About section"
        >
          <ArrowDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};
