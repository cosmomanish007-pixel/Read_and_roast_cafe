import { ShoppingBag, BookOpen, Menu, X, Landmark, Compass, UserCheck, Sun, Moon } from 'lucide-react';
import { PageId, CartItem } from '../types';
import { useState } from 'react';
import ReadRoastLogo from './ReadRoastLogo';

interface NavbarProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  cart: CartItem[];
  onOpenCart: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function Navbar({
  currentPage,
  setCurrentPage,
  cart,
  onOpenCart,
  theme,
  onToggleTheme,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Filterable Menu' },
    { id: 'games', label: 'Books & Games' },
    { id: 'students', label: 'Student Hub' },
    { id: 'book', label: 'Book Table' },
  ] as const;

  const handleNavClick = (pageId: PageId) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      id="rar-main-navbar"
      className="sticky top-0 z-40 bg-forest-950/90 backdrop-blur-md border-b border-gold-500/10 shadow-xl transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand Brand */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="transition-transform duration-300 group-hover:rotate-12">
              <ReadRoastLogo size="sm" className="bg-transparent text-gold-500 fill-current" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif font-bold text-2xl tracking-wider text-cream-50 group-hover:text-gold-400 transition-colors">
                  READ & ROAST
                </span>
                <span className="font-serif text-xs font-semibold text-gold-500 tracking-widest uppercase">
                  RAR
                </span>
              </div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-emerald-500 flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                100% Vegetarian • Near Sanjivani
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium tracking-wide transition-all duration-300 ${
                  currentPage === link.id
                    ? 'text-forest-950 bg-gold-400 border border-gold-300/40 font-semibold shadow-inner'
                    : 'text-cream-200 hover:text-gold-400 hover:bg-forest-900/60'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Cart, Theme & Quick Actions */}
          <div className="flex items-center gap-3">
            
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2.5 rounded-full bg-forest-900/80 border border-gold-500/20 hover:border-gold-500 text-cream-100 hover:text-gold-400 transition-all duration-300 flex items-center justify-center shadow-md group hover:scale-105"
              aria-label="Toggle visual theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 transition-transform group-hover:rotate-45" />
              ) : (
                <Moon className="w-5 h-5 transition-transform group-hover:-rotate-12" />
              )}
            </button>

            {/* Cart Button */}
            <button
              id="navbar-cart-btn"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-forest-900/80 border border-gold-500/20 hover:border-gold-500 text-cream-100 hover:text-gold-400 transition-all duration-300 flex items-center justify-center shadow-md group hover:scale-105"
              aria-label="View shopping cart"
            >
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-500 text-forest-950 text-[10px] font-mono font-bold w-5 h-5 rounded-full border border-forest-900 flex items-center justify-center animate-bounce">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* Mobile menu toggle (large screens hides it) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-md lg:hidden text-cream-200 hover:text-gold-400 hover:bg-forest-900 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-panel"
          className="lg:hidden border-t border-forest-900 bg-forest-950 shadow-2xl transition-all duration-300"
        >
          <div className="px-2 pt-3 pb-6 space-y-1.5 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-serif font-medium tracking-wide transition-all ${
                  currentPage === link.id
                    ? 'text-forest-950 bg-gold-500 font-semibold'
                    : 'text-cream-200 hover:text-gold-400 hover:bg-forest-900'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
