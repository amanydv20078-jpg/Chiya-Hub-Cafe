import React, { useState } from 'react';
import { CartItem, OrderConfirmation } from '../types';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  Coffee,
  Check,
  Tag,
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<'Dine-In' | 'Takeaway' | 'Delivery'>('Dine-In');
  const [tableNumber, setTableNumber] = useState('Table 4');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [tipPercentage, setTipPercentage] = useState<number>(15);
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  
  // Checkout tracking simulation state
  const [orderConfirmation, setOrderConfirmation] = useState<OrderConfirmation | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.itemTotal, 0);
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const taxableTotal = Math.max(0, subtotal - discountAmount);
  const tax = taxableTotal * 0.085; // 8.5% standard tax
  const tipAmount = (taxableTotal * tipPercentage) / 100;
  const finalGrandTotal = taxableTotal + tax + tipAmount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    const code = couponCode.trim().toUpperCase();

    if (code === 'CHIYA10' || code === 'WELCOME10') {
      setAppliedDiscount(10);
      setCouponSuccess('10% Community Discount Applied!');
    } else if (code === 'HIMALAYA20') {
      setAppliedDiscount(20);
      setCouponSuccess('20% Master Artisan Discount Applied!');
    } else {
      setCouponError('Invalid promo code. Try "CHIYA10"');
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setIsProcessing(true);

    setTimeout(() => {
      const order: OrderConfirmation = {
        orderId: `CH-${Math.floor(100000 + Math.random() * 900000)}`,
        customerName: customerName.trim() || 'Valued Guest',
        orderType,
        tableNumber: orderType === 'Dine-In' ? tableNumber : undefined,
        items: [...cartItems],
        subtotal,
        discount: discountAmount,
        tax,
        tip: tipAmount,
        total: finalGrandTotal,
        status: 'Brewing & Baking',
        estimatedTime: orderType === 'Dine-In' ? '8–12 mins' : '15–20 mins',
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setOrderConfirmation(order);
      setIsProcessing(false);
      onClearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-[#fcf9f8] w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-[#e5e2e1] animate-slide-in-right overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#e5e2e1] bg-[#f0eded] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#271310] text-[#ede1cf] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-[#ae8d87]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#271310]">Your Order</h3>
              <p className="text-xs text-[#504442]">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in basket
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white text-[#504442] hover:text-[#271310] border border-[#d3c3c0] flex items-center justify-center hover:bg-[#eadecc] transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Order Confirmation Screen if Order Placed */}
        {orderConfirmation ? (
          <div className="p-6 overflow-y-auto flex-1 flex flex-col justify-between text-center animate-fade-in">
            <div>
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4 animate-bounce">
                <Check className="w-8 h-8" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#c86d3b]">
                Order Confirmed
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#271310] mt-1 mb-2">
                Fresh Brews On The Way!
              </h3>
              <p className="text-xs text-[#504442] mb-6">
                Order <strong className="text-[#271310]">#{orderConfirmation.orderId}</strong> has been received by our baristas and kitchen artisans.
              </p>

              {/* Status Progress Steps */}
              <div className="bg-[#f6f3f2] p-4 rounded-xl border border-[#e5e2e1] mb-6 text-left">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-bold text-[#271310]">Status</span>
                  <span className="bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full font-semibold">
                    ● {orderConfirmation.status}
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Order Placed ({orderConfirmation.createdAt})</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#c86d3b] font-semibold animate-pulse">
                    <Coffee className="w-4 h-4 shrink-0" />
                    <span>Steaming & Brewing in Progress</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#827472]">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>Estimated: {orderConfirmation.estimatedTime}</span>
                  </div>
                </div>
              </div>

              {/* Receipt Summary */}
              <div className="bg-white p-4 rounded-xl border border-[#d3c3c0] text-left text-xs space-y-2 mb-6 shadow-sm">
                <div className="flex justify-between font-bold text-[#271310] border-b border-[#f0eded] pb-2">
                  <span>{orderConfirmation.orderType} {orderConfirmation.tableNumber ? `(${orderConfirmation.tableNumber})` : ''}</span>
                  <span>${orderConfirmation.total.toFixed(2)}</span>
                </div>
                {orderConfirmation.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-[#504442]">
                    <span>{it.quantity}x {it.item.name}</span>
                    <span>${it.itemTotal.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setOrderConfirmation(null);
                onClose();
              }}
              className="w-full bg-[#271310] hover:bg-[#3e2723] text-white py-3.5 rounded-xl font-sans font-bold text-xs md:text-sm tracking-wide transition-colors cursor-pointer"
            >
              Back to Café Menu
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          /* Empty State */
          <div className="p-8 flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-[#f0eded] flex items-center justify-center text-[#827472] mb-4">
              <ShoppingBag className="w-9 h-9 text-[#ae8d87]" />
            </div>
            <h4 className="font-serif text-xl font-bold text-[#271310] mb-2">
              Your Basket is Empty
            </h4>
            <p className="text-xs text-[#504442] max-w-xs mb-6">
              Explore our slow-simmered Himalayan Chiya, artisan coffee, and freshly steamed momos.
            </p>
            <button
              onClick={onClose}
              className="bg-[#271310] text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-[#3e2723] transition-colors cursor-pointer"
            >
              Browse Offerings
            </button>
          </div>
        ) : (
          /* Active Cart List */
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* Order Type Toggle */}
            <div className="bg-[#f0eded] p-1 rounded-xl grid grid-cols-3 gap-1 text-xs font-semibold">
              {(['Dine-In', 'Takeaway', 'Delivery'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setOrderType(type)}
                  className={`py-2 rounded-lg transition-all cursor-pointer ${
                    orderType === type
                      ? 'bg-[#271310] text-white shadow-sm'
                      : 'text-[#504442] hover:text-[#271310]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Context Fields based on order type */}
            {orderType === 'Dine-In' && (
              <div className="flex items-center gap-2 bg-[#f6f3f2] p-2.5 rounded-xl border border-[#e5e2e1] text-xs">
                <span className="font-bold text-[#271310]">Table:</span>
                <select
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="bg-white border border-[#d3c3c0] rounded-lg px-2 py-1 text-xs font-medium text-[#271310] focus:outline-none focus:border-[#c86d3b]"
                >
                  {[
                    'Table 1 (Window)',
                    'Table 2 (Booth)',
                    'Table 3 (Communal)',
                    'Table 4 (Central)',
                    'Table 5 (Terrace)',
                    'Table 6 (Bar Counter)',
                  ].map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Cart Items List */}
            <div className="space-y-3">
              {cartItems.map((cItem) => (
                <div
                  key={cItem.cartId}
                  className="bg-white p-3.5 rounded-xl border border-[#e5e2e1] shadow-sm flex gap-3 items-start justify-between"
                >
                  <img
                    src={cItem.item.image}
                    alt={cItem.item.name}
                    className="w-16 h-16 rounded-lg object-cover shrink-0 bg-[#3e2723]"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif text-sm font-bold text-[#271310] truncate">
                        {cItem.item.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(cItem.cartId)}
                        className="text-[#827472] hover:text-red-600 transition-colors p-0.5 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Customization specifics */}
                    <div className="text-[11px] text-[#655d4f] space-y-0.5 my-1">
                      {cItem.selectedSize && <div>Size: {cItem.selectedSize}</div>}
                      {cItem.temperature && <div>Temp: {cItem.temperature}</div>}
                      {cItem.milkChoice && <div>Milk: {cItem.milkChoice}</div>}
                      {cItem.sweetnessLevel && <div>Sweetness: {cItem.sweetnessLevel}</div>}
                      {cItem.specialNotes && <div className="italic text-[#827472]">"{cItem.specialNotes}"</div>}
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-2 bg-[#f0eded] rounded-lg p-0.5 border border-[#e5e2e1]">
                        <button
                          onClick={() => onUpdateQuantity(cItem.cartId, -1)}
                          className="w-5 h-5 flex items-center justify-center text-[#271310] hover:bg-white rounded transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#271310] px-1">
                          {cItem.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(cItem.cartId, 1)}
                          className="w-5 h-5 flex items-center justify-center text-[#271310] hover:bg-white rounded transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-serif text-sm font-bold text-[#271310]">
                        ${cItem.itemTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} className="pt-2">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#827472] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Promo Code (e.g. CHIYA10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs uppercase bg-white border border-[#d3c3c0] rounded-xl focus:outline-none focus:border-[#c86d3b]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#271310] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#3e2723] transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {couponSuccess && (
                <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                  ✓ {couponSuccess}
                </p>
              )}
              {couponError && (
                <p className="text-[11px] text-red-600 font-medium mt-1">
                  {couponError}
                </p>
              )}
            </form>

            {/* Tip Selection */}
            <div className="bg-[#f6f3f2] p-3 rounded-xl border border-[#e5e2e1]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-[#271310]">Barista & Staff Tip</span>
                <span className="text-xs text-[#655d4f] font-mono">
                  +${tipAmount.toFixed(2)}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 text-xs font-semibold">
                {[10, 15, 20, 0].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTipPercentage(t)}
                    className={`py-1.5 rounded-lg border transition-all cursor-pointer ${
                      tipPercentage === t
                        ? 'bg-[#271310] text-white border-[#271310]'
                        : 'bg-white text-[#504442] border-[#d3c3c0] hover:bg-[#f0eded]'
                    }`}
                  >
                    {t === 0 ? 'No Tip' : `${t}%`}
                  </button>
                ))}
              </div>
            </div>

            {/* Totals Breakdown */}
            <div className="bg-white p-4 rounded-xl border border-[#e5e2e1] space-y-2 text-xs">
              <div className="flex justify-between text-[#504442]">
                <span>Items Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Discount ({appliedDiscount}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#504442]">
                <span>Sales Tax (8.5%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              {tipAmount > 0 && (
                <div className="flex justify-between text-[#504442]">
                  <span>Barista Tip ({tipPercentage}%)</span>
                  <span>${tipAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-[#e5e2e1] flex justify-between font-serif text-base font-bold text-[#271310]">
                <span>Total Due</span>
                <span>${finalGrandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer Checkout CTA */}
        {!orderConfirmation && cartItems.length > 0 && (
          <div className="p-4 bg-[#f0eded] border-t border-[#e5e2e1] space-y-2">
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full bg-[#271310] hover:bg-[#3e2723] text-white py-3.5 rounded-xl font-sans font-bold text-sm tracking-wide shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Placing Order...
                </span>
              ) : (
                <>
                  <span>Place Order • ${finalGrandTotal.toFixed(2)}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-[#827472]">
              Instant confirmation • Prepared fresh in 8–15 minutes
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
