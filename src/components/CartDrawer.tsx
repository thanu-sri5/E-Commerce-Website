import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  onRemoveItem: (productId: string, size?: string, color?: string) => void;
  onViewFullCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onViewFullCart
}: CartDrawerProps) {
  
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-xs"
          />

          {/* Sliding Content Drawer */}
          <div className="fixed inset-y-0 right-0 max-w-full flex">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-screen max-w-md bg-white dark:bg-zinc-950 shadow-2xl flex flex-col justify-between border-l border-zinc-100 dark:border-zinc-850"
              id="cart-slide-drawer"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-zinc-100 dark:border-zinc-850 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-rose-500" />
                  <h2 className="text-lg font-black text-zinc-900 dark:text-white tracking-tight">
                    Your Shopping Cart ({cartItems.length})
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-850 cursor-pointer"
                  aria-label="Close cart drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center border border-zinc-100 dark:border-zinc-800">
                      <ShoppingBag className="w-7 h-7 text-zinc-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200">
                        Your cart is empty
                      </h3>
                      <p className="text-xs text-zinc-400 max-w-[240px] mt-1">
                        Add items from our catalog to get started with your shopping experience!
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-xs cursor-pointer hover:opacity-90"
                    >
                      Browse Products
                    </button>
                  </div>
                ) : (
                  cartItems.map((item, index) => (
                    <div 
                      key={`${item.product.id}-${item.selectedSize || ''}-${item.selectedColor || ''}-${index}`}
                      className="flex gap-4 p-3 rounded-xl border border-zinc-100/80 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-900/10 hover:border-zinc-200/50 transition-all"
                    >
                      {/* Image Thumbnail */}
                      <div className="w-18 h-18 rounded-lg overflow-hidden shrink-0 bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                        <img 
                          src={item.product.image} 
                          alt={item.product.title} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover" 
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-100 line-clamp-1">
                            {item.product.title}
                          </h4>
                          
                          {/* Variations Tags */}
                          {(item.selectedSize || item.selectedColor) && (
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              {item.selectedSize && (
                                <span className="px-1.5 py-0.5 text-[9px] font-extrabold text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded">
                                  Size: {item.selectedSize}
                                </span>
                              )}
                              {item.selectedColor && (
                                <span className="px-1.5 py-0.5 text-[9px] font-extrabold text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded">
                                  Color: {item.selectedColor}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Quantity Controls & Price */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-white dark:bg-zinc-900">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                              className="p-1 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2.5 font-mono font-bold text-xs text-zinc-800 dark:text-zinc-200">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                              className="p-1 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-xs font-black text-zinc-900 dark:text-white">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => onRemoveItem(item.product.id, item.selectedSize, item.selectedColor)}
                              className="p-1 text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors cursor-pointer"
                              title="Delete item"
                              aria-label="Delete item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer calculations & CTA */}
              {cartItems.length > 0 && (
                <div className="p-5 border-t border-zinc-100 dark:border-zinc-850 space-y-4 bg-zinc-50/50 dark:bg-zinc-950/40">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      <span>Subtotal</span>
                      <span className="font-mono">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      <span>Shipping</span>
                      <span className="font-mono text-emerald-500">Free</span>
                    </div>
                    <div className="flex justify-between text-sm font-black text-zinc-900 dark:text-white pt-2 border-t border-zinc-100 dark:border-zinc-850">
                      <span>Total Amount</span>
                      <span className="font-mono text-lg">${subtotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => {
                        onClose();
                        onViewFullCart();
                      }}
                      className="w-full h-11 text-xs font-bold rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      View Full Cart
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onViewFullCart();
                      }}
                      className="w-full h-11 text-xs font-bold rounded-xl text-white bg-gradient-to-tr from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-rose-500/10 cursor-pointer"
                    >
                      <span>Checkout</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
