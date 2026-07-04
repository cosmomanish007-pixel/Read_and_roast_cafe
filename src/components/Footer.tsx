import React, { useState } from 'react';
import { MapPin, Phone, Clock, Instagram, Send, Star, Landmark } from 'lucide-react';
import { PageId } from '../types';
import ReadRoastLogo from './ReadRoastLogo';

interface FooterProps {
  setCurrentPage: (page: PageId) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [subscribed, setSubscribed] = useState(false);

  const handlePageLinkClick = (pageId: PageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="rar-site-footer"
      className="bg-forest-950 border-t border-gold-500/10 text-cream-100 pt-16 pb-24 lg:pb-12 transition-all font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Brand & Identity */}
          <div className="space-y-5 text-left">
            <div 
              onClick={() => handlePageLinkClick('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <ReadRoastLogo size="sm" className="bg-transparent text-gold-500 fill-current" />
              <div>
                <h3 className="font-serif font-bold text-lg tracking-wider text-cream-50 group-hover:text-gold-400 transition-colors">
                  READ & ROAST
                </h3>
                <span className="font-mono text-[9px] uppercase tracking-widest text-gold-500 font-bold block">
                  KOPARGAON'S LITERARY CAFE
                </span>
              </div>
            </div>

            <p className="text-xs text-cream-300 leading-relaxed font-sans">
              Kopargaon's first premium 100% pure vegetarian themed café. Nestled near Sanjivani College, we unite a rich 200+ library catalog, strategy tabletop board games, and wood-fired gourmet specialties.
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-forest-900 hover:bg-forest-850 border border-gold-500/10 hover:border-gold-400 text-cream-300 hover:text-gold-400 transition-all duration-300 hover:scale-105"
                title="Follow us on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.zomato.com"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-md bg-forest-900 hover:bg-forest-850 border border-gold-500/10 hover:border-red-500 text-[10px] font-mono tracking-wider font-semibold hover:text-red-400 transition-all duration-300 flex items-center gap-1.5"
                title="Order on Zomato"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block animate-ping" />
                <span>Zomato Delivery</span>
              </a>
            </div>
          </div>

          {/* Column 2: Hours and Contact */}
          <div className="space-y-4 text-left">
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-gold-400 border-b border-forest-900 pb-2">
              Visit & Connect
            </h3>
            <ul className="space-y-3.5 text-xs text-cream-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Shop No. 08, Godavari Complex,<br />
                  Railway Station Road, Annapurna Nagar,<br />
                  Kopargaon, Maharashtra 423603
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <a
                  href="tel:+919420032727"
                  className="hover:text-gold-400 underline decoration-gold-500/20 transition-colors font-mono"
                >
                  +91 94200 32727
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-semibold block text-cream-50 text-xs">Opening Hours</span>
                  <span>Everyday: 11:00 AM – 10:30 PM</span>
                  <span className="block text-[10px] text-emerald-500 font-mono">Kitchen Closes at 10:15 PM</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="space-y-4 text-left">
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-gold-400 border-b border-forest-900 pb-2">
              Explore Pages
            </h3>
            <div className="flex flex-col gap-2 text-xs text-cream-300">
              <button onClick={() => handlePageLinkClick('home')} className="text-left hover:text-gold-400 hover:translate-x-1 transition-all py-1 cursor-pointer">Home Sanctuary</button>
              <button onClick={() => handlePageLinkClick('menu')} className="text-left hover:text-gold-400 hover:translate-x-1 transition-all py-1 cursor-pointer">Culinary Menu</button>
              <button onClick={() => handlePageLinkClick('games')} className="text-left hover:text-gold-400 hover:translate-x-1 transition-all py-1 cursor-pointer">Library Books & Games</button>
              <button onClick={() => handlePageLinkClick('students')} className="text-left hover:text-gold-400 hover:translate-x-1 transition-all py-1 cursor-pointer">Student Club Hub</button>
              <button onClick={() => handlePageLinkClick('book')} className="text-left hover:text-gold-400 hover:translate-x-1 transition-all py-1 cursor-pointer">Book Table Seating</button>
            </div>
          </div>

          {/* Column 4: Real Google Map Location */}
          <div className="space-y-4 text-left">
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-gold-400 border-b border-forest-900 pb-2">
              Precise Location Map
            </h3>
            
            {/* Embedded Iframe Google Maps */}
            <div className="relative rounded-lg h-36 border border-gold-500/10 overflow-hidden shadow-lg group bg-forest-950">
              <iframe
                title="Read and Roast Cafe Kopargaon Precise Location Map"
                src="https://maps.google.com/maps?q=Read%20and%20Roast%20Cafe%2C%20Godavari%20Complex%2C%20Kopargaon&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                allowFullScreen={false}
                loading="lazy"
              />
            </div>

            {/* Newsletter subscriber */}
            <div className="space-y-2 pt-1">
              <h4 className="text-[10px] font-mono uppercase tracking-wider text-cream-300 font-bold">Join the RAR Circle</h4>
              {!subscribed ? (
                <form onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }} className="flex">
                  <input
                    type="email"
                    required
                    placeholder="student@sanjivani.edu.in"
                    className="bg-forest-900 border border-forest-800 rounded-l px-3 py-1.5 text-xs text-cream-100 placeholder:text-forest-600 focus:outline-none focus:border-gold-500 w-full"
                  />
                  <button
                    type="submit"
                    className="bg-gold-500 hover:bg-gold-400 text-forest-950 px-3.5 rounded-r transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <p className="text-xs text-emerald-500 font-mono font-bold animate-fade-in">
                  ✓ Welcome to the RAR literary circle!
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Bottom footer copyright line */}
        <div className="pt-8 border-t border-forest-900 text-center text-xs text-forest-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {currentYear} Read and Roast Cafe (RAR) Kopargaon. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-[10px]">
            <span>Sanjivani Campus Corner</span>
            <span>•</span>
            <span className="text-gold-500 font-bold uppercase">100% Eggless Pure Vegetarian</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
