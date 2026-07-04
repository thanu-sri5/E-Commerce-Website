import React from 'react';
import { Eye, Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onQuickView: (product: Product) => void;
  key?: string;
}

export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onQuickView
}: ProductCardProps) {
  
  // Render Stars
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />);
      } else if (i === fullStars + 1 && hasHalf) {
        stars.push(
          <div key={i} className="relative inline-block w-3.5 h-3.5 shrink-0">
            <Star className="absolute top-0 left-0 w-3.5 h-3.5 text-zinc-200 dark:text-zinc-700" />
            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="w-3.5 h-3.5 text-zinc-200 dark:text-zinc-700 shrink-0" />);
      }
    }
    return stars;
  };

  return (
    <div 
      className="group flex flex-col rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 overflow-hidden shadow-sm hover:shadow-xl dark:hover:shadow-zinc-900/10 hover:-translate-y-1 transition-all duration-300"
      id={`product-card-${product.id}`}
    >
      {/* Product Image Area with Actions Overlay */}
      <div className="relative aspect-square w-full overflow-hidden bg-zinc-50 dark:bg-zinc-800/30">
        <img
          src={product.image}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Labels Overlay */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
          {product.discount > 0 && (
            <span className="px-2.5 py-1 text-[10px] font-black tracking-wider text-white bg-gradient-to-r from-rose-500 to-amber-500 rounded-lg shadow-sm">
              {product.discount}% OFF
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 text-[10px] font-black tracking-wider text-white bg-emerald-500 rounded-lg shadow-sm">
              NEW ARRIVAL
            </span>
          )}
          {product.isTrending && (
            <span className="px-2.5 py-1 text-[10px] font-black tracking-wider text-white bg-blue-500 rounded-lg shadow-sm">
              TRENDING
            </span>
          )}
        </div>

        {/* Floating Quick Action Buttons on Hover */}
        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2.5 z-10">
          <button
            onClick={() => onQuickView(product)}
            className="p-3 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 hover:bg-rose-500 hover:text-white rounded-xl shadow-md transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
            title="Quick view product"
            id={`quickview-btn-${product.id}`}
          >
            <Eye className="w-4.5 h-4.5" />
          </button>
          
          <button
            onClick={() => onToggleWishlist(product)}
            className={`p-3 rounded-xl shadow-md transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 cursor-pointer ${
              isWishlisted
                ? 'bg-rose-500 text-white hover:bg-rose-600'
                : 'bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 hover:bg-rose-500 hover:text-white'
            }`}
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            id={`wishlist-btn-${product.id}`}
          >
            <Heart className={`w-4.5 h-4.5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Description Content */}
      <div className="p-4 flex flex-col flex-1 gap-1.5">
        
        {/* Category Header */}
        <div className="flex items-center justify-between text-[10px] uppercase font-black tracking-widest text-zinc-400 dark:text-zinc-500">
          <span>{product.category.replace('-', ' ')}</span>
          {product.stock <= 5 && (
            <span className="text-rose-500 font-bold">Only {product.stock} left</span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-zinc-800 dark:text-zinc-100 text-sm sm:text-base line-clamp-2 h-10 sm:h-12 leading-snug group-hover:text-rose-500 transition-colors">
          {product.title}
        </h3>

        {/* Star Rating Section */}
        <div className="flex items-center gap-1.5 mt-0.5">
          <div className="flex gap-0.5">
            {renderStars(product.rating)}
          </div>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold font-mono">
            {product.rating}
          </span>
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            ({product.reviewsCount})
          </span>
        </div>

        {/* Pricing & Cart Button Row */}
        <div className="flex items-end justify-between mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-850">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-zinc-400 dark:text-zinc-500 line-through leading-none">
              ${product.originalPrice.toFixed(2)}
            </span>
            <span className="text-lg font-black text-zinc-900 dark:text-white leading-tight mt-0.5">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center justify-center gap-1.5 px-4 h-9.5 rounded-xl bg-zinc-50 hover:bg-gradient-to-tr hover:from-rose-500 hover:to-amber-500 dark:bg-zinc-800 dark:hover:bg-rose-500 hover:text-white text-zinc-700 dark:text-zinc-300 font-bold text-xs border border-zinc-200/50 dark:border-zinc-700/50 hover:border-transparent transition-all duration-300 cursor-pointer"
            id={`add-to-cart-grid-${product.id}`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>

      </div>
    </div>
  );
}
