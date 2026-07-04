-- Read & Roast Café Supabase Database Schema Setup
-- Run this in your Supabase SQL Editor to set up the tables!

-- 1. Create Users Table
CREATE TABLE IF NOT EXISTS public.users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'customer',
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create Policies
CREATE POLICY "Allow public read access to users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Allow individual write access to users" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow individual update access to users" ON public.users FOR UPDATE USING (true);

-- 2. Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES public.users(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  total NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  type TEXT NOT NULL DEFAULT 'order',
  date TEXT,
  time TEXT,
  table_id TEXT
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin update access to orders" ON public.orders FOR UPDATE USING (true);

-- 3. Create Notifications Table
CREATE TABLE IF NOT EXISTS public.notifications (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to notifications" ON public.notifications FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to notifications" ON public.notifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin update access to notifications" ON public.notifications FOR UPDATE USING (true);

-- 4. Seed Default Admin & Customer users (optional)
INSERT INTO public.users (id, email, role, name, created_at)
VALUES 
  ('u-admin', 'admin@readandroast.com', 'admin', 'Admin Curator', NOW()),
  ('u-customer', 'student@sanjivani.edu.in', 'customer', 'Tejas Deshmukh', NOW())
ON CONFLICT (id) DO NOTHING;

-- Seed Default Orders (optional)
INSERT INTO public.orders (id, user_id, customer_name, phone, items, total, status, created_at, type)
VALUES 
  ('ord-101', 'u-customer', 'Tejas Deshmukh', '+91 94200 32727', '[{"quantity": 2, "menuItem": {"id": "maggi-desi", "name": "Tadka Desi Masala Maggi", "price": 79}}]', 158, 'Preparing', NOW(), 'order')
ON CONFLICT (id) DO NOTHING;
