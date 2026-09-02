import React, { useState, useMemo } from 'react';
import { MENU_ITEMS, MENU_CATEGORIES } from '../data/cafeData';
import { MenuItem } from '../types';
import { Search, Plus, Sparkles, Flame, Clock, Filter, Check } from 'lucide-react';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectItem, onQuickAdd }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDiet, setSelectedDiet] = useState<string>('all');
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.nepaliName && item.nepaliName.includes(searchQuery));
      const matchesDiet =
        selectedDiet === 'all' || (item.dietary && item.dietary.includes(selectedDiet as any));

      return matchesCategory && matchesSearch && matchesDiet;
    });
  }, [activeCategory, searchQuery, selectedDiet]);

  const handleQuickAddClick = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    onQuickAdd(item);
    setQuickAddedId(item.id);
    setTimeout(() => {
      setQuickAddedId(null);
    }, 1000);
  };

  return (
    <section id="menu" className="py-20 md:py-28 px-4 md:px-12 bg-[#fcf9f8] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs md:text-sm font-bold tracking-widest text-[#c86d3b] uppercase font-sans">
            Freshly Prepared Daily
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#271310] mt-2 mb-4 tracking-tight">
            Our Handcrafted Menu
          </h2>
          <p className="text-sm md:text-base text-[#504442] leading-relaxed">
            From slow-simmered spiced Himalayan teas and precision espresso to warm pastries and hand-pleated momos.
          </p>
        </div>

        {/* Search & Filter Controls Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 bg-[#f6f3f2] p-4 rounded-2xl border border-[#e5e2e1]">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#827472] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search chiya, coffee, momos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs md:text-sm bg-white border border-[#d3c3c0] rounded-xl focus:outline-none focus:border-[#c86d3b] focus:ring-1 focus:ring-[#c86d3b] text-[#1b1c1c]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#827472] hover:text-[#271310]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Dietary Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-bold text-[#504442] flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Dietary:
            </span>
            {['all', 'Veg', 'Vegan', 'Gluten-Free'].map((diet) => (
              <button
                key={diet}
                onClick={() => setSelectedDiet(diet)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedDiet === diet
                    ? 'bg-[#271310] text-white shadow-sm'
                    : 'bg-white text-[#504442] border border-[#d3c3c0] hover:bg-[#ede1cf]'
                }`}
              >
                {diet === 'all' ? 'All Diets' : diet}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto gap-2.5 pb-3 mb-10 no-scrollbar justify-start md:justify-center">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#271310] text-[#fcf9f8] shadow-md transform -translate-y-0.5'
                    : 'bg-[#f0eded] text-[#504442] hover:bg-[#eadecc] hover:text-[#271310] border border-[#e5e2e1]'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#f6f3f2] rounded-2xl border border-dashed border-[#d3c3c0]">
            <p className="font-serif text-xl font-bold text-[#271310] mb-2">No items found</p>
            <p className="text-xs text-[#504442] mb-4">Try adjusting your search query or dietary filter.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDiet('all');
                setActiveCategory('all');
              }}
              className="text-xs font-bold text-[#c86d3b] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="bg-[#fcf9f8] rounded-2xl border border-[#e5e2e1] overflow-hidden shadow-[0_4px_20px_rgba(39,19,16,0.05)] hover:shadow-[0_16px_32px_rgba(39,19,16,0.12)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group cursor-pointer"
              >
                {/* Image Container with Badges */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#3e2723]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                    <div className="flex gap-1.5">
                      {item.isPopular && (
                        <span className="bg-[#271310]/90 text-[#ede1cf] px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-sm border border-[#ae8d87]/30">
                          Popular
                        </span>
                      )}
                      {item.isChefSpecial && (
                        <span className="bg-[#c86d3b] text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-sm">
                          Special
                        </span>
                      )}
                      {item.isNew && (
                        <span className="bg-emerald-800 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase">
                          New
                        </span>
                      )}
                    </div>

                    {item.prepTime && (
                      <span className="bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-md backdrop-blur-sm flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#eadecc]" />
                        {item.prepTime}
                      </span>
                    )}
                  </div>

                  {/* Nepali Name Overlay if available */}
                  {item.nepaliName && (
                    <div className="absolute bottom-2 left-3 text-xs font-serif text-[#ede1cf]/90 drop-shadow">
                      {item.nepaliName}
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-1.5">
                      <h3 className="font-serif text-lg font-bold text-[#271310] group-hover:text-[#c86d3b] transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                      <span className="font-serif text-lg font-bold text-[#271310] shrink-0">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    <p className="text-xs text-[#504442] line-clamp-2 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Card Bottom Meta & CTA */}
                  <div className="pt-3 border-t border-[#f0eded] flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {item.dietary?.map((diet) => (
                        <span
                          key={diet}
                          className="text-[10px] font-semibold bg-[#f0eded] text-[#504442] px-2 py-0.5 rounded"
                        >
                          {diet}
                        </span>
                      ))}
                    </div>

                    {/* Quick Add Button */}
                    <button
                      onClick={(e) => handleQuickAddClick(e, item)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                        quickAddedId === item.id
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#271310] text-[#fcf9f8] hover:bg-[#3e2723]'
                      }`}
                      title="Quick add to order"
                    >
                      {quickAddedId === item.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 text-[#ae8d87]" />
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
