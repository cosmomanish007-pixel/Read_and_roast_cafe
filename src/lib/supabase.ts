import { createClient } from '@supabase/supabase-js';
import { MENU_ITEMS, BOOKS_LIST, BOARD_GAMES } from '../data/mockData';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

// Define storage-backed Mock database schema
interface LocalDB {
  users: Array<{ id: string; email: string; role: 'admin' | 'customer'; created_at: string; name?: string }>;
  orders: Array<{ id: string; user_id?: string; customer_name: string; phone: string; items: any[]; total: number; status: 'Pending' | 'Preparing' | 'Completed' | 'Cancelled'; created_at: string; type: 'order' | 'table_reservation'; date?: string; time?: string; table_id?: string }>;
  notifications: Array<{ id: string; title: string; message: string; type: 'info' | 'order' | 'discount' | 'reservation'; read: boolean; created_at: string }>;
  menu_items: typeof MENU_ITEMS;
  books: typeof BOOKS_LIST;
  games: typeof BOARD_GAMES;
}

const getInitialDB = (): LocalDB => {
  return {
    users: [
      { id: 'u-admin', email: 'admin@readandroast.com', role: 'admin', created_at: new Date().toISOString(), name: 'Admin Curator' },
      { id: 'u-customer', email: 'student@sanjivani.edu.in', role: 'customer', created_at: new Date().toISOString(), name: 'Tejas Deshmukh' }
    ],
    orders: [
      {
        id: 'ord-101',
        customer_name: 'Tejas Deshmukh',
        phone: '+91 94200 32727',
        items: [
          { menuItem: MENU_ITEMS.find(m => m.id === 'maggi-desi') || MENU_ITEMS[0], quantity: 2 },
          { menuItem: MENU_ITEMS.find(m => m.id === 'drink-mango-lassi') || MENU_ITEMS[1], quantity: 1 }
        ],
        total: 350,
        status: 'Preparing',
        created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        type: 'order'
      },
      {
        id: 'res-202',
        customer_name: 'Sneha Patil',
        phone: '+91 95522 12121',
        items: [],
        total: 0,
        status: 'Pending',
        created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        type: 'table_reservation',
        date: '2026-07-04',
        time: '04:30 PM',
        table_id: 'Strategic Games Area'
      },
      {
        id: 'ord-102',
        customer_name: 'Rohan Shinde',
        phone: '+91 91234 56789',
        items: [
          { menuItem: MENU_ITEMS.find(m => m.id === 'pizza-extravaganza') || MENU_ITEMS[0], quantity: 1 },
          { menuItem: MENU_ITEMS.find(m => m.id === 'shake-kitkat') || MENU_ITEMS[2], quantity: 2 }
        ],
        total: 680,
        status: 'Pending',
        created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        type: 'order'
      }
    ],
    notifications: [
      {
        id: 'notif-1',
        title: 'New Student Discount Application',
        message: 'Tejas Deshmukh (Sanjivani College) submitted active college ID verification.',
        type: 'discount',
        read: false,
        created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString()
      },
      {
        id: 'notif-2',
        title: 'New Table Reservation Request',
        message: 'Sneha Patil requested table for 4 in the Strategic Games Area at 04:30 PM.',
        type: 'reservation',
        read: false,
        created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString()
      },
      {
        id: 'notif-3',
        title: 'New Gourmet Order Received',
        message: 'Rohan Shinde placed an order for ₹680 (1 × Extravaganza Pizza, 2 × Kitkat Shake).',
        type: 'order',
        read: false,
        created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString()
      }
    ],
    menu_items: [...MENU_ITEMS],
    books: [...BOOKS_LIST],
    games: [...BOARD_GAMES]
  };
};

class LocalSupabaseMock {
  private getDB(): LocalDB {
    const data = localStorage.getItem('rar_supabase_mock_db');
    if (!data) {
      const initial = getInitialDB();
      localStorage.setItem('rar_supabase_mock_db', JSON.stringify(initial));
      return initial;
    }
    try {
      return JSON.parse(data);
    } catch {
      const initial = getInitialDB();
      localStorage.setItem('rar_supabase_mock_db', JSON.stringify(initial));
      return initial;
    }
  }

  private saveDB(db: LocalDB) {
    localStorage.setItem('rar_supabase_mock_db', JSON.stringify(db));
  }

  // Authentication Mock
  auth = {
    signUp: async ({ email, password, options }: any) => {
      const db = this.getDB();
      const exists = db.users.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        return { data: { user: null }, error: { message: 'A user with this email already exists.' } };
      }
      
      const role = options?.data?.role || 'customer';
      const name = options?.data?.name || email.split('@')[0];
      const newUser = {
        id: 'u-' + Math.random().toString(36).substr(2, 9),
        email,
        role,
        name,
        created_at: new Date().toISOString()
      };
      
      db.users.push(newUser);
      this.saveDB(db);
      
      localStorage.setItem('rar_supabase_session', JSON.stringify(newUser));
      this.triggerStateChange(newUser);
      return { data: { user: newUser }, error: null };
    },

    signInWithPassword: async ({ email, password }: any) => {
      const db = this.getDB();
      
      // Default convenience mock logins
      if (email === 'admin@readandroast.com' && password === 'admin123') {
        const adminUser = db.users.find(u => u.email === 'admin@readandroast.com') || db.users[0];
        localStorage.setItem('rar_supabase_session', JSON.stringify(adminUser));
        this.triggerStateChange(adminUser);
        return { data: { user: adminUser }, error: null };
      }
      if (email === 'student@sanjivani.edu.in' && password === 'student123') {
        const studentUser = db.users.find(u => u.email === 'student@sanjivani.edu.in') || db.users[1];
        localStorage.setItem('rar_supabase_session', JSON.stringify(studentUser));
        this.triggerStateChange(studentUser);
        return { data: { user: studentUser }, error: null };
      }

      const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!user) {
        return { data: { user: null }, error: { message: 'Invalid login credentials.' } };
      }
      
      localStorage.setItem('rar_supabase_session', JSON.stringify(user));
      this.triggerStateChange(user);
      return { data: { user }, error: null };
    },

    signOut: async () => {
      localStorage.removeItem('rar_supabase_session');
      this.triggerStateChange(null);
      return { error: null };
    },

    getUser: async () => {
      const session = localStorage.getItem('rar_supabase_session');
      if (session) {
        return { data: { user: JSON.parse(session) }, error: null };
      }
      return { data: { user: null }, error: null };
    },

    getSession: async () => {
      const session = localStorage.getItem('rar_supabase_session');
      if (session) {
        return { data: { session: { user: JSON.parse(session) } }, error: null };
      }
      return { data: { session: null }, error: null };
    },

    onAuthStateChange: (callback: (event: string, session: any) => void) => {
      this.listeners.push(callback);
      const session = localStorage.getItem('rar_supabase_session');
      if (session) {
        callback('SIGNED_IN', { user: JSON.parse(session) });
      } else {
        callback('SIGNED_OUT', null);
      }
      return {
        data: {
          subscription: {
            unsubscribe: () => {
              this.listeners = this.listeners.filter(l => l !== callback);
            }
          }
        }
      };
    }
  };

  private listeners: Array<(event: string, session: any) => void> = [];
  
  private triggerStateChange(user: any) {
    const event = user ? 'SIGNED_IN' : 'SIGNED_OUT';
    const session = user ? { user } : null;
    this.listeners.forEach(callback => callback(event, session));
  }

  // Database Builder Mock
  from(table: keyof LocalDB) {
    const db = this.getDB();
    const dataList = db[table] || [];

    return {
      select: (columns = '*') => {
        return {
          order: (column: string, { ascending = true } = {}) => {
            const sorted = [...dataList].sort((a: any, b: any) => {
              const valA = a[column];
              const valB = b[column];
              if (valA < valB) return ascending ? -1 : 1;
              if (valA > valB) return ascending ? 1 : -1;
              return 0;
            });
            return Promise.resolve({ data: sorted, error: null });
          },
          eq: (column: string, value: any) => {
            const filtered = dataList.filter((item: any) => item[column] === value);
            return Promise.resolve({ data: filtered, error: null });
          },
          then: (resolve: any) => resolve({ data: dataList, error: null })
        };
      },

      insert: (record: any) => {
        const records = Array.isArray(record) ? record : [record];
        const insertedRecords = records.map((r: any) => ({
          id: r.id || 'rec-' + Math.random().toString(36).substr(2, 9),
          created_at: new Date().toISOString(),
          ...r
        }));

        db[table] = [...db[table], ...insertedRecords] as any;
        this.saveDB(db);

        // If placing an order, reservation or discount, trigger automated system notifications for the Admin Dashboard!
        if (table === 'orders') {
          insertedRecords.forEach(rec => {
            const typeLabel = rec.type === 'table_reservation' ? 'Table Reservation' : 'Gourmet Order';
            const detailMsg = rec.type === 'table_reservation' 
              ? `${rec.customer_name} booked a table in ${rec.table_id} for ${rec.partySize} guests.`
              : `${rec.customer_name} ordered items totaling ₹${rec.total}.`;
            
            db.notifications.unshift({
              id: 'notif-' + Math.random().toString(36).substr(2, 9),
              title: `New ${typeLabel} Received!`,
              message: detailMsg,
              type: rec.type === 'table_reservation' ? 'reservation' : 'order',
              read: false,
              created_at: new Date().toISOString()
            });
          });
          this.saveDB(db);
        }

        return Promise.resolve({ data: insertedRecords, error: null });
      },

      update: (updates: any) => {
        return {
          eq: (column: string, value: any) => {
            db[table] = (db[table] as any[]).map((item: any) => {
              if (item[column] === value) {
                return { ...item, ...updates };
              }
              return item;
            }) as any;
            this.saveDB(db);
            return Promise.resolve({ data: db[table], error: null });
          }
        };
      },

      delete: () => {
        return {
          eq: (column: string, value: any) => {
            db[table] = (db[table] as any[]).filter((item: any) => item[column] !== value) as any;
            this.saveDB(db);
            return Promise.resolve({ data: null, error: null });
          }
        };
      }
    };
  }
}

// Export real Supabase client if configured, else the high-fidelity mock
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (new LocalSupabaseMock() as any);
