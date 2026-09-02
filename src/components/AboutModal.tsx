import React from 'react';
import { X, Award, Sparkles, Coffee, Heart, CheckCircle2 } from 'lucide-react';
import { ABOUT_IMAGE } from '../data/cafeData';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-[#fcf9f8] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#e5e2e1] overflow-hidden flex flex-col max-h-[90vh] animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative h-48 sm:h-56 bg-[#271310] shrink-0">
          <img
            src={ABOUT_IMAGE}
            alt="Chiya Hub Craft"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#271310] via-transparent to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors cursor-pointer"
            aria-label="Close story modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-xs uppercase font-bold tracking-widest text-[#eadecc]">
              Our Philosophy & Heritage
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              The Art of Slow-Simmered Chiya
            </h3>
          </div>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-[#1b1c1c] text-sm leading-relaxed">
          <div>
            <h4 className="font-serif text-lg font-bold text-[#271310] mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#c86d3b]" />
              Himalayan High-Altitude Sourcing
            </h4>
            <p className="text-[#504442]">
              Our tea leaves are harvested from small family estates in the mist-covered hills of Ilam, Nepal. Grown at an elevation of over 6,000 feet, the slow growth cycle concentrates natural essential oils, yielding an extraordinarily rich, floral, and deeply sweet liquor without bitter astringency.
            </p>
          </div>

          <div className="bg-[#f6f3f2] p-4 rounded-xl border border-[#e5e2e1]">
            <h4 className="font-serif text-base font-bold text-[#271310] mb-2 flex items-center gap-2">
              <Coffee className="w-4 h-4 text-[#c86d3b]" />
              The Matka Clay Tradition
            </h4>
            <p className="text-xs text-[#504442] leading-relaxed">
              When Chiya is poured boiling hot into unglazed clay cups, the porous earthenware interacts with the caramelized milk fats and spices. This imparts a nostalgic, earthy aroma that simply cannot be replicated with porcelain or glass.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold text-[#271310] mb-3">
              Our 4 Pillars of Craftsmanship
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-start gap-2 bg-white p-3 rounded-lg border border-[#e5e2e1]">
                <CheckCircle2 className="w-4 h-4 text-[#c86d3b] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#271310] block">Whole Spices Only</strong>
                  <span className="text-[#655d4f]">We never use synthetic flavor powders or syrups in our signature blends.</span>
                </div>
              </div>
              <div className="flex items-start gap-2 bg-white p-3 rounded-lg border border-[#e5e2e1]">
                <CheckCircle2 className="w-4 h-4 text-[#c86d3b] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#271310] block">Ethical Fair Wages</strong>
                  <span className="text-[#655d4f]">100% direct-trade partnerships with mountain farmers and cooperatives.</span>
                </div>
              </div>
              <div className="flex items-start gap-2 bg-white p-3 rounded-lg border border-[#e5e2e1]">
                <CheckCircle2 className="w-4 h-4 text-[#c86d3b] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#271310] block">Small-Batch Roasting</strong>
                  <span className="text-[#655d4f]">Specialty coffee beans roasted every Tuesday for peak aromatics and crema.</span>
                </div>
              </div>
              <div className="flex items-start gap-2 bg-white p-3 rounded-lg border border-[#e5e2e1]">
                <CheckCircle2 className="w-4 h-4 text-[#c86d3b] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#271310] block">Community First</strong>
                  <span className="text-[#655d4f]">A welcoming space fostering local artists, conversations, and deep connection.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#f0eded] border-t border-[#e5e2e1] flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#271310] hover:bg-[#3e2723] text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer"
          >
            Close & Explore
          </button>
        </div>
      </div>
    </div>
  );
};
