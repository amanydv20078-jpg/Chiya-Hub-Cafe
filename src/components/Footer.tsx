import React, { useState } from 'react';
import { Coffee, Share2, Instagram, Facebook, Twitter, Send, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 4000);
  };

  return (
    <footer className="w-full bg-[#e5e2e1] border-t border-[#d3c3c0] text-[#1b1c1c] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">
          {/* Col 1: Brand Info */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#271310] flex items-center justify-center text-[#ede1cf]">
                <Coffee className="w-4 h-4 text-[#ae8d87]" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#271310]">Chiya Hub</h3>
            </div>
            <p className="text-sm text-[#504442] leading-relaxed mb-4">
              Your neighborhood spot for premium Himalayan Chiya, artisanal coffee, and warm moments.
            </p>
            <div className="text-xs text-[#655d4f] space-y-1">
              <p>📍 142 Heritage Way, Arts District</p>
              <p>📞 +1 (555) 244-9248</p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-[#271310] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-[#504442]">
              <li>
                <a href="#home" className="hover:text-[#271310] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#271310] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#specialties" className="hover:text-[#271310] transition-colors">
                  Our Specialties
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#271310] transition-colors">
                  Full Menu
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: More Links */}
          <div>
            <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-[#271310] mb-4">
              Explore More
            </h4>
            <ul className="space-y-2.5 text-sm text-[#504442]">
              <li>
                <a href="#gallery" className="hover:text-[#271310] transition-colors">
                  Photo Gallery
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#271310] transition-colors">
                  Community Reviews
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#271310] transition-colors">
                  Table Reservations
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#271310] transition-colors">
                  Contact & Hours
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Connect & Newsletter */}
          <div>
            <h4 className="font-sans text-sm font-bold uppercase tracking-wider text-[#271310] mb-4">
              Connect & Offers
            </h4>
            <p className="text-xs text-[#504442] mb-3">
              Subscribe for weekly special blend releases & 10% off your first order.
            </p>

            <form onSubmit={handleSubscribe} className="mb-4">
              <div className="flex gap-1.5">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 text-xs px-3 py-2 bg-[#fcf9f8] border border-[#d3c3c0] rounded-lg focus:outline-none focus:border-[#c86d3b]"
                />
                <button
                  type="submit"
                  className="bg-[#271310] hover:bg-[#3e2723] text-white px-3 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-800 font-semibold mt-1.5 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Welcome! Use code <strong>CHIYA10</strong> for 10% off.</span>
                </p>
              )}
            </form>

            <div className="flex space-x-3 pt-1">
              <a
                href="#contact"
                className="w-9 h-9 rounded-full bg-[#eadecc] flex items-center justify-center text-[#271310] hover:bg-[#271310] hover:text-white transition-all shadow-sm"
                aria-label="Social share"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#eadecc] flex items-center justify-center text-[#271310] hover:bg-[#271310] hover:text-white transition-all shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#eadecc] flex items-center justify-center text-[#271310] hover:bg-[#271310] hover:text-white transition-all shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#d3c3c0] text-center text-xs text-[#655d4f] flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2024 Chiya Hub Café. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Dietary Guide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
