import React from 'react';
import { Flame, Sparkles, Utensils, Wifi, Clock, ShieldCheck } from 'lucide-react';

export const Specialties: React.FC = () => {
  const pillars = [
    {
      icon: Flame,
      title: 'Himalayan Spiced Chiya',
      description: 'Slow-simmered with whole green cardamom, fresh ginger, Ceylon cinnamon, and organic mountain tea leaves.',
      highlight: '10+ Authentic Blends',
    },
    {
      icon: Sparkles,
      title: 'Single-Origin Coffee',
      description: 'Micro-lot Arabica beans roasted in small batches for optimal chocolatey and floral flavor profiles.',
      highlight: 'Freshly Dialed In Daily',
    },
    {
      icon: Utensils,
      title: 'Steamed Momos & Pastries',
      description: 'Hand-pleated Himalayan dumplings with roasted timur tomato chutney alongside morning butter croissants.',
      highlight: 'Baked & Steamed Fresh',
    },
    {
      icon: Wifi,
      title: 'Cozy Workspace Retreat',
      description: 'Equipped with dedicated power ports, ultra-fast fiber Wi-Fi, ambient jazz, and warm natural lighting.',
      highlight: 'Complimentary Wi-Fi',
    },
  ];

  return (
    <section id="specialties" className="py-16 md:py-20 px-4 md:px-12 bg-[#f0eded]/60 border-y border-[#e5e2e1]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs md:text-sm font-bold tracking-widest text-[#c86d3b] uppercase font-sans">
            Crafted For Connoisseurs
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#271310] mt-2 mb-4">
            The Chiya Hub Experience
          </h2>
          <p className="text-sm md:text-base text-[#504442]">
            Every recipe has been refined across generations to blend timeless Eastern warmth with modern specialty café craft.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#fcf9f8] p-6 rounded-2xl border border-[#e5e2e1] shadow-[0_4px_20px_rgba(39,19,16,0.04)] hover:shadow-[0_12px_30px_rgba(39,19,16,0.08)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#eadecc] text-[#271310] flex items-center justify-center mb-5 group-hover:bg-[#271310] group-hover:text-[#ede1cf] transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#271310] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#504442] leading-relaxed mb-4">
                    {pillar.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#f0eded] flex items-center justify-between text-xs font-semibold text-[#c86d3b]">
                  <span>{pillar.highlight}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
