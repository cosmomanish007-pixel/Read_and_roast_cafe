import { useState, useEffect } from 'react';
import { PageId, MenuItem, CartItem } from './types';
import Navbar from './components/Navbar';
import StickyBottomNav from './components/StickyBottomNav';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import HomeView from './views/HomeView';
import MenuView from './views/MenuView';
import GamesView from './views/GamesView';
import StudentHubView from './views/StudentHubView';
import BookTableView from './views/BookTableView';
import PortalView from './views/PortalView';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const savedTheme = localStorage.getItem('rar_theme');
      return (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'dark';
    } catch {
      return 'dark';
    }
  });

  // Apply theme class to document element
  useEffect(() => {
    try {
      const root = window.document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      }
      localStorage.setItem('rar_theme', theme);
    } catch (e) {
      console.warn('Failed to set theme class', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Load cart from localStorage for persistence on page refreshing
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('rar_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.warn('Failed to load cart state', e);
    }
  }, []);

  // Save cart to localStorage whenever it is updated
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem('rar_cart', JSON.stringify(newCart));
    } catch (e) {
      console.warn('Failed to save cart state', e);
    }
  };

  const handleAddToCart = (item: MenuItem) => {
    const existingIndex = cart.findIndex((cartItem) => cartItem.menuItem.id === item.id);
    let updatedCart: CartItem[] = [];

    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart = [...cart, { menuItem: item, quantity: 1 }];
    }

    saveCart(updatedCart);
    setCartDrawerOpen(true); // Automatically slide open cart summary drawer
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    let updatedCart: CartItem[] = [];

    if (newQty <= 0) {
      updatedCart = cart.filter((item) => item.menuItem.id !== itemId);
    } else {
      updatedCart = cart.map((item) => {
        if (item.menuItem.id === itemId) {
          return { ...item, quantity: newQty };
        }
        return item;
      });
    }

    saveCart(updatedCart);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  // Main page renderer
  const renderCurrentView = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView setCurrentPage={setCurrentPage} onAddToCart={handleAddToCart} />;
      case 'menu':
        return <MenuView onAddToCart={handleAddToCart} />;
      case 'games':
        return <GamesView />;
      case 'students':
        return <StudentHubView />;
      case 'book':
        return <BookTableView />;
      case 'portal':
        return <PortalView onAddToCart={handleAddToCart} setCurrentPage={setCurrentPage} />;
      default:
        return <HomeView setCurrentPage={setCurrentPage} onAddToCart={handleAddToCart} />;
    }
  };

  return (
    <div className="min-h-screen bg-forest-950 text-cream-100 flex flex-col justify-between selection:bg-gold-500 selection:text-forest-950 transition-colors duration-300">
      
      {/* Top sticky Navbar */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cart={cart}
        onOpenCart={() => setCartDrawerOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-20 lg:pb-0">
        {renderCurrentView()}
      </main>

      {/* Site-wide Footer */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Slide-out Order Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      {/* Sticky Bottom Bar for mobile devices */}
      <StickyBottomNav
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* Hovering WhatsApp button */}
      <FloatingWhatsApp />

    </div>
  );
}
