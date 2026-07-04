import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const handleClick = () => {
    const message = encodeURIComponent("Hello Read and Roast! I would like to make an inquiry or order some delicious wood-fired food.");
    window.open(`https://wa.me/919420032727?text=${message}`, '_blank');
  };

  return (
    <button
      id="floating-whatsapp-btn"
      onClick={handleClick}
      className="fixed bottom-20 md:bottom-6 right-6 z-50 bg-emerald-600 hover:bg-emerald-500 text-cream-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center border border-emerald-500/30 group"
      aria-label="Chat on WhatsApp"
    >
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out text-sm font-medium whitespace-nowrap pr-0 group-hover:pr-2">
        Chat with RAR
      </span>
      <MessageCircle className="w-6 h-6 animate-pulse" />
    </button>
  );
}
