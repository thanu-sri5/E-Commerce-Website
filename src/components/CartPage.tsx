import React, { useState } from 'react';
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus, Tag, Check, Award, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { CartItem } from '../types';

interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  onRemoveItem: (productId: string, size?: string, color?: string) => void;
  onClearCart: () => void;
  onAddToast: (message: string, type: 'success' | 'info' | 'error') => void;
  onNavigateToHome: () => void;
}

export default function CartPage({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onAddToast,
  onNavigateToHome
}: CartPageProps) {
  const [couponCode, setCouponCode] = useState('');
  const [activeDiscount, setActiveDiscount] = useState<{ code: string; percent: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = activeDiscount ? (subtotal * activeDiscount.percent) / 100 : 0;
  const estTax = (subtotal - discountAmount) * 0.08; // 8% sales tax
  const grandTotal = subtotal - discountAmount + estTax;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.toUpperCase().trim();

    if (code === 'WELCOME10') {
      setActiveDiscount({ code: 'WELCOME10', percent: 10 });
      onAddToast('Coupon WELCOME10 applied! 10% discount added.', 'success');
      setCouponCode('');
    } else if (code === 'SPHERE20' || code === 'FESTIVE20') {
      setActiveDiscount({ code: code, percent: 20 });
      onAddToast(`Coupon ${code} applied! 20% discount added.`, 'success');
      setCouponCode('');
    } else if (code === '') {
      setCouponError('Please enter a coupon code.');
    } else {
      setCouponError('Invalid coupon code. Try WELCOME10 or FESTIVE20.');
    }
  };

  const handleRemoveCoupon = () => {
    setActiveDiscount(null);
    onAddToast('Coupon removed.', 'info');
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      onClearCart();
      onAddToast('Order placed successfully! Thank you for shopping with ShopSphere.', 'success');
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 flex items-center justify-center border border-emerald-100 dark:border-emerald-900 mx-auto animate-bounce">
          <Check className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            Order Confirmed!
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
            Your payment was securely processed and your order is being prepared. We have sent a confirmation email with delivery tracking details.
          </p>
        </div>
        <div className="p-4 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 max-w-xs mx-auto">
          <span className="text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">
            Estimated Delivery
          </span>
          <span className="text-sm font-extrabold text-zinc-800 dark:text-zinc-200 mt-1 block">
            July 8th - July 10th, 2026
          </span>
        </div>
        <button
          onClick={() => {
            setOrderComplete(false);
            onNavigateToHome();
          }}
          className="inline-flex items-center gap-2 px-6 h-12 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white font-bold text-sm shadow-md shadow-rose-500/10 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Title Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onNavigateToHome}
          className="p-2 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          title="Back to products"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            Your Shopping Cart
          </h1>
          <p className="text-xs text-zinc-400 font-medium">
            Review your selected products and checkout securely
          </p>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 max-w-md mx-auto space-y-5">
          <div className="w-20 h-20 rounded-full bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center border border-zinc-100 dark:border-zinc-800 mx-auto">
            <ShoppingBag className="w-9 h-9 text-zinc-400" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-xl font-black text-zinc-800 dark:text-zinc-100 tracking-tight">
              Your cart is empty
            </h3>
            <p className="text-sm text-zinc-400">
              Looks like you haven't added any products to your cart yet. Head back to our main store to explore premium choices!
            </p>
          </div>
          <button
            onClick={onNavigateToHome}
            className="inline-flex items-center gap-2 px-6 h-12 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white font-bold text-sm shadow-md cursor-pointer"
          >
            <span>Start Shopping</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Block: Product Item Cards */}
          <div className="lg:col-span-2 space-y-4">
            
            <div className="flex justify-between items-center pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                Items ({cartItems.length})
              </span>
              <button
                onClick={() => {
                  onClearCart();
                  onAddToast('Cart cleared successfully.', 'info');
                }}
                className="text-xs font-bold text-rose-500 hover:text-rose-600 hover:underline transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All Items</span>
              </button>
            </div>

            {cartItems.map((item, index) => (
              <div
                key={`${item.product.id}-${item.selectedSize || ''}-${item.selectedColor || ''}-${index}`}
                className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 hover:shadow-md transition-all"
                id={`cart-page-item-${item.product.id}`}
              >
                {/* Product Image */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-800/30 shrink-0 border border-zinc-100 dark:border-zinc-800">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details Column */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold text-zinc-800 dark:text-zinc-100 text-base sm:text-lg line-clamp-2">
                        {item.product.title}
                      </h3>
                      <button
                        onClick={() => onRemoveItem(item.product.id, item.selectedSize, item.selectedColor)}
                        className="p-1.5 text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl transition-colors shrink-0 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>

                    <p className="text-xs font-black tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mt-1">
                      {item.product.category.replace('-', ' ')}
                    </p>

                    {/* Variations */}
                    {(item.selectedSize || item.selectedColor) && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.selectedSize && (
                          <span className="px-2.5 py-0.5 text-xs font-extrabold text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                            Size: {item.selectedSize}
                          </span>
                        )}
                        {item.selectedColor && (
                          <span className="px-2.5 py-0.5 text-xs font-extrabold text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                            Color: {item.selectedColor}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Quantity Actions & Prices */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-50 dark:border-zinc-800/50">
                    <div className="flex items-center border border-zinc-200 dark:border-zinc-850 rounded-xl overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/20">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                        className="p-2 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 font-mono font-bold text-sm text-zinc-800 dark:text-zinc-200">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                        className="p-2 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex flex-col text-right">
                      <span className="text-xs text-zinc-400 font-semibold font-mono">
                        ${item.product.price.toFixed(2)} each
                      </span>
                      <span className="text-base sm:text-lg font-black text-zinc-900 dark:text-white mt-0.5 font-mono">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Right Block: Summary Calculations & Checkout */}
          <div className="space-y-6">
            
            {/* Coupon Code Panel */}
            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
              <h3 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-wider mb-3.5 flex items-center gap-2">
                <Tag className="w-4.5 h-4.5 text-rose-500" />
                <span>Promo Coupon Code</span>
              </h3>
              
              {activeDiscount ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-extrabold font-mono">
                      {activeDiscount.code} APPLIED (-{activeDiscount.percent}%)
                    </span>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-xs font-black hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. WELCOME10, FESTIVE20"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 dark:text-zinc-100"
                    />
                    <button
                      type="submit"
                      className="px-4 h-10 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[10px] font-bold text-rose-500">{couponError}</p>
                  )}
                  <p className="text-[10px] text-zinc-400 font-bold">
                    *Apply coupon <span className="text-rose-400 font-extrabold font-mono">WELCOME10</span> (10% off) or <span className="text-rose-400 font-extrabold font-mono">FESTIVE20</span> (20% off)
                  </p>
                </form>
              )}
            </div>

            {/* Calculations Panel */}
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 space-y-4">
              <h3 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-800 pb-3">
                Order Summary
              </h3>

              <div className="space-y-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                <div className="flex justify-between">
                  <span>Cart Subtotal</span>
                  <span className="font-mono font-bold text-zinc-800 dark:text-zinc-200">${subtotal.toFixed(2)}</span>
                </div>
                
                {activeDiscount && (
                  <div className="flex justify-between text-emerald-500">
                    <span>Coupon Discount ({activeDiscount.percent}%)</span>
                    <span className="font-mono font-bold">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-mono font-bold text-zinc-800 dark:text-zinc-200">${estTax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping Cost</span>
                  <span className="font-mono font-bold text-emerald-500">FREE</span>
                </div>
              </div>

              <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 flex justify-between items-baseline">
                <span className="text-sm font-black text-zinc-900 dark:text-white">Grand Total</span>
                <span className="text-2xl font-black text-zinc-900 dark:text-white font-mono">${grandTotal.toFixed(2)}</span>
              </div>

              {/* Secure Checkout button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white font-bold text-sm shadow-lg shadow-rose-500/10 cursor-pointer disabled:opacity-50 hover:from-rose-600 hover:to-amber-600 transition-all hover:-translate-y-0.5 active:translate-y-0 mt-2"
                id="checkout-page-button"
              >
                {isCheckingOut ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Secure Checkout...</span>
                  </span>
                ) : (
                  <>
                    <ShieldCheck className="w-4.5 h-4.5" />
                    <span>Pay & Place Order</span>
                  </>
                )}
              </button>

              {/* Trust policy banners */}
              <div className="border-t border-zinc-50 dark:border-zinc-850 pt-5 space-y-3.5">
                <div className="flex gap-3 text-xs text-zinc-500">
                  <Truck className="w-5 h-5 text-zinc-400 shrink-0" />
                  <div>
                    <span className="font-bold text-zinc-800 dark:text-zinc-200 block">Free Expedited Delivery</span>
                    <span className="text-[10px] text-zinc-400 block">Fast courier shipping on all local orders.</span>
                  </div>
                </div>
                <div className="flex gap-3 text-xs text-zinc-500">
                  <RefreshCw className="w-5 h-5 text-zinc-400 shrink-0" />
                  <div>
                    <span className="font-bold text-zinc-800 dark:text-zinc-200 block">Easy 30-Day Money-back</span>
                    <span className="text-[10px] text-zinc-400 block">Not satisfied? Return it in original packing.</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
