import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShoppingCart, Plus, Minus, Heart, ChevronLeft, ChevronRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, size?: string, color?: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export default function ProductDetailsModal({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted
}: ProductDetailsModalProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  // Reset internal states when product changes
  useEffect(() => {
    if (product) {
      setActiveImageIdx(0);
      setQuantity(1);
      setSelectedSize(product.sizes ? product.sizes[0] : '');
      setSelectedColor(product.colors ? product.colors[0] : '');
    }
  }, [product]);

  if (!product) return null;

  const handleNextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedSize, selectedColor);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative bg-white dark:bg-zinc-900 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden z-10 border border-zinc-100 dark:border-zinc-800"
          id="product-details-modal"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-350 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            id="close-modal-button"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Grid Layout (Left: Product Media, Right: Info Block) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:divide-x md:divide-zinc-100 md:dark:divide-zinc-800">
            
            {/* Left Column: Image Area & Carousel */}
            <div className="p-6 flex flex-col justify-center bg-zinc-50/50 dark:bg-zinc-950/20">
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                <img
                  src={product.images[activeImageIdx]}
                  alt={`${product.title} view ${activeImageIdx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                {/* Left/Right Navigation inside main image */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 hover:bg-white dark:hover:bg-zinc-950 text-zinc-800 dark:text-zinc-200 shadow-md transition-all cursor-pointer"
                      aria-label="Previous view"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 hover:bg-white dark:hover:bg-zinc-950 text-zinc-800 dark:text-zinc-200 shadow-md transition-all cursor-pointer"
                      aria-label="Next view"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Mini Thumbnails Selector */}
              {product.images.length > 1 && (
                <div className="flex gap-2.5 mt-4 justify-center overflow-x-auto">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        idx === activeImageIdx
                          ? 'border-rose-500 scale-105 shadow-sm'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Information details */}
            <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[90vh] md:max-h-none overflow-y-auto">
              <div>
                {/* Meta details (Category & Wishlist status) */}
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="text-xs uppercase font-black tracking-widest text-zinc-400 dark:text-zinc-500">
                    {product.category.replace('-', ' ')}
                  </span>
                  
                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`flex items-center gap-1.5 text-xs font-semibold cursor-pointer py-1 px-2.5 rounded-lg border ${
                      isWishlisted
                        ? 'bg-rose-50 border-rose-200/50 text-rose-500 dark:bg-rose-950/20 dark:border-rose-900/30'
                        : 'bg-zinc-50 border-zinc-200/40 dark:bg-zinc-800 dark:border-zinc-750 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                    <span>{isWishlisted ? 'Saved to wishlist' : 'Save to wishlist'}</span>
                  </button>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight leading-tight mb-3">
                  {product.title}
                </h2>

                {/* Star Rating Panel */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-amber-400 fill-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? 'fill-current text-amber-400' : 'text-zinc-200 dark:text-zinc-700'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 font-mono">
                    {product.rating}
                  </span>
                  <span className="text-sm text-zinc-400">
                    ({product.reviewsCount} customer reviews)
                  </span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-100/50 dark:border-zinc-850 mb-5">
                  <span className="text-2xl font-black text-zinc-900 dark:text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm font-semibold text-zinc-400 dark:text-zinc-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded-md">
                    Save {product.discount}%
                  </span>
                </div>

                {/* Product Long Description */}
                <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Variation Selection Options (Sizes / Colors) */}
                <div className="space-y-4 mb-6">
                  {/* Color Selector */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">
                        Select Color: <span className="text-zinc-700 dark:text-zinc-300 font-bold">{selectedColor}</span>
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {product.colors.map((color) => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                              selectedColor === color
                                ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100'
                                : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Size Selector */}
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">
                        Select Size: <span className="text-zinc-700 dark:text-zinc-300 font-bold">{selectedSize}</span>
                      </span>
                      <div className="flex gap-2">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`w-10 h-10 rounded-lg text-xs font-extrabold border flex items-center justify-center transition-all cursor-pointer ${
                              selectedSize === size
                                ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100'
                                : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Actions Frame: Quantity Selector & Add to Cart */}
              <div className="border-t border-zinc-100 dark:border-zinc-800 pt-5 mt-4 space-y-4">
                {/* Quantity Controls */}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                    Quantity
                  </span>
                  
                  <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/40">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2.5 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-850 transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 font-mono font-bold text-sm text-zinc-850 dark:text-zinc-100">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                      className="p-2.5 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-850 transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Primary CTA Add To Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-sm shadow-lg shadow-rose-500/10 cursor-pointer transition-all hover:-translate-y-0.5 active:translate-y-0"
                  id={`add-to-cart-modal-${product.id}`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add To Cart • ${(product.price * quantity).toFixed(2)}</span>
                </button>

                {/* Mini Trust Policy Ribbons */}
                <div className="grid grid-cols-3 gap-2 text-[10px] text-zinc-400 dark:text-zinc-500 font-bold pt-1.5 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <Truck className="w-4 h-4 text-zinc-400 shrink-0" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <RefreshCw className="w-4 h-4 text-zinc-400 shrink-0" />
                    <span>30-Day Returns</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-zinc-400 shrink-0" />
                    <span>Secure Checkout</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
