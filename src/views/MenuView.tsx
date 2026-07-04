import { Search, Info, Plus, Coffee, Sparkles } from 'lucide-react';
import { MenuItem } from '../types';
import { useState, useMemo } from 'react';
import { MENU_ITEMS } from '../data/mockData';

interface MenuViewProps {
  onAddToCart: (item: MenuItem) => void;
}

const CATEGORIES = [
  'All',
  'Appetizers',
  'Pizzas',
  'Burgers',
  'Sandwiches',
  'Wraps & Rolls',
  'Pastas',
  'Coffee & Espresso',
  'Frappe & Shakes',
  'Mocktails',
  'Maggi',
  'Desserts',
  'Drinks',
  'Combos',
];

export default function MenuView({ onAddToCart }: MenuViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter items based on category selection & search query
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div id="rar-menu-view" className="space-y-10 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono font-bold tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          100% Pure Vegetarian Kitchen
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-cream-50">
          The Read & Roast Culinary Guide
        </h1>
        <p className="text-sm text-cream-300 max-w-lg mx-auto leading-relaxed">
          Savor our gourmet collection of 10-inch wood-fired pizzas, handcrafted burgers, cold frappes, and loaded student combos, made fresh to order.
        </p>
      </div>

      {/* Search and Category Filter Suite */}
      <div className="space-y-6 sticky top-20 z-30 bg-forest-950/95 py-4 backdrop-blur-md border-b border-forest-900/60 rounded-xl px-4 shadow-md">
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-500" />
          <input
            type="text"
            placeholder="Search from 80+ delicious items (e.g., Tandoori Paneer, Frappe)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-forest-900 border border-gold-500/10 hover:border-gold-500/30 focus:border-gold-500/60 rounded-lg text-sm text-cream-100 placeholder:text-forest-600 focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono uppercase bg-forest-800 text-cream-300 hover:text-cream-100 px-1.5 py-0.5 rounded"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Chip Row (Horizontally Scrollable) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start lg:justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 whitespace-nowrap shrink-0 border min-h-[40px] flex items-center ${
                activeCategory === cat
                  ? 'bg-gold-500 border-gold-400 text-forest-950 shadow-md font-bold'
                  : 'bg-forest-900 border-gold-500/10 text-cream-200 hover:text-gold-400 hover:border-gold-500/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center text-center space-y-4 rounded-2xl bg-forest-900/20 border border-forest-900/60">
          <Info className="w-10 h-10 text-forest-800" />
          <div>
            <p className="text-cream-300 font-serif text-lg">No culinary items found</p>
            <p className="text-xs text-forest-500 mt-1">Try adjusting your filters or search keywords.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-forest-900 rounded-xl border border-gold-500/10 overflow-hidden shadow-xl flex flex-col justify-between group hover:border-gold-500/25 transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Food Image with Veg Badge */}
                <div className="relative h-56 overflow-hidden bg-forest-950">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600'}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  
                  {/* Category Pill tag */}
                  <span className="absolute top-3 left-3 bg-forest-950/80 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider text-gold-400 border border-gold-500/20">
                    {item.category}
                  </span>

                  {/* Veg Badge */}
                  <span className="absolute top-3 right-3 bg-forest-950/80 backdrop-blur-sm p-1.5 rounded-md border border-emerald-600 flex items-center justify-center">
                    <span className="inline-block w-2.5 h-2.5 border-2 border-emerald-600 p-[1px] rounded-xs shrink-0">
                      <span className="block w-full h-full bg-emerald-600 rounded-full"></span>
                    </span>
                  </span>

                  {item.isPopular && (
                    <div className="absolute bottom-3 left-3 bg-gold-500 text-forest-950 text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded shadow flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      RAR Signature
                    </div>
                  )}
                </div>

                {/* Info block */}
                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-xl font-bold text-cream-50 group-hover:text-gold-400 transition-colors">
                    {item.name}
                  </h3>
                  
                  <p className="text-xs text-cream-300 leading-relaxed font-sans min-h-[40px]">
                    {item.description}
                  </p>

                  {/* Render components list if it is a Combo */}
                  {item.components && (
                    <div className="pt-2.5 space-y-1.5 border-t border-forest-950/40">
                      <h4 className="text-[10px] font-mono uppercase tracking-widest text-gold-400 font-bold">Meal Includes:</h4>
                      <ul className="grid grid-cols-1 gap-1 text-[11px] text-cream-200">
                        {item.components.map((comp, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-gold-400" />
                            <span>{comp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Action bar */}
              <div className="px-6 pb-6 pt-3 border-t border-forest-950/50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-forest-500 font-mono block uppercase">Price</span>
                  <span className="font-mono text-xl font-bold text-gold-400">₹{item.price}</span>
                </div>
                
                <button
                  onClick={() => onAddToCart(item)}
                  className="bg-gold-500 hover:bg-gold-400 text-forest-950 font-serif text-xs font-semibold px-5 py-3 rounded-lg transition-all shadow hover:shadow-gold-500/10 min-h-[44px] min-w-[120px] active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Add to Order</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
