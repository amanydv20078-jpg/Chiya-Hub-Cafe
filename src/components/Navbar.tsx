import React, { useState, useEffect } from 'react';
import { ShoppingBag, Coffee, Menu as MenuIcon, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'specialties', 'menu', 'gallery', 'reviews', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="navbar"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#fcf9f8]/90 glass-nav shadow-[0_4px_30px_rgba(39,19,16,0.08)] border-b border-[#e5e2e1]'
          : 'bg-[#655d4f]/70 glass-nav shadow-[0_4px_30px_rgba(39,19,16,0.05)]'
      }`}
    >
      <div className="flex justify-between items-center px-4 md:px-12 h-20 max-w-7xl mx-auto">
        {/* Brand Logo */}
        <a
          id="brand-logo"
          href="#home"
          className="flex items-center gap-2 group text-decoration-none"
        >
          <div className="w-10 h-10 rounded-full bg-[#271310] flex items-center justify-center text-[#fcf9f8] shadow-md group-hover:bg-[#3e2723] transition-colors">
            <Coffee className="w-5 h-5 text-[#ae8d87] group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <span
              className={`font-serif text-2xl md:text-3xl font-bold tracking-tight transition-colors ${
                isScrolled ? 'text-[#271310]' : 'text-[#ffffff]'
              }`}
            >
              Chiya Hub
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-7 items-center" id="desktop-nav">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                className={`font-sans text-sm font-semibold transition-all duration-300 relative py-1 ${
                  isScrolled
                    ? isActive
                      ? 'text-[#271310] font-bold'
                      : 'text-[#504442] hover:text-[#271310]'
                    : isActive
                    ? 'text-white font-bold'
                    : 'text-white/85 hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ae8d87] rounded-full transition-all" />
                )}
              </a>
            );
          })}

          {/* Cart Icon & Button */}
          <button
            id="order-now-btn"
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-[#271310] text-[#fcf9f8] hover:bg-[#3e2723] px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg relative group cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#ae8d87] group-hover:scale-110 transition-transform" />
            <span>Order Now</span>
            {cartCount > 0 && (
              <span className="ml-1 px-2 py-0.5 text-xs font-bold bg-[#c86d3b] text-white rounded-full animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile Actions */}
        <div className="md:hidden flex items-center gap-3">
          <button
            id="mobile-cart-btn"
            onClick={onOpenCart}
            className={`relative p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-[#271310] bg-[#f0eded]' : 'text-white bg-black/20'
            }`}
            aria-label="View Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-bold bg-[#c86d3b] text-white rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-[#271310]' : 'text-white'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-[#fcf9f8] border-t border-[#e5e2e1] shadow-xl py-6 px-6 flex flex-col space-y-4 animate-in slide-in-from-top duration-300"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-semibold text-[#271310] hover:text-[#ae8d87] py-2 border-b border-[#f0eded] flex items-center justify-between"
            >
              <span>{link.name}</span>
              <span className="text-xs text-[#827472]">→</span>
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCart();
              }}
              className="w-full bg-[#271310] text-[#fcf9f8] py-3 rounded-lg font-semibold text-center flex items-center justify-center gap-2 shadow"
            >
              <ShoppingBag className="w-4 h-4 text-[#ae8d87]" />
              <span>Order Now {cartCount > 0 ? `(${cartCount} items)` : ''}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
