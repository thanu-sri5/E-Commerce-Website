import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveFromWishlist,
  onMoveToCart
}: WishlistDrawerProps) {
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
              id="wishlist-slide-drawer"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-zinc-100 dark:border-zinc-850 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Heart className="w-5 h-5 text-rose-500 fill-current" />
                  <h2 className="text-lg font-black text-zinc-900 dark:text-white tracking-tight">
                    Your Wishlist ({wishlistItems.length})
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-850 cursor-pointer"
                  aria-label="Close wishlist"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Wishlist Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {wishlistItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center border border-zinc-100 dark:border-zinc-800">
                      <Heart className="w-7 h-7 text-zinc-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200">
                        Your wishlist is empty
                      </h3>
                      <p className="text-xs text-zinc-400 max-w-[240px] mt-1">
                        Tap the heart icon on any product to save it here for later.
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-xs cursor-pointer hover:opacity-90"
                    >
                      Explore Products
                    </button>
                  </div>
                ) : (
                  wishlistItems.map((product) => (
                    <div 
                      key={product.id}
                      className="flex gap-4 p-3 rounded-xl border border-zinc-100/80 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-900/10 hover:border-zinc-200/50 transition-all"
                    >
                      {/* Image Thumbnail */}
                      <div className="w-18 h-18 rounded-lg overflow-hidden shrink-0 bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover" 
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-100 line-clamp-1">
                              {product.title}
                            </h4>
                            <button
                              onClick={() => onRemoveFromWishlist(product)}
                              className="text-zinc-400 hover:text-rose-500 p-0.5 transition-colors cursor-pointer"
                              title="Delete from wishlist"
                              aria-label="Delete from wishlist"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 mt-0.5">
                            {product.category.replace('-', ' ')}
                          </p>
                        </div>

                        {/* Actions & Price */}
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-100/50 dark:border-zinc-800/30">
                          <span className="text-sm font-black text-zinc-900 dark:text-white">
                            ${product.price.toFixed(2)}
                          </span>

                          <button
                            onClick={() => onMoveToCart(product)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-rose-500 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-rose-500 dark:hover:text-white font-bold text-[10px] transition-all cursor-pointer"
                          >
                            <ShoppingCart className="w-3 h-3" />
                            <span>Move to Cart</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {wishlistItems.length > 0 && (
                <div className="p-5 border-t border-zinc-100 dark:border-zinc-850">
                  <button
                    onClick={onClose}
                    className="w-full h-11 text-xs font-bold rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Keep Browsing</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
