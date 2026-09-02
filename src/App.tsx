import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { Specialties } from './components/Specialties';
import { MenuSection } from './components/MenuSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { ReservationSection } from './components/ReservationSection';
import { Footer } from './components/Footer';
import { ItemCustomizerModal } from './components/ItemCustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { AboutModal } from './components/AboutModal';
import { MenuItem, CartItem } from './types';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (newItem: Omit<CartItem, 'cartId'>) => {
    const cartId = `c-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setCartItems((prev) => [...prev, { ...newItem, cartId }]);
    showToast(`Added ${newItem.quantity}x ${newItem.item.name} to order!`);
  };

  const handleQuickAdd = (item: MenuItem) => {
    const cartId = `c-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newCartItem: CartItem = {
      cartId,
      item,
      quantity: 1,
      selectedSize: item.options?.sizes ? item.options.sizes[0].name : undefined,
      sizePriceAdd: 0,
      milkChoice: item.options?.milks ? item.options.milks[0] : undefined,
      sweetnessLevel: item.options?.sweetness ? item.options.sweetness[0] : undefined,
      temperature: item.options?.temperature ? item.options.temperature[0] : 'Hot',
      itemTotal: item.price,
    };
    setCartItems((prev) => [...prev, newCartItem]);
    showToast(`Added ${item.name} to order!`);
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          if (ci.cartId === cartId) {
            const newQty = ci.quantity + delta;
            if (newQty <= 0) return null;
            const singleUnitPrice = ci.itemTotal / ci.quantity;
            return {
              ...ci,
              quantity: newQty,
              itemTotal: singleUnitPrice * newQty,
            };
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.cartId !== cartId));
    showToast('Item removed from basket');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf9f8] text-[#1b1c1c] font-sans flex flex-col selection:bg-[#ae8d87]/30 selection:text-[#271310]">
      {/* Top Glassmorphic Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => scrollToSection('contact')}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreMenu={() => scrollToSection('menu')}
          onVisitUs={() => scrollToSection('contact')}
        />

        {/* About Section */}
        <AboutSection onOpenStoryModal={() => setIsAboutModalOpen(true)} />

        {/* Specialties & Pillars */}
        <Specialties />

        {/* Menu Section */}
        <MenuSection
          onSelectItem={(item) => setSelectedMenuItem(item)}
          onQuickAdd={handleQuickAdd}
        />

        {/* Photo Gallery with Lightbox */}
        <GallerySection />

        {/* Community Reviews */}
        <ReviewsSection />

        {/* Table Reservation & Contact */}
        <ReservationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Item Customization & Detail Modal */}
      <ItemCustomizerModal
        item={selectedMenuItem}
        onClose={() => setSelectedMenuItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-over Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Story & Philosophy Modal */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />

      {/* Quick Floating Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#271310] text-[#fcf9f8] px-5 py-3 rounded-xl shadow-2xl border border-[#ae8d87]/40 flex items-center gap-2.5 text-xs sm:text-sm font-semibold animate-fade-in backdrop-blur-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 bg-[#c86d3b] text-white text-xs px-2.5 py-1 rounded-md hover:bg-[#b85d28] transition-colors cursor-pointer"
          >
            View Cart
          </button>
        </div>
      )}
    </div>
  );
}
