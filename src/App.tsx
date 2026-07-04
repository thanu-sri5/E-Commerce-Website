import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductDetailsModal from './components/ProductDetailsModal';
import CartDrawer from './components/CartDrawer';
import CartPage from './components/CartPage';
import WishlistDrawer from './components/WishlistDrawer';
import Toast from './components/Toast';
import { Product, CartItem, ToastMessage } from './types';
import { PRODUCTS } from './data';
import { ProductGridSkeleton } from './components/SkeletonLoader';
import { Filter, SlidersHorizontal, Info, ArrowUpDown } from 'lucide-react';

export default function App() {
  // --- STATE PERSISTENCE IN LOCAL STORAGE ---
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('shopsphere_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistItems, setWishlistItems] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('shopsphere_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('shopsphere_dark_mode');
      return saved ? JSON.parse(saved) === 'true' : true;
    } catch {
      return true;
    }
  });

  // --- NAVIGATION & VIEWS ---
  const [currentView, setCurrentView] = useState<'home' | 'cart' | 'wishlist'>('home');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('trending');

  // --- DRAWERS & MODALS ---
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // --- SKELETON LOADING SIMULATION ---
  const [isLoading, setIsLoading] = useState(false);

  // --- TOAST NOTIFICATIONS ---
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // --- SYNC LOCAL STORAGE ---
  useEffect(() => {
    localStorage.setItem('shopsphere_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('shopsphere_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    localStorage.setItem('shopsphere_dark_mode', String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // --- SIMULATE API LATENCY ON CATEGORY / SORT TRANSITIONS ---
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [activeCategory, sortOption]);

  // --- TOAST CONTROLLERS ---
  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // --- ADD TO CART ACTIONS ---
  const handleAddToCart = (
    product: Product,
    quantity = 1,
    size?: string,
    color?: string
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }

      return [...prev, { product, quantity, selectedSize: size, selectedColor: color }];
    });

    addToast(`Added ${quantity}x ${product.title} to cart.`, 'success');
  };

  const handleUpdateQuantity = (
    productId: string,
    quantity: number,
    size?: string,
    color?: string
  ) => {
    if (quantity < 1) {
      handleRemoveItem(productId, size, color);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId &&
        item.selectedSize === size &&
        item.selectedColor === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string, size?: string, color?: string) => {
    const itemToRemove = cartItems.find(
      (item) =>
        item.product.id === productId &&
        item.selectedSize === size &&
        item.selectedColor === color
    );
    
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
          )
      )
    );

    if (itemToRemove) {
      addToast(`Removed ${itemToRemove.product.title} from cart.`, 'info');
    }
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // --- WISHLIST ACTIONS ---
  const handleToggleWishlist = (product: Product) => {
    const isSaved = wishlistItems.some((item) => item.id === product.id);
    if (isSaved) {
      setWishlistItems((prev) => prev.filter((item) => item.id !== product.id));
      addToast(`Removed ${product.title} from wishlist.`, 'info');
    } else {
      setWishlistItems((prev) => [...prev, product]);
      addToast(`Added ${product.title} to wishlist!`, 'success');
    }
  };

  const handleMoveToCart = (product: Product) => {
    handleAddToCart(
      product,
      1,
      product.sizes ? product.sizes[0] : undefined,
      product.colors ? product.colors[0] : undefined
    );
    setWishlistItems((prev) => prev.filter((item) => item.id !== product.id));
  };

  // --- PRODUCT SEARCH AND FILTER PIPELINE ---
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating-desc':
        return b.rating - a.rating;
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default: // 'trending' / default
        return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
    }
  });

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // --- CTA FROM HERO CLICKS ---
  const handleHeroCtaClick = (category: string) => {
    setCurrentView('home');
    setActiveCategory(category);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      
      {/* Dynamic Navigation Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        cartCount={totalCartCount}
        wishlistCount={wishlistItems.length}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenCartDrawer={() => setIsCartDrawerOpen(true)}
        onOpenWishlistDrawer={() => setIsWishlistDrawerOpen(true)}
      />

      {/* Main Viewport Content */}
      <main className="flex-1 pb-16">
        {currentView === 'home' && (
          <div className="space-y-8">
            {/* Visual Hero Slider */}
            <Hero onCtaClick={handleHeroCtaClick} />

            {/* Products Filters and Listing */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              
              {/* Controls bar: search and sort display */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-850 shadow-sm">
                
                {/* Left: query states */}
                <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                  <Filter className="w-4 h-4 text-rose-500" />
                  {searchQuery ? (
                    <span>
                      Found <strong className="text-zinc-800 dark:text-zinc-100">{sortedProducts.length}</strong> results for "{searchQuery}"
                    </span>
                  ) : (
                    <span>
                      Showing <strong className="text-zinc-800 dark:text-zinc-100">{sortedProducts.length}</strong> premium products
                    </span>
                  )}
                </div>

                {/* Right: sorting options selector */}
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-zinc-400" />
                  <label htmlFor="sort-select" className="text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                    Sort By:
                  </label>
                  <select
                    id="sort-select"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="h-9 px-3 text-xs font-bold rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  >
                    <option value="trending">Trending First</option>
                    <option value="newest">Newest First</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating-desc">Rating: Highest First</option>
                  </select>
                </div>

              </div>

              {/* Grid content container with Skeletons or Cards */}
              {isLoading ? (
                <ProductGridSkeleton count={8} />
              ) : sortedProducts.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-850 rounded-2xl space-y-4">
                  <div className="w-16 h-16 rounded-full bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center border border-zinc-100 dark:border-zinc-800 mx-auto">
                    <Info className="w-7 h-7 text-zinc-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200">
                      No products found
                    </h3>
                    <p className="text-xs text-zinc-400 max-w-sm mx-auto mt-1">
                      We couldn't find matches for your current combination of categories, terms, and filter queries. Try resetting filters.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveCategory('all');
                      setSearchQuery('');
                      setSortOption('trending');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs cursor-pointer shadow-sm shadow-rose-500/10"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" id="product-grid">
                  {sortedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={(prod) => handleAddToCart(prod, 1)}
                      onToggleWishlist={handleToggleWishlist}
                      isWishlisted={wishlistItems.some((item) => item.id === product.id)}
                      onQuickView={(prod) => setSelectedProduct(prod)}
                    />
                  ))}
                </div>
              )}

            </div>
          </div>
        )}

        {/* Full Cart Page View */}
        {currentView === 'cart' && (
          <CartPage
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onAddToast={addToast}
            onNavigateToHome={() => setCurrentView('home')}
          />
        )}
      </main>

      {/* Aesthetic Brand Footer */}
      <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-850 py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            {/* Branding Block */}
            <div className="space-y-4">
              <span className="text-lg font-black bg-gradient-to-r from-zinc-900 to-rose-500 bg-clip-text text-transparent dark:from-white dark:to-rose-400 uppercase tracking-tight">
                ShopSphere Store
              </span>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-[240px]">
                Delivering high-fidelity, designer-grade products across electronics, style apparel, wellness beauty, and active sports gear.
              </p>
            </div>

            {/* Quick Links Column */}
            <div>
              <h4 className="text-xs font-black uppercase text-zinc-500 dark:text-zinc-400 tracking-wider mb-3">
                Shop Categories
              </h4>
              <ul className="space-y-1.5 text-xs font-semibold text-zinc-400">
                <li><button onClick={() => { setCurrentView('home'); setActiveCategory('electronics'); }} className="hover:text-rose-500 cursor-pointer">Premium Electronics</button></li>
                <li><button onClick={() => { setCurrentView('home'); setActiveCategory('fashion'); }} className="hover:text-rose-500 cursor-pointer">Urban Fashion</button></li>
                <li><button onClick={() => { setCurrentView('home'); setActiveCategory('beauty'); }} className="hover:text-rose-500 cursor-pointer">Aesthetic Beauty</button></li>
                <li><button onClick={() => { setCurrentView('home'); setActiveCategory('sports'); }} className="hover:text-rose-500 cursor-pointer">Health & Sports</button></li>
              </ul>
            </div>

            {/* Corporate/Trust Columns */}
            <div>
              <h4 className="text-xs font-black uppercase text-zinc-500 dark:text-zinc-400 tracking-wider mb-3">
                Customer Support
              </h4>
              <ul className="space-y-1.5 text-xs font-semibold text-zinc-400">
                <li className="hover:text-rose-500 cursor-pointer">Track Your Shipping</li>
                <li className="hover:text-rose-500 cursor-pointer">Easy Returns Policy</li>
                <li className="hover:text-rose-500 cursor-pointer">Security Certifications</li>
                <li className="hover:text-rose-500 cursor-pointer">24/7 Helpline Support</li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase text-zinc-500 dark:text-zinc-400 tracking-wider">
                Sphere Club Newsletter
              </h4>
              <p className="text-[10px] text-zinc-400">
                Unlock 15% discount code on joining our exclusive club circle.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter email..."
                  className="h-9 px-3 rounded-lg border border-zinc-250 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-rose-500 w-full"
                />
                <button
                  onClick={() => addToast('Subscribed to ShopSphere Club newsletter!', 'success')}
                  className="px-3.5 h-9 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-bold rounded-lg cursor-pointer"
                >
                  Join
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Trust Payment Badges */}
          <div className="border-t border-zinc-100 dark:border-zinc-850 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-zinc-400 font-medium">
              © 2026 ShopSphere E-Commerce. Built with vanilla styled React & Tailwind CSS. Designed as a production-quality frontend showcase portfolio app.
            </p>
            <div className="flex gap-2 text-xs font-bold text-zinc-400">
              <span className="px-2 py-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded">VISA</span>
              <span className="px-2 py-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded">MASTERCARD</span>
              <span className="px-2 py-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded">APPLE PAY</span>
              <span className="px-2 py-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded">STRIPE</span>
            </div>
          </div>
        </div>
      </footer>

      {/* --- DRAWERS & MODALS SLOTS --- */}
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? wishlistItems.some((item) => item.id === selectedProduct.id) : false}
      />

      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onViewFullCart={() => setCurrentView('cart')}
      />

      <WishlistDrawer
        isOpen={isWishlistDrawerOpen}
        onClose={() => setIsWishlistDrawerOpen(false)}
        wishlistItems={wishlistItems}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToCart={handleMoveToCart}
      />

      {/* Toast Notification Container */}
      <Toast toasts={toasts} onClose={removeToast} />

    </div>
  );
}

