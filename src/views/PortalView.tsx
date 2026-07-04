import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { MenuItem, Book, BoardGame } from '../types';
import { 
  Lock, 
  Mail, 
  User, 
  ShieldCheck, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Plus, 
  Trash2, 
  DollarSign, 
  BookOpen, 
  Gamepad, 
  Bell, 
  Coffee, 
  FileText, 
  Sparkles, 
  MapPin, 
  Check, 
  LogOut,
  Sliders,
  ChevronDown,
  Edit,
  Tag
} from 'lucide-react';

interface PortalViewProps {
  onAddToCart: (item: MenuItem) => void;
  setCurrentPage: (page: any) => void;
}

export default function PortalView({ onAddToCart, setCurrentPage }: PortalViewProps) {
  // Authentication State
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Admin and Customer states
  const [activeTab, setActiveTab] = useState<'orders' | 'menu' | 'books' | 'notifications'>('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  
  // Create / Edit states for Menu and Books
  const [showAddMenuForm, setShowAddMenuForm] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Pizzas & Flatbreads');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemIsVeg, setNewItemIsVeg] = useState(true);
  const [newItemImage, setNewItemImage] = useState('');

  const [showAddBookForm, setShowAddBookForm] = useState(false);
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookAuthor, setNewBookAuthor] = useState('');
  const [newBookGenre, setNewBookGenre] = useState('Classics');
  const [newBookRating, setNewBookRating] = useState('4.8');
  const [newBookImage, setNewBookImage] = useState('');

  // Handle active session loading
  useEffect(() => {
    setSession({
      user: {
        id: 'u-admin',
        email: 'admin@readandroast.com',
        role: 'admin',
        name: 'Admin Curator'
      }
    });
    setLoading(false);
  }, []);

  // Fetch admin and dashboard data when session changes
  useEffect(() => {
    if (session) {
      fetchDashboardData();
    }
  }, [session]);

  const fetchDashboardData = async () => {
    try {
      const { data: ordersData } = await supabase.from('orders').select('*');
      const { data: notifData } = await supabase.from('notifications').select('*');
      const { data: menuData } = await supabase.from('menu_items').select('*');
      const { data: booksData } = await supabase.from('books').select('*');

      if (ordersData) setOrders(ordersData);
      if (notifData) setNotifications(notifData);
      if (menuData) setMenuItems(menuData);
      if (booksData) setBooks(booksData);
    } catch (e) {
      console.error('Error fetching dashboard data:', e);
    }
  };

  // Order status changes (Admin controls)
  const updateOrderStatus = async (orderId: string, newStatus: 'Pending' | 'Preparing' | 'Completed' | 'Cancelled') => {
    await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
    
    // Add simple notification update
    const userRole = session?.user?.role === 'admin' ? 'Cafe Curator' : 'System';
    const alertId = 'notif-' + Math.random().toString(36).substr(2, 9);
    
    const db = JSON.parse(localStorage.getItem('rar_supabase_mock_db') || '{}');
    if (db.notifications) {
      db.notifications.unshift({
        id: alertId,
        title: `Order Status Updated`,
        message: `Order #${orderId} has been marked as "${newStatus}" by ${userRole}.`,
        type: 'info',
        read: false,
        created_at: new Date().toISOString()
      });
      localStorage.setItem('rar_supabase_mock_db', JSON.stringify(db));
    }

    fetchDashboardData();
  };

  // Notification read toggle
  const markNotificationRead = async (id: string) => {
    await supabase.from('notifications').update({ read: true }).eq('id', id);
    fetchDashboardData();
  };

  // Manage Menu item actions
  const handleAddMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !newItemPrice || !newItemDescription) return;

    const newItem: Partial<MenuItem> = {
      id: 'food-' + Math.random().toString(36).substr(2, 5),
      name: newItemName,
      price: parseFloat(newItemPrice),
      category: newItemCategory,
      description: newItemDescription,
      isVeg: newItemIsVeg,
      image: newItemImage || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600'
    };

    await supabase.from('menu_items').insert(newItem);
    
    // Clear Form & Refresh
    setNewItemName('');
    setNewItemPrice('');
    setNewItemDescription('');
    setNewItemImage('');
    setShowAddMenuForm(false);
    fetchDashboardData();
  };

  const handleDeleteMenuItem = async (id: string) => {
    if (confirm('Are you sure you want to remove this culinary masterpiece from the menu?')) {
      await supabase.from('menu_items').delete().eq('id', id);
      fetchDashboardData();
    }
  };

  // Manage Books library actions
  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBookTitle || !newBookAuthor) return;

    const newBook: Partial<Book> = {
      id: 'b-' + Math.random().toString(36).substr(2, 5),
      title: newBookTitle,
      author: newBookAuthor,
      genre: newBookGenre,
      rating: parseFloat(newBookRating) || 4.8,
      image: newBookImage || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400'
    };

    await supabase.from('books').insert(newBook);

    setNewBookTitle('');
    setNewBookAuthor('');
    setNewBookImage('');
    setShowAddBookForm(false);
    fetchDashboardData();
  };

  const handleDeleteBook = async (id: string) => {
    if (confirm('Are you sure you want to delete this book from our physical Kopargaon library shelf?')) {
      await supabase.from('books').delete().eq('id', id);
      fetchDashboardData();
    }
  };

  // Calculated Stats Metrics for Admin
  const stats = {
    totalRevenue: orders
      .filter(o => o.status === 'Completed' && o.type === 'order')
      .reduce((sum, o) => sum + o.total, 0),
    activeOrders: orders.filter(o => o.status === 'Pending' || o.status === 'Preparing').length,
    activeBookings: orders.filter(o => o.type === 'table_reservation' && o.status === 'Pending').length,
    unreadAlerts: notifications.filter(n => !n.read).length
  };

  // Filter current user's personal orders/reservations (for customer role)
  const myActivities = orders.filter(o => 
    !session?.user?.role || 
    session.user.role === 'customer'
  );

  return (
    <div id="rar-portal-view" className="space-y-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 text-cream-100 min-h-[75vh]">
      
      {/* 1. Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 space-y-3">
          <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-mono text-gold-400">Synchronizing database keys with Supabase...</p>
        </div>
      )}

      {/* 3. Portals / Portals Dashboard when Logged In */}
      {!loading && session && (
        <div className="space-y-8">
          
          {/* Header Bar */}
          <div className="bg-forest-900 border border-gold-500/10 p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-left">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-400 text-[10px] font-mono uppercase tracking-widest font-bold">
                  {session.user.role === 'admin' ? 'Cafe Curator Admin' : 'Valued Guest'}
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono text-emerald-500">Supabase Connected</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-cream-50">
                Welcome, {session.user.name || session.user.email}
              </h1>
              <p className="text-xs text-cream-300 leading-relaxed font-sans">
                {session.user.role === 'admin' 
                  ? 'Kopargaon read and roast manager central portal. Add menu items, update books, process reservations and approve notifications.'
                  : 'Track your culinary orders, library borrowing, table seating reserves and college student discount status in real time.'
                }
              </p>
            </div>


          </div>

          {/* ===================================== */}
          {/* A. CAFE CURATOR ADMIN DASHBOARD PANEL */}
          {/* ===================================== */}
          {session.user.role === 'admin' && (
            <div className="space-y-8 text-left animate-fade-in">
              
              {/* Metric Cards Banner Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-forest-900 border border-gold-500/10 p-5 rounded-xl flex items-center gap-4 shadow-md">
                  <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center rounded-lg">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cream-300 block uppercase">Settled Revenue</span>
                    <span className="font-serif text-2xl font-bold text-cream-50">₹{stats.totalRevenue}</span>
                  </div>
                </div>

                <div className="bg-forest-900 border border-gold-500/10 p-5 rounded-xl flex items-center gap-4 shadow-md">
                  <div className="w-12 h-12 bg-gold-500/10 border border-gold-500/20 text-gold-400 flex items-center justify-center rounded-lg animate-pulse">
                    <Coffee className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cream-300 block uppercase">Active Orders</span>
                    <span className="font-serif text-2xl font-bold text-gold-400">{stats.activeOrders}</span>
                  </div>
                </div>

                <div className="bg-forest-900 border border-gold-500/10 p-5 rounded-xl flex items-center gap-4 shadow-md">
                  <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center rounded-lg">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cream-300 block uppercase">Pending Reserves</span>
                    <span className="font-serif text-2xl font-bold text-cream-50">{stats.activeBookings}</span>
                  </div>
                </div>

                <div className="bg-forest-900 border border-gold-500/10 p-5 rounded-xl flex items-center gap-4 shadow-md">
                  <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center rounded-lg">
                    <Bell className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cream-300 block uppercase">Unread Alerts</span>
                    <span className="font-serif text-2xl font-bold text-cream-50">{stats.unreadAlerts}</span>
                  </div>
                </div>
              </div>

              {/* Tab Selector Nav for Admin Dashboard */}
              <div className="border-b border-forest-900 pb-2 flex gap-1 overflow-x-auto scrollbar-none">
                {[
                  { id: 'orders', label: 'Culinary Orders & Reservations', count: orders.length },
                  { id: 'menu', label: 'Manage Cafe Menu', count: menuItems.length },
                  { id: 'books', label: 'Manage Books & Library', count: books.length },
                  { id: 'notifications', label: 'Notification Alerts Inbox', count: stats.unreadAlerts, isAlert: true }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2.5 rounded-md text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap border ${
                      activeTab === tab.id
                        ? 'bg-gold-500 border-gold-400 text-forest-950 font-bold'
                        : 'bg-forest-900 border-gold-500/5 text-cream-300 hover:text-gold-400'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>

              {/* Tab 1 Content: Manage Orders & Reservations */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-cream-50 border-b border-forest-950 pb-2 flex items-center justify-between">
                    <span>Live Order Tracker & Seating Logs</span>
                    <span className="text-xs font-mono font-normal text-cream-400">Manage all customer dining requests</span>
                  </h3>

                  {orders.length === 0 ? (
                    <div className="bg-forest-900 border border-forest-950 p-12 text-center text-sm text-forest-500 rounded-xl">
                      No customer orders or table reservations placed yet. Let's make some!
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {orders.map((o) => (
                        <div 
                          key={o.id}
                          className="bg-forest-900 border border-gold-500/10 p-5 rounded-xl space-y-4 flex flex-col justify-between"
                        >
                          <div className="space-y-2.5">
                            <div className="flex items-center justify-between">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold tracking-wider ${
                                o.type === 'table_reservation' 
                                  ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
                                  : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              }`}>
                                {o.type === 'table_reservation' ? 'Table Reservation' : 'Gourmet Food Order'}
                              </span>
                              <span className="text-[10px] font-mono text-cream-400">
                                {new Date(o.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>

                            <div>
                              <h4 className="font-serif font-bold text-cream-50 text-base">{o.customer_name}</h4>
                              <p className="text-xs font-mono text-cream-300 mt-0.5">{o.phone}</p>
                            </div>

                            {o.type === 'table_reservation' ? (
                              <div className="bg-forest-950/80 p-3 rounded-lg border border-forest-900 text-xs space-y-1">
                                <p className="font-sans text-cream-100 flex justify-between">
                                  <span className="text-gold-400">Reserved For:</span>
                                  <span>{o.date} • {o.time}</span>
                                </p>
                                <p className="font-sans text-cream-100 flex justify-between">
                                  <span className="text-gold-400">Seating Area:</span>
                                  <span>{o.table_id}</span>
                                </p>
                              </div>
                            ) : (
                              <div className="bg-forest-950/80 p-3 rounded-lg border border-forest-900 text-xs space-y-2">
                                <p className="font-mono text-gold-400 text-[10px] uppercase font-bold tracking-wider">Ordered Items:</p>
                                <ul className="space-y-1 text-cream-200">
                                  {o.items.map((it: any, index: number) => (
                                    <li key={index} className="flex justify-between font-sans">
                                      <span>{it.quantity} × {it.menuItem.name}</span>
                                      <span className="font-mono text-gold-500/90">₹{it.menuItem.price * it.quantity}</span>
                                    </li>
                                  ))}
                                </ul>
                                <div className="border-t border-forest-900 pt-2 flex justify-between font-bold text-cream-50">
                                  <span>GRAND TOTAL:</span>
                                  <span className="font-mono text-gold-400">₹{o.total}</span>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="pt-2 border-t border-forest-950/40 flex items-center justify-between gap-2 text-xs">
                            <div className="flex items-center gap-1.5 font-mono">
                              <span className={`w-2 h-2 rounded-full ${
                                o.status === 'Completed' ? 'bg-emerald-500' :
                                o.status === 'Preparing' ? 'bg-amber-500 animate-pulse' :
                                o.status === 'Cancelled' ? 'bg-red-500' : 'bg-cream-400'
                              }`} />
                              <span className="text-cream-300">{o.status}</span>
                            </div>

                            <div className="flex gap-1">
                              {o.status === 'Pending' && (
                                <>
                                  <button
                                    onClick={() => updateOrderStatus(o.id, 'Preparing')}
                                    className="bg-amber-500 hover:bg-amber-400 text-forest-950 px-2.5 py-1 rounded text-[10px] font-mono uppercase font-bold tracking-wider transition-colors"
                                  >
                                    Prepare
                                  </button>
                                  <button
                                    onClick={() => updateOrderStatus(o.id, 'Cancelled')}
                                    className="bg-red-950 text-red-400 border border-red-500/10 hover:bg-red-900 hover:text-white px-2.5 py-1 rounded text-[10px] font-mono uppercase font-bold tracking-wider transition-all"
                                  >
                                    Reject
                                  </button>
                                </>
                              )}
                              {o.status === 'Preparing' && (
                                <button
                                  onClick={() => updateOrderStatus(o.id, 'Completed')}
                                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded text-[10px] font-mono uppercase font-bold tracking-wider transition-colors"
                                >
                                  Complete
                                </button>
                              )}
                              {o.status === 'Completed' && (
                                <span className="text-[10px] text-emerald-500 font-mono flex items-center gap-1">
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  Processed
                                </span>
                              )}
                              {o.status === 'Cancelled' && (
                                <span className="text-[10px] text-red-500 font-mono">
                                  Rejected
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2 Content: Manage Cafe Menu */}
              {activeTab === 'menu' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-forest-950 pb-2">
                    <h3 className="font-serif text-xl font-bold text-cream-50 flex items-center gap-2">
                      <Coffee className="w-5 h-5 text-gold-400" />
                      <span>Culinary Menu Database Editor</span>
                    </h3>
                    <button
                      onClick={() => setShowAddMenuForm(!showAddMenuForm)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold-500 hover:bg-gold-400 text-forest-950 text-xs font-mono font-bold uppercase rounded transition-colors self-start"
                    >
                      <Plus className="w-4 h-4" />
                      <span>ADD NEW DELICACY</span>
                    </button>
                  </div>

                  {/* Add menu item form collapsible */}
                  {showAddMenuForm && (
                    <form 
                      onSubmit={handleAddMenuItem}
                      className="bg-forest-950 p-6 rounded-xl border border-gold-500/10 space-y-4 text-left"
                    >
                      <h4 className="font-serif text-md font-bold text-gold-400">Register New Food Delicacy</h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-cream-400 block">Item Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Sizzling Paneer Tandoori Pizza"
                            value={newItemName}
                            onChange={e => setNewItemName(e.target.value)}
                            className="w-full px-3 py-2 bg-forest-900 border border-gold-500/10 focus:border-gold-500 rounded text-xs focus:outline-none text-cream-100 placeholder:text-forest-600"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-cream-400 block">Price (INR ₹)</label>
                          <input
                            type="number"
                            required
                            placeholder="e.g. 380"
                            value={newItemPrice}
                            onChange={e => setNewItemPrice(e.target.value)}
                            className="w-full px-3 py-2 bg-forest-900 border border-gold-500/10 focus:border-gold-500 rounded text-xs focus:outline-none text-cream-100 placeholder:text-forest-600"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-cream-400 block">Category</label>
                          <select
                            value={newItemCategory}
                            onChange={e => setNewItemCategory(e.target.value)}
                            className="w-full px-3 py-2 bg-forest-900 border border-gold-500/10 focus:border-gold-500 rounded text-xs focus:outline-none text-cream-100"
                          >
                            <option value="Pizzas & Flatbreads">Pizzas & Flatbreads</option>
                            <option value="Pasta & Sides">Pasta & Sides</option>
                            <option value="Cold Coffees & Shakes">Cold Coffees & Shakes</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Maggi">Maggi</option>
                            <option value="Mocktails">Mocktails</option>
                            <option value="Combos">Combos</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-cream-400 block">Image URL (Optional Unsplash path)</label>
                        <input
                          type="text"
                          placeholder="e.g. https://images.unsplash.com/photo-..."
                          value={newItemImage}
                          onChange={e => setNewItemImage(e.target.value)}
                          className="w-full px-3 py-2 bg-forest-900 border border-gold-500/10 focus:border-gold-500 rounded text-xs focus:outline-none text-cream-100 placeholder:text-forest-600"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-cream-400 block">Culinary Description</label>
                        <textarea
                          required
                          rows={2}
                          placeholder="Brief description of tastes, spice level and size (e.g. fresh basil, wood fired, 10-inch)."
                          value={newItemDescription}
                          onChange={e => setNewItemDescription(e.target.value)}
                          className="w-full px-3 py-2 bg-forest-900 border border-gold-500/10 focus:border-gold-500 rounded text-xs focus:outline-none text-cream-100 placeholder:text-forest-600"
                        />
                      </div>

                      <div className="flex items-center gap-4 text-xs pt-1">
                        <span className="text-[10px] font-mono text-cream-400">Dietary Type:</span>
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newItemIsVeg}
                            onChange={e => setNewItemIsVeg(e.target.checked)}
                            className="accent-emerald-500"
                          />
                          <span>100% Vegetarian (Pure Veg)</span>
                        </label>
                      </div>

                      <div className="flex gap-2 justify-end pt-2 text-xs font-mono font-bold uppercase">
                        <button
                          type="button"
                          onClick={() => setShowAddMenuForm(false)}
                          className="px-4 py-2 bg-forest-900 hover:bg-forest-850 rounded text-cream-300 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-forest-950 rounded transition-colors"
                        >
                          Submit to Menu
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Menu items active list table style */}
                  <div className="bg-forest-900 border border-gold-500/10 rounded-xl overflow-hidden shadow-lg">
                    <div className="max-h-[500px] overflow-y-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-forest-950 text-gold-400 font-mono border-b border-forest-900 uppercase text-[9px] tracking-wider">
                            <th className="p-4">Delicacy</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Price</th>
                            <th className="p-4 text-right">Delete</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-forest-950">
                          {menuItems.map((item) => (
                            <tr key={item.id} className="hover:bg-forest-950/40 font-sans transition-all">
                              <td className="p-4 flex items-center gap-3">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-10 h-10 object-cover rounded border border-gold-500/5 shrink-0"
                                  referrerPolicy="no-referrer"
                                />
                                <div>
                                  <span className="font-bold text-cream-50 block">{item.name}</span>
                                  <span className="text-[10px] text-cream-300 block line-clamp-1 mt-0.5">{item.description}</span>
                                </div>
                              </td>
                              <td className="p-4 text-cream-200 font-medium whitespace-nowrap">{item.category}</td>
                              <td className="p-4 font-mono text-gold-400 font-bold whitespace-nowrap">₹{item.price}</td>
                              <td className="p-4 text-right">
                                <button
                                  onClick={() => handleDeleteMenuItem(item.id)}
                                  className="p-1.5 rounded text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-all cursor-pointer"
                                  title="Delete item"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3 Content: Manage Books & Library */}
              {activeTab === 'books' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-forest-950 pb-2">
                    <h3 className="font-serif text-xl font-bold text-cream-50 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-gold-400" />
                      <span>Physical Library Curator Central</span>
                    </h3>
                    <button
                      onClick={() => setShowAddBookForm(!showAddBookForm)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold-500 hover:bg-gold-400 text-forest-950 text-xs font-mono font-bold uppercase rounded transition-colors self-start"
                    >
                      <Plus className="w-4 h-4" />
                      <span>ADD NEW LIBRARY BOOK</span>
                    </button>
                  </div>

                  {/* Add book form collapsible */}
                  {showAddBookForm && (
                    <form 
                      onSubmit={handleAddBook}
                      className="bg-forest-950 p-6 rounded-xl border border-gold-500/10 space-y-4 text-left"
                    >
                      <h4 className="font-serif text-md font-bold text-gold-400">Catalog New Physical Book</h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-cream-400 block">Book Title</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Harry Potter and the Chamber of Secrets"
                            value={newBookTitle}
                            onChange={e => setNewBookTitle(e.target.value)}
                            className="w-full px-3 py-2 bg-forest-900 border border-gold-500/10 focus:border-gold-500 rounded text-xs focus:outline-none text-cream-100 placeholder:text-forest-600"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-cream-400 block">Author Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. J.K. Rowling"
                            value={newBookAuthor}
                            onChange={e => setNewBookAuthor(e.target.value)}
                            className="w-full px-3 py-2 bg-forest-900 border border-gold-500/10 focus:border-gold-500 rounded text-xs focus:outline-none text-cream-100 placeholder:text-forest-600"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-cream-400 block">Genre</label>
                          <select
                            value={newBookGenre}
                            onChange={e => setNewBookGenre(e.target.value)}
                            className="w-full px-3 py-2 bg-forest-900 border border-gold-500/10 focus:border-gold-500 rounded text-xs focus:outline-none text-cream-100"
                          >
                            <option value="Classics">Classics</option>
                            <option value="Sci-Fi & Fantasy">Sci-Fi & Fantasy</option>
                            <option value="Mystery & Thriller">Mystery & Thriller</option>
                            <option value="Rom-Coms">Rom-Coms</option>
                            <option value="Self-Help">Self-Help</option>
                            <option value="Indian Lit">Indian Lit</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-cream-400 block">Book Rating (e.g. 4.8)</label>
                          <input
                            type="number"
                            step="0.1"
                            max="5"
                            placeholder="e.g. 4.8"
                            value={newBookRating}
                            onChange={e => setNewBookRating(e.target.value)}
                            className="w-full px-3 py-2 bg-forest-900 border border-gold-500/10 focus:border-gold-500 rounded text-xs focus:outline-none text-cream-100 placeholder:text-forest-600"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-cream-400 block">Cover Image URL (Optional)</label>
                          <input
                            type="text"
                            placeholder="e.g. https://images.unsplash.com/photo-..."
                            value={newBookImage}
                            onChange={e => setNewBookImage(e.target.value)}
                            className="w-full px-3 py-2 bg-forest-900 border border-gold-500/10 focus:border-gold-500 rounded text-xs focus:outline-none text-cream-100 placeholder:text-forest-600"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 justify-end pt-2 text-xs font-mono font-bold uppercase">
                        <button
                          type="button"
                          onClick={() => setShowAddBookForm(false)}
                          className="px-4 py-2 bg-forest-900 hover:bg-forest-850 rounded text-cream-300 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-forest-950 rounded transition-colors"
                        >
                          Register Book
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Books active list grid display */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {books.map((b) => (
                      <div 
                        key={b.id}
                        className="bg-forest-900 border border-gold-500/5 p-4 rounded-xl space-y-3 relative group"
                      >
                        <button
                          onClick={() => handleDeleteBook(b.id)}
                          className="absolute top-2.5 right-2.5 bg-red-950 text-red-400 border border-red-500/20 p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-900 hover:text-white"
                          title="Delete Book"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="h-44 rounded-md overflow-hidden bg-forest-950 border border-forest-900">
                          <img
                            src={b.image || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400'}
                            alt={b.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="space-y-0.5 text-left">
                          <h4 className="font-serif font-bold text-sm text-cream-50 line-clamp-1">{b.title}</h4>
                          <p className="text-xs text-cream-300 truncate">by {b.author}</p>
                          <span className="inline-block text-[9px] font-mono text-gold-500 uppercase tracking-widest bg-forest-950 px-1.5 py-0.5 rounded-md mt-1">
                            {b.genre}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4 Content: Notification Center Inbox */}
              {activeTab === 'notifications' && (
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-cream-50 border-b border-forest-950 pb-2">
                    Notification Alerts Inbox
                  </h3>

                  {notifications.length === 0 ? (
                    <div className="bg-forest-900 border border-forest-950 p-12 text-center text-sm text-forest-500 rounded-xl">
                      Your inbox is clear. All system logs and actions processed correctly!
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                      {notifications.map((n) => (
                        <div 
                          key={n.id}
                          className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all ${
                            n.read 
                              ? 'bg-forest-900/40 border-forest-950 text-cream-300' 
                              : 'bg-forest-900 border-gold-500/20 text-cream-100 shadow-md border-l-4 border-l-gold-500'
                          }`}
                        >
                          <div className="space-y-1 text-left">
                            <div className="flex items-center gap-2">
                              <span className={`w-1.5 h-1.5 rounded-full ${n.read ? 'bg-forest-500' : 'bg-gold-500 animate-pulse'}`} />
                              <span className="font-serif font-bold text-sm">{n.title}</span>
                              <span className="text-[10px] font-mono text-forest-500 uppercase">
                                {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <p className="text-xs text-cream-300 leading-relaxed font-sans">{n.message}</p>
                          </div>

                          {!n.read && (
                            <button
                              onClick={() => markNotificationRead(n.id)}
                              className="px-3 py-1 bg-gold-500/10 hover:bg-gold-500 border border-gold-500 text-gold-400 hover:text-forest-950 rounded text-[10px] font-mono uppercase font-semibold transition-all self-end sm:self-center cursor-pointer"
                            >
                              Acknowledge
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

          {/* ================================== */}
          {/* B. REGULAR CUSTOMER DASHBOARD PANEL */}
          {/* ================================== */}
          {session.user.role === 'customer' && (
            <div className="space-y-8 text-left animate-fade-in">
              
              {/* Customer quick status row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Status 1: Student discount verification */}
                <div className="bg-forest-900 border border-gold-500/10 p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between space-y-4">
                  <div className="absolute top-0 right-0 h-16 w-16 translate-x-4 -translate-y-4 rounded-full bg-emerald-500/10" />
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-bold block">
                      Student Identity Status
                    </span>
                    <h3 className="font-serif text-lg font-bold text-cream-50 flex items-center gap-1.5">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      <span>Sanjivani Verified student</span>
                    </h3>
                    <p className="text-xs text-cream-300 leading-relaxed font-sans">
                      Your identity card has been verified by the Cafe Curator Admin. Use code <span className="text-gold-400 font-bold font-mono">SANJIVANI10</span> for 10% off at checkout.
                    </p>
                  </div>
                  <div className="bg-emerald-950/80 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] tracking-widest font-bold text-center py-2 rounded uppercase shadow-inner">
                    10% Off Verified & Active
                  </div>
                </div>

                {/* Status 2: Active study hours rewards */}
                <div className="bg-forest-900 border border-gold-500/10 p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between space-y-4">
                  <div className="absolute top-0 right-0 h-16 w-16 translate-x-4 -translate-y-4 rounded-full bg-gold-500/10" />
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-gold-400 uppercase tracking-wider font-bold block">
                      RAR Library borrowing
                    </span>
                    <h3 className="font-serif text-lg font-bold text-cream-50 flex items-center gap-1.5">
                      <BookOpen className="w-5 h-5 text-gold-400" />
                      <span>Book Club active</span>
                    </h3>
                    <p className="text-xs text-cream-300 leading-relaxed font-sans">
                      You currently have 1 active library book on borrow ("Atomic Habits"). Return deadline is 15th July 2026.
                    </p>
                  </div>
                  <div className="bg-gold-500/10 border border-gold-500/20 text-gold-400 font-mono text-[10px] tracking-widest font-bold text-center py-2 rounded uppercase">
                    1 Book on Borrow • Healthy History
                  </div>
                </div>

                {/* Status 3: Table Booking Status */}
                <div className="bg-forest-900 border border-gold-500/10 p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between space-y-4">
                  <div className="absolute top-0 right-0 h-16 w-16 translate-x-4 -translate-y-4 rounded-full bg-indigo-500/10" />
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-bold block">
                      Active Reservations
                    </span>
                    <h3 className="font-serif text-lg font-bold text-cream-50 flex items-center gap-1.5">
                      <Clock className="w-5 h-5 text-indigo-400" />
                      <span>Reserve Table</span>
                    </h3>
                    <p className="text-xs text-cream-300 leading-relaxed font-sans">
                      Need a quiet study spot or a competitive board-game setup for the group? Book a table now.
                    </p>
                  </div>
                  <button
                    onClick={() => setCurrentPage('book')}
                    className="w-full bg-indigo-800 hover:bg-indigo-700 text-white font-mono text-[10px] tracking-widest font-bold text-center py-2 rounded uppercase transition-colors"
                  >
                    Go to Table Reserves
                  </button>
                </div>
              </div>

              {/* Personal orders activity log list */}
              <div className="space-y-4 bg-forest-900/35 p-6 rounded-2xl border border-forest-900/60">
                <h3 className="font-serif text-xl font-bold text-cream-50 border-b border-forest-900 pb-2">
                  My Live Activities & Order History
                </h3>

                {myActivities.length === 0 ? (
                  <div className="py-12 text-center text-sm text-forest-500 bg-forest-950/30 rounded-xl">
                    You haven't placed any order or table booking yet. Go order some loaded Maggi or brick oven pizzas!
                  </div>
                ) : (
                  <div className="space-y-3">
                    {myActivities.map((act) => (
                      <div 
                        key={act.id}
                        className="bg-forest-900 border border-gold-500/5 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wide ${
                              act.type === 'table_reservation' 
                                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/15' 
                                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/15'
                            }`}>
                              {act.type === 'table_reservation' ? 'Table Reservation' : 'Gourmet Order'}
                            </span>
                            <span className="text-[10px] font-mono text-forest-500">#{act.id}</span>
                          </div>

                          <p className="text-xs text-cream-200 font-sans">
                            {act.type === 'table_reservation' 
                              ? `Booked table for ${act.partySize} guests on ${act.date} at ${act.time} in "${act.table_id}"`
                              : `Placed order totaling ₹${act.total} with ${act.items.length} food delicacies.`
                            }
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 self-end sm:self-center font-mono text-xs">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            act.status === 'Completed' ? 'bg-emerald-500' :
                            act.status === 'Preparing' ? 'bg-amber-500 animate-pulse' :
                            act.status === 'Cancelled' ? 'bg-red-500' : 'bg-cream-400'
                          }`} />
                          <span className="text-cream-300 font-bold uppercase tracking-wider">{act.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
