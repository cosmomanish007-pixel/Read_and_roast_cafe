import { Star } from 'lucide-react';

interface RatingBadgeProps {
  className?: string;
}

export default function RatingBadge({ className = '' }: RatingBadgeProps) {
  return (
    <div
      id="rar-rating-badge"
      className={`inline-flex items-center gap-3 px-4 py-2 rounded-full bg-forest-900/80 border border-gold-500/30 backdrop-blur-md shadow-lg ${className}`}
    >
      <div className="flex items-center gap-1 text-gold-400">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-current" />
        ))}
      </div>
      <div className="text-xs font-mono tracking-wider uppercase text-cream-200">
        <span className="font-bold text-gold-400">4.9 ★</span> Google Rating (24+ Reviews)
      </div>
    </div>
  );
}
