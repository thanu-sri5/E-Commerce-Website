export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 overflow-hidden shadow-sm animate-pulse">
      {/* Image Area */}
      <div className="relative aspect-square w-full bg-zinc-200 dark:bg-zinc-800" />
      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1 gap-2.5">
        {/* Category & Badge */}
        <div className="flex items-center justify-between">
          <div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
          <div className="h-5 w-12 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
        </div>
        {/* Title */}
        <div className="h-5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-md" />
        <div className="h-5 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
        {/* Rating Row */}
        <div className="flex items-center gap-2 mt-1">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            ))}
          </div>
          <div className="h-3.5 w-8 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
        </div>
        {/* Pricing & Button Row */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-zinc-50 dark:border-zinc-800/50">
          <div className="flex flex-col gap-1">
            <div className="h-6 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
            <div className="h-3.5 w-10 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
          </div>
          <div className="h-9 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(count)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
