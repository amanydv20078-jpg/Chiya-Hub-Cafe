import React, { useState } from 'react';
import { MenuItem, CartItem } from '../types';
import { X, Plus, Minus, Check, Flame, Sparkles, Clock, Heart } from 'lucide-react';

interface ItemCustomizerModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (cartItem: Omit<CartItem, 'cartId'>) => void;
}

export const ItemCustomizerModal: React.FC<ItemCustomizerModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(
    item.options?.sizes ? item.options.sizes[0].name : undefined
  );
  const [sizePriceAdd, setSizePriceAdd] = useState(
    item.options?.sizes ? item.options.sizes[0].priceAdd : 0
  );
  const [selectedMilk, setSelectedMilk] = useState(
    item.options?.milks ? item.options.milks[0] : undefined
  );
  const [selectedSweetness, setSelectedSweetness] = useState(
    item.options?.sweetness ? item.options.sweetness[0] : undefined
  );
  const [selectedTemp, setSelectedTemp] = useState<'Hot' | 'Iced'>(
    item.options?.temperature ? item.options.temperature[0] : 'Hot'
  );
  const [specialNotes, setSpecialNotes] = useState('');
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Extra milk price add-on check
  const getMilkExtra = (milkName?: string) => {
    if (!milkName) return 0;
    if (milkName.includes('(+0.60)') || milkName.includes('Oat') || milkName.includes('Almond') || milkName.includes('Coconut')) {
      return 0.60;
    }
    return 0;
  };

  const currentUnitCost = item.price + sizePriceAdd + getMilkExtra(selectedMilk);
  const grandTotal = currentUnitCost * quantity;

  const handleAdd = () => {
    setAddedAnimation(true);
    setTimeout(() => {
      onAddToCart({
        item,
        quantity,
        selectedSize,
        sizePriceAdd,
        milkChoice: selectedMilk,
        sweetnessLevel: selectedSweetness,
        temperature: selectedTemp,
        specialNotes: specialNotes.trim() || undefined,
        itemTotal: grandTotal,
      });
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-[#fcf9f8] w-full max-w-lg rounded-2xl shadow-2xl border border-[#e5e2e1] overflow-hidden flex flex-col max-h-[90vh] animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image with Close Button */}
        <div className="relative h-56 sm:h-64 w-full shrink-0 bg-[#3e2723]">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors backdrop-blur-sm cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-5 right-5 text-white">
            <div className="flex items-center gap-2 mb-1">
              {item.isChefSpecial && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#c86d3b] text-white">
                  ★ Chef's Special
                </span>
              )}
              {item.nepaliName && (
                <span className="px-2 py-0.5 rounded-full text-xs font-serif bg-black/40 backdrop-blur-sm text-[#ede1cf]">
                  {item.nepaliName}
                </span>
              )}
            </div>
            <h3 className="font-serif text-2xl font-bold">{item.name}</h3>
            <p className="text-xl font-semibold text-[#eadecc]">${item.price.toFixed(2)}</p>
          </div>
        </div>

        {/* Scrollable Customization Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-[#1b1c1c]">
          {/* Description & Details */}
          <div>
            <p className="text-sm text-[#504442] leading-relaxed mb-3">
              {item.description}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#655d4f] pt-2 border-t border-[#f0eded]">
              {item.prepTime && (
                <span className="flex items-center gap-1 bg-[#f0eded] px-2.5 py-1 rounded-md">
                  <Clock className="w-3.5 h-3.5 text-[#c86d3b]" />
                  {item.prepTime}
                </span>
              )}
              {item.calories && (
                <span className="bg-[#f0eded] px-2.5 py-1 rounded-md">
                  {item.calories} kcal
                </span>
              )}
              {item.dietary?.map((diet) => (
                <span key={diet} className="bg-[#d0e8de] text-[#081c17] px-2.5 py-1 rounded-md font-medium">
                  {diet}
                </span>
              ))}
            </div>
          </div>

          {/* Ingredients list if any */}
          {item.ingredients && item.ingredients.length > 0 && (
            <div className="bg-[#f6f3f2] p-3.5 rounded-xl border border-[#e5e2e1]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#504442] mb-1.5">
                Key Fresh Ingredients
              </h4>
              <p className="text-xs text-[#655d4f] leading-normal">
                {item.ingredients.join(' • ')}
              </p>
            </div>
          )}

          {/* Size Selection */}
          {item.options?.sizes && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#271310] mb-2">
                Choose Size
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {item.options.sizes.map((s) => (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => {
                      setSelectedSize(s.name);
                      setSizePriceAdd(s.priceAdd);
                    }}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex justify-between items-center transition-all border cursor-pointer ${
                      selectedSize === s.name
                        ? 'bg-[#271310] text-[#fcf9f8] border-[#271310] shadow-sm'
                        : 'bg-[#f0eded] text-[#504442] border-[#e5e2e1] hover:bg-[#e5e2e1]'
                    }`}
                  >
                    <span>{s.name}</span>
                    <span>
                      {s.priceAdd > 0 ? `+$${s.priceAdd.toFixed(2)}` : s.priceAdd < 0 ? `-$${Math.abs(s.priceAdd).toFixed(2)}` : 'Standard'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Temperature Choice (Hot / Iced) */}
          {item.options?.temperature && item.options.temperature.length > 1 && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#271310] mb-2">
                Temperature
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {item.options.temperature.map((temp) => (
                  <button
                    key={temp}
                    type="button"
                    onClick={() => setSelectedTemp(temp)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                      selectedTemp === temp
                        ? 'bg-[#271310] text-[#fcf9f8] border-[#271310]'
                        : 'bg-[#f0eded] text-[#504442] border-[#e5e2e1]'
                    }`}
                  >
                    <span>{temp === 'Hot' ? '🔥 Hot' : '🧊 Iced'}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Milk Options */}
          {item.options?.milks && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#271310] mb-2">
                Milk Choice
              </label>
              <div className="grid grid-cols-2 gap-2">
                {item.options.milks.map((milk) => (
                  <button
                    key={milk}
                    type="button"
                    onClick={() => setSelectedMilk(milk)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium text-left border transition-all cursor-pointer ${
                      selectedMilk === milk
                        ? 'bg-[#eadecc] text-[#271310] font-bold border-[#827472]'
                        : 'bg-[#f6f3f2] text-[#504442] border-[#e5e2e1] hover:bg-[#f0eded]'
                    }`}
                  >
                    {milk}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sweetness / Flavor Options */}
          {item.options?.sweetness && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#271310] mb-2">
                Sweetness & Spice Level
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.options.sweetness.map((sweet) => (
                  <button
                    key={sweet}
                    type="button"
                    onClick={() => setSelectedSweetness(sweet)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium text-left border transition-all cursor-pointer ${
                      selectedSweetness === sweet
                        ? 'bg-[#eadecc] text-[#271310] font-bold border-[#827472]'
                        : 'bg-[#f6f3f2] text-[#504442] border-[#e5e2e1] hover:bg-[#f0eded]'
                    }`}
                  >
                    {sweet}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Special Requests */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#271310] mb-1.5">
              Special Instructions
            </label>
            <input
              type="text"
              placeholder="e.g., extra hot, cinnamon on top, chutney on side..."
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-[#d3c3c0] bg-white focus:outline-none focus:border-[#c86d3b] focus:ring-1 focus:ring-[#c86d3b]"
            />
          </div>
        </div>

        {/* Modal Footer with Quantity and Add Button */}
        <div className="p-4 sm:p-5 bg-[#f0eded] border-t border-[#e5e2e1] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-white rounded-xl border border-[#d3c3c0] p-1 shadow-sm">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#271310] hover:bg-[#f0eded] disabled:opacity-40 transition-colors cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-6 text-center font-bold text-sm text-[#271310]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#271310] hover:bg-[#f0eded] transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleAdd}
            className={`flex-1 py-3.5 px-6 rounded-xl font-sans font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-300 shadow-md cursor-pointer ${
              addedAnimation
                ? 'bg-emerald-700 text-white'
                : 'bg-[#271310] hover:bg-[#3e2723] text-white active:scale-95'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-5 h-5" />
                <span>Added to Order!</span>
              </>
            ) : (
              <>
                <span>Add to Order</span>
                <span>•</span>
                <span>${grandTotal.toFixed(2)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
