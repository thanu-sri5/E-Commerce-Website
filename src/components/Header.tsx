import { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Laptop, 
  Shirt, 
  Home, 
  Sparkles, 
  Dumbbell, 
  LayoutGrid, 
  Store
} from 'lucide-react';
import { CATEGORIES } from '../data';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  cartCount: number;
  wishlistCount: number;
  darkMode: boolean;
  toggleDarkMode: () => void;
  currentView: 'home' | 'cart' | 'wishlist';
  setCurrentView: (view: 'home' | 'cart' | 'wishlist') => void;
  onOpenCartDrawer: () => void;
  onOpenWishlistDrawer: () => void;
}

export default function Header({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  cartCount,
  wishlistCount,
  darkMode,
  toggleDarkMode,
  currentView,
  setCurrentView,
  onOpenCartDrawer,
  onOpenWishlistDrawer
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Helper to resolve dynamic lucide icons
  const renderCategoryIcon = (iconName: string) => {
    const iconClass = "w-4 h-4 shrink-0";
    switch (iconName) {
      case 'Laptop': return <Laptop className={iconClass} />;
      case 'Shirt': return <Shirt className={iconClass} />;
      case 'Home': return <Home className={iconClass} />;
      case 'Sparkles': return <Sparkles className={iconClass} />;
      case 'Dumbbell': return <Dumbbell className={iconClass} />;
      default: return <LayoutGrid className={iconClass} />;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-100 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md transition-colors duration-300">
      {/* Upper Bar: Brand, Search, Action Buttons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <button 
          onClick={() => {
            setCurrentView('home');
            setActiveCategory('all');
            setSearchQuery('');
          }}
          className="flex items-center gap-2 text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-white hover:opacity-90 transition-all cursor-pointer"
          id="logo-button"
        >
          <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white shadow-md shadow-rose-500/20">
            <Store className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span className="bg-gradient-to-r from-zinc-900 via-rose-500 to-amber-500 bg-clip-text text-transparent dark:from-white dark:via-rose-400 dark:to-amber-400">
            ShopSphere
          </span>
        </button>

        {/* Desktop Search Engine */}
        <div className="hidden md:flex flex-1 max-w-lg relative">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search premium electronics, style, kitchen tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 dark:text-zinc-100 transition-all shadow-inner"
              id="desktop-search-input"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-400 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 rounded-full hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Action Widgets */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          
          {/* Light/Dark Mode Switcher */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all cursor-pointer"
            title="Toggle theme"
            id="theme-toggle"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Wishlist Icon */}
          <button
            onClick={onOpenWishlistDrawer}
            className="relative p-2.5 rounded-xl text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all cursor-pointer"
            title="Wishlist"
            id="wishlist-button"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-zinc-950 animate-bounce">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Icon Drawer Trigger */}
          <button
            onClick={onOpenCartDrawer}
            className="relative p-2.5 rounded-xl text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all cursor-pointer"
            title="Shopping Cart"
            id="cart-button"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 text-[10px] font-black text-white ring-2 ring-white dark:ring-zinc-950 animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* View Toggle (Home vs Cart full page) */}
          <button
            onClick={() => setCurrentView(currentView === 'cart' ? 'home' : 'cart')}
            className={`hidden sm:flex items-center gap-1.5 px-4 h-11 rounded-xl text-sm font-semibold transition-all shadow-sm border cursor-pointer ${
              currentView === 'cart'
                ? 'bg-gradient-to-tr from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white border-transparent'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
            }`}
            id="cart-page-toggle"
          >
            <span>{currentView === 'cart' ? 'Browse Products' : 'View Full Cart'}</span>
          </button>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
            aria-label="Toggle mobile menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Dynamic Secondary Bar: Category Pills */}
      <div className="border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar scroll-smooth">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id && currentView === 'home';
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCurrentView('home');
                    setActiveCategory(cat.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-sm shadow-zinc-950/10'
                      : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200/60 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100'
                  }`}
                  id={`cat-pill-${cat.id}`}
                >
                  {renderCategoryIcon(cat.icon)}
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Search & Menu Drawers */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-4 space-y-4 shadow-xl">
          {/* Mobile Search Bar */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search ShopSphere products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 dark:text-zinc-100"
              id="mobile-search-input"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-400 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 rounded-full"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <button
              onClick={() => {
                setCurrentView('cart');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 h-11 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white text-sm font-semibold shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Full Cart ({cartCount})</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('home');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-sm font-semibold border border-zinc-200/50 dark:border-zinc-700/50"
            >
              <span>Shop All</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
