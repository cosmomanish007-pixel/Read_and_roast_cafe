import { Coffee, Gamepad2, CalendarDays } from 'lucide-react';
import { PageId } from '../types';

interface StickyBottomNavProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
}

export default function StickyBottomNav({
  currentPage,
  setCurrentPage,
}: StickyBottomNavProps) {
  const actions = [
    { id: 'menu', label: 'Menu', icon: Coffee },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'book', label: 'Book', icon: CalendarDays },
  ] as const;

  const handleNavClick = (pageId: PageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      id="sticky-mobile-bottom-nav"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-forest-950/95 border-t border-gold-500/15 backdrop-blur-md shadow-[0_-8px_24px_rgba(0,0,0,0.5)] pb-safe"
    >
      <div className="grid grid-cols-3 h-16">
        {actions.map((act) => {
          const Icon = act.icon;
          const isActive = currentPage === act.id;
          return (
            <button
              key={act.id}
              onClick={() => handleNavClick(act.id)}
              className="flex flex-col items-center justify-center w-full h-full text-center transition-all duration-300 relative"
            >
              <div
                className={`p-1 rounded-lg transition-transform ${
                  isActive ? 'text-gold-400 scale-110' : 'text-cream-300'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              </div>
              <span
                className={`text-[10px] font-mono tracking-wider transition-colors ${
                  isActive ? 'text-gold-400 font-bold' : 'text-cream-300/80'
                }`}
              >
                {act.label}
              </span>

              {/* Active tiny light pip under */}
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-gold-400" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
