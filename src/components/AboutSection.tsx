import React from 'react';
import { ABOUT_IMAGE } from '../data/cafeData';
import { Award, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

interface AboutSectionProps {
  onOpenStoryModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenStoryModal }) => {
  return (
    <section id="about" className="py-20 md:py-28 px-4 md:px-12 bg-[#fcf9f8] relative overflow-hidden">
      {/* Subtle Background Ornament */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-[#eadecc]/30 rounded-full filter blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-[#ae8d87]/15 rounded-full filter blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Content Column */}
        <div className="flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 text-[#c86d3b] font-sans text-xs md:text-sm font-bold tracking-widest uppercase mb-3">
            <Sparkles className="w-4 h-4" />
            <span>Our Heritage & Heart</span>
          </div>

          <h2
            id="about-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#271310] tracking-tight leading-tight mb-6"
          >
            About Chiya Hub
          </h2>

          <p className="font-sans text-base md:text-lg text-[#504442] leading-relaxed mb-6">
            Welcome to Chiya Hub, where every cup tells a story. We carefully select premium single-origin tea leaves from high-altitude Himalayan gardens and ethically roasted specialty coffee beans, preparing every drink with authentic craftsmanship.
          </p>

          <p className="font-sans text-sm md:text-base text-[#655d4f] leading-relaxed mb-8">
            Our warm brick-and-timber space is designed to be your neighborhood retreat—a cozy place to work peacefully, celebrate warmth with friends, or unwind with a steaming clay pot of traditional Masala Chiya and freshly baked flaky croissants.
          </p>

          {/* Key Stats Bar - Matching Prompt Mockup */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8 border-y border-[#d3c3c0] py-5 bg-[#f6f3f2]/60 rounded-xl px-4">
            <div className="text-center">
              <span className="block font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#271310]">
                10+
              </span>
              <span className="font-sans text-xs sm:text-sm font-semibold text-[#504442] tracking-wide mt-1 block">
                Chiya Varieties
              </span>
            </div>

            <div className="text-center border-x border-[#d3c3c0] px-2">
              <span className="block font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#271310]">
                5K+
              </span>
              <span className="font-sans text-xs sm:text-sm font-semibold text-[#504442] tracking-wide mt-1 block">
                Happy Customers
              </span>
            </div>

            <div className="text-center">
              <span className="block font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#271310] flex items-center justify-center gap-1">
                4.9 <span className="text-amber-500 text-xl sm:text-2xl">★</span>
              </span>
              <span className="font-sans text-xs sm:text-sm font-semibold text-[#504442] tracking-wide mt-1 block">
                Average Rating
              </span>
            </div>
          </div>

          {/* Value points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            <div className="flex items-center gap-2 text-sm text-[#271310]">
              <CheckCircle2 className="w-4 h-4 text-[#c86d3b] shrink-0" />
              <span>Slow-simmered whole spices</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#271310]">
              <CheckCircle2 className="w-4 h-4 text-[#c86d3b] shrink-0" />
              <span>Fair-trade Himalayan farmers</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#271310]">
              <CheckCircle2 className="w-4 h-4 text-[#c86d3b] shrink-0" />
              <span>Baked daily in-house</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#271310]">
              <CheckCircle2 className="w-4 h-4 text-[#c86d3b] shrink-0" />
              <span>Cozy quiet workspace pods</span>
            </div>
          </div>

          {/* Action Button */}
          <div>
            <button
              id="about-learn-more-btn"
              onClick={onOpenStoryModal}
              className="border-2 border-[#271310] text-[#271310] hover:bg-[#271310] hover:text-[#fcf9f8] font-sans font-semibold text-sm md:text-base px-8 py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow cursor-pointer"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Right Photo Column */}
        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden shadow-[0_16px_40px_rgba(39,19,16,0.15)] h-[440px] sm:h-[520px] group border border-[#e5e2e1]">
            <img
              src={ABOUT_IMAGE}
              alt="Barista pouring precision latte art in handcrafted ceramic cup at Chiya Hub"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Subtle Gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

            {/* Floating feature badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-[#fcf9f8]/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-[#e5e2e1] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#271310] text-[#ede1cf] flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#ae8d87]" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#271310]">Master Baristas & Tea Artisans</h4>
                  <p className="text-xs text-[#504442]">Custom steamed to your exact preference</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center text-xs font-semibold text-[#c86d3b]">
                <span>Est. 2021</span>
              </div>
            </div>
          </div>

          {/* Decorative stamp badge */}
          <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-[#3e2723] text-[#ede1cf] p-2 flex flex-col items-center justify-center text-center shadow-xl rotate-12 border-2 border-[#eadecc]">
            <span className="text-[10px] font-sans font-bold uppercase tracking-wider">100%</span>
            <span className="text-xs font-serif font-bold">Organic</span>
          </div>
        </div>
      </div>
    </section>
  );
};
