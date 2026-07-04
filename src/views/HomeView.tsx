import { 
  ArrowRight, 
  BookOpen, 
  Coffee, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Gamepad2, 
  Send, 
  CheckCircle2,
  UtensilsCrossed,
  Sparkle
} from 'lucide-react';
import { PageId, MenuItem } from '../types';
import { useState, useEffect, FormEvent } from 'react';
import { MENU_ITEMS, BOARD_GAMES, BOOKS_LIST, TESTIMONIALS as INITIAL_TESTIMONIALS } from '../data/mockData';

interface HomeViewProps {
  setCurrentPage: (page: PageId) => void;
  onAddToCart: (item: MenuItem) => void;
}

export default function HomeView({ setCurrentPage, onAddToCart }: HomeViewProps) {
  // Stats Counters
  const [pizzaCount, setPizzaCount] = useState(1482);
  const [diceCount, setDiceCount] = useState(649);
  const [seatCount, setSeatCount] = useState(14);

  // Interactive Custom Companion Finder States
  const [goal, setGoal] = useState<'study' | 'hangout' | 'unwind'>('study');
  const [appetite, setAppetite] = useState<'thirsty' | 'peckish' | 'starving'>('peckish');
  const [preference, setPreference] = useState<'book' | 'game'>('book');
  
  const [recommendedFood, setRecommendedFood] = useState<MenuItem | null>(null);
  const [recommendedCompanion, setRecommendedCompanion] = useState<{ type: 'book' | 'game'; title: string; subtitle: string; image: string } | null>(null);
  const [showRecommendation, setShowRecommendation] = useState(false);

  // Order status check
  const [orderTrackId, setOrderTrackId] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<any>(null);

  // Review states
  const [testimonials, setTestimonials] = useState(INITIAL_TESTIMONIALS);
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [reviewName, setReviewName] = useState('');
  const [reviewRole, setReviewRole] = useState('Sanjivani Student');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Auto incrementing counters simulated effect
  useEffect(() => {
    const timer = setInterval(() => {
      setPizzaCount(p => p + (Math.random() > 0.7 ? 1 : 0));
      setDiceCount(d => d + (Math.random() > 0.8 ? 1 : 0));
      setSeatCount(() => Math.floor(8 + Math.random() * 12));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Companion Finder recommendation logic
  const handleGenerateCompanion = () => {
    // 1. Food selection based on appetite
    let foodPool = MENU_ITEMS;
    if (appetite === 'thirsty') {
      foodPool = MENU_ITEMS.filter(item => item.category.toLowerCase().includes('coffee') || item.category.toLowerCase().includes('refreshers'));
    } else if (appetite === 'peckish') {
      foodPool = MENU_ITEMS.filter(item => item.category.toLowerCase().includes('sides') || item.name.toLowerCase().includes('garlic'));
    } else {
      foodPool = MENU_ITEMS.filter(item => item.category.toLowerCase().includes('pizzas'));
    }
    const chosenFood = foodPool[Math.floor(Math.random() * foodPool.length)] || MENU_ITEMS[0];
    setRecommendedFood(chosenFood);

    // 2. Companion selection based on preference
    if (preference === 'book') {
      const book = BOOKS_LIST[Math.floor(Math.random() * BOOKS_LIST.length)];
      setRecommendedCompanion({
        type: 'book',
        title: book.title,
        subtitle: `Written by ${book.author} | Genre: ${book.genre}`,
        image: book.image
      });
    } else {
      const game = BOARD_GAMES[Math.floor(Math.random() * BOARD_GAMES.length)];
      setRecommendedCompanion({
        type: 'game',
        title: game.name,
        subtitle: `Ideal for ${game.players} | Time: ${game.playTime}`,
        image: game.image
      });
    }
    setShowRecommendation(true);
  };

  const handleTrackOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!orderTrackId) return;

    try {
      const dbStr = localStorage.getItem('rar_supabase_mock_db');
      if (dbStr) {
        const db = JSON.parse(dbStr);
        const matched = db.orders?.find((o: any) => o.id.toLowerCase() === orderTrackId.toLowerCase());
        if (matched) {
          setTrackedOrder(matched);
          return;
        }
      }
    } catch (e) {
      console.error(e);
    }
    // Fallback Mock Order
    setTrackedOrder({
      id: orderTrackId.toUpperCase(),
      status: 'Preparing',
      items: [
        { name: '10" Paneer Tikka Pizza', qty: 1 },
        { name: 'Artisanal Cold Brew', qty: 2 }
      ],
      total: 510,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  };

  const handleSubmitReview = (e: FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;

    const newTestimonial = {
      id: 't-' + Math.random().toString(36).substr(2, 5),
      name: reviewName,
      role: reviewRole,
      text: reviewComment,
      rating: reviewRating,
      date: 'Just now'
    };

    setTestimonials([newTestimonial, ...testimonials]);
    setActiveTestimonialIdx(0);
    setReviewSuccess(true);
    setReviewName('');
    setReviewComment('');
    setTimeout(() => setReviewSuccess(false), 5000);
  };

  return (
    <div id="rar-home-view" className="space-y-24 pb-24 indian-pattern-bg">
      
      {/* 1. PREMIUM SPLASH HERO SECTION WITH SYMMETRICAL ARCH OVERLAYS */}
      <div className="relative min-h-[75vh] flex items-center bg-[#0d0a07] overflow-hidden">
        {/* Background Image with right-aligned coffee splash */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&q=80&w=1600"
            alt="Artisanal Coffee Splash"
            className="w-full h-full object-cover object-right opacity-80"
          />
          {/* Gradient overlay: black/dark-chocolate fade from left to right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0a07] via-[#0d0a07]/80 to-transparent" />
        </div>

        {/* Content container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 text-left">
          <div className="max-w-2xl space-y-6">
            
            {/* Cleveland-based tag equivalent */}
            <div className="flex items-center gap-3 text-[#edd38c]">
              <span className="text-xs uppercase tracking-widest font-mono font-bold">Kopargaon-based Book Cafe</span>
              <span className="w-16 h-[1px] bg-[#edd38c]/40" />
              <span className="text-xs font-serif italic text-gold-400">Athithi Devo Bhava</span>
            </div>

            {/* Massive Serif Heading */}
            <h1 className="text-5xl sm:text-7xl font-serif font-bold text-white leading-tight tracking-tight">
              Discover Art of <span className="text-[#edd38c]">Perfect Coffee</span> & Books.
            </h1>

            {/* Warm Subheading Description */}
            <p className="text-sm sm:text-base text-stone-200 leading-relaxed max-w-lg opacity-95 font-sans">
              Experience the difference as we meticulously select and roast the finest organic beans, curate engaging library reads, and roll out premium tabletop board games. Join us on a cozy journey of taste and connection, one sip at a time.
            </p>

            {/* Buttons Row with Glowing gold "Order Now" and scripts */}
            <div className="flex items-center gap-5 pt-2">
              <button
                onClick={() => setCurrentPage('menu')}
                className="px-8 py-3.5 bg-gradient-to-r from-[#bc932b] to-[#edd38c] hover:from-[#edd38c] hover:to-[#bc932b] text-[#0d0a07] font-serif font-bold rounded-lg shadow-[0_4px_20px_rgba(237,211,140,0.35)] transition-all hover:scale-[1.02] cursor-pointer text-sm"
              >
                Order Now
              </button>
              
              <button
                onClick={() => setCurrentPage('book')}
                className="text-white hover:text-[#edd38c] transition-colors font-serif italic text-lg cursor-pointer flex items-center gap-2 group"
              >
                <span>Book Table</span>
                <span className="w-6 h-[1px] bg-white group-hover:bg-[#edd38c] transition-all group-hover:w-8" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* 2. SWAGAT: THE CAFE EXPERIENCE (ABOUT CARD GRID WITH GEOMETRIC INDIAN BORDERS) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="indian-divider text-gold-500 font-mono text-sm tracking-widest font-bold">
            <span>❃ SWAGAT ❃</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-cream-50">Where Stories Brew</h2>
          <p className="text-sm text-cream-300">
            More than just coffee. Read & Roast is Kopargaon's premier dual-concept cafe—a sanctuary built for students, readers, and flatbread lovers.
          </p>
        </div>

        {/* Symmetrical 3-Column Layout with Indian-arch frames & block-print borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-forest-900 border-2 border-[#8c6239]/20 rounded-2xl relative shadow-md hover:border-[#8c6239]/40 transition-all text-left space-y-4 before:absolute before:inset-1 before:border before:border-dashed before:border-[#8c6239]/10 before:rounded-2xl before:pointer-events-none">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 text-gold-500 flex items-center justify-center border border-gold-500/20">
              <Coffee className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-cream-50">Artisanal Vegetarian Culinary</h3>
            <p className="text-xs text-cream-300 leading-relaxed">
              We specialize in 100% vegetarian culinary delights. From fresh 10-inch hand-rolled wood-fired pizzas to our signature caramel cold brews, everything is made fresh to order.
            </p>
          </div>

          <div className="p-8 bg-forest-900 border-2 border-[#8c6239]/20 rounded-2xl relative shadow-md hover:border-[#8c6239]/40 transition-all text-left space-y-4 before:absolute before:inset-1 before:border before:border-dashed before:border-[#8c6239]/10 before:rounded-2xl before:pointer-events-none">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 text-gold-500 flex items-center justify-center border border-gold-500/20">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-cream-50">Co-Working Study Tables</h3>
            <p className="text-xs text-cream-300 leading-relaxed">
              Equipped with multiple power outlets, warm desk lighting, high-speed WiFi, and a quiet co-working vibe. It's the ultimate spot to ace your engineering assignments.
            </p>
          </div>

          <div className="p-8 bg-forest-900 border-2 border-[#8c6239]/20 rounded-2xl relative shadow-md hover:border-[#8c6239]/40 transition-all text-left space-y-4 before:absolute before:inset-1 before:border before:border-dashed before:border-[#8c6239]/10 before:rounded-2xl before:pointer-events-none">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 text-gold-500 flex items-center justify-center border border-gold-500/20">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-cream-50">Curated Board Games Library</h3>
            <p className="text-xs text-cream-300 leading-relaxed">
              With over 200+ curated fiction and philosophy volumes on our shelves and 9 classic board game sets (Monopoly, Chess, Carrom), you can unplug and enjoy with your friends.
            </p>
          </div>
        </div>
      </div>

      {/* 3. SUTRA & CHAI PLANNER (INTERACTIVE COMPANION FINDER) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest-900 border-2 border-[#8c6239]/30 rounded-3xl p-6 sm:p-10 shadow-xl relative text-left before:absolute before:inset-1.5 before:border before:border-dashed before:border-[#8c6239]/20 before:rounded-[1.4rem] before:pointer-events-none">
          <div className="max-w-2xl space-y-2">
            <div className="indian-divider text-gold-500 font-mono text-xs tracking-widest font-bold mb-1">
              <span>❃ SUTRA PLANNER ❃</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-cream-50">Companion Planner</h2>
            <p className="text-xs text-cream-300">
              Tell us your goal, level of hunger, and leisure preference. We'll automatically suggest a customized recipe pairing of food, drinks, and a book/game companion.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
            {/* Input Selection Forms */}
            <div className="lg:col-span-6 space-y-5">
              
              {/* Question 1 */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-gold-500 uppercase">1. What's your goal today?</label>
                <div className="grid grid-cols-3 gap-2 bg-forest-950 p-1 rounded-lg border border-[#8c6239]/15">
                  {[
                    { id: 'study', label: '📖 Focus / Study' },
                    { id: 'hangout', label: '🎲 Squad Hangout' },
                    { id: 'unwind', label: '☕ Solo Unwind' }
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setGoal(item.id as any)}
                      className={`text-xs py-2 px-1 rounded transition-all cursor-pointer text-center font-medium ${
                        goal === item.id ? 'bg-[#8c6239] text-white font-bold' : 'text-cream-300 hover:bg-forest-900'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2 */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-gold-500 uppercase">2. How hungry are you?</label>
                <div className="grid grid-cols-3 gap-2 bg-forest-950 p-1 rounded-lg border border-[#8c6239]/15">
                  {[
                    { id: 'thirsty', label: '☕ Just Drinks' },
                    { id: 'peckish', label: '🍟 Light Snacks' },
                    { id: 'starving', label: '🍕 Full Meal' }
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setAppetite(item.id as any)}
                      className={`text-xs py-2 px-1 rounded transition-all cursor-pointer text-center font-medium ${
                        appetite === item.id ? 'bg-[#8c6239] text-white font-bold' : 'text-cream-300 hover:bg-forest-900'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3 */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-gold-500 uppercase">3. Leisure Companion Preference?</label>
                <div className="grid grid-cols-2 gap-2 bg-forest-950 p-1 rounded-lg border border-[#8c6239]/15">
                  {[
                    { id: 'book', label: '📚 A Curated Book' },
                    { id: 'game', label: '🎲 A Board Game' }
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPreference(item.id as any)}
                      className={`text-xs py-2 rounded transition-all cursor-pointer text-center font-medium ${
                        preference === item.id ? 'bg-[#8c6239] text-white font-bold' : 'text-cream-300 hover:bg-forest-900'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleGenerateCompanion}
                className="w-full py-3 bg-[#8c6239] hover:bg-[#734d26] text-white font-serif font-bold text-sm rounded-lg transition-transform hover:scale-[1.01] cursor-pointer mt-4"
              >
                Plan My Perfect Companion Pair
              </button>
            </div>

            {/* Output Recommendations Panel */}
            <div className="lg:col-span-6 bg-forest-950 p-6 rounded-2xl border border-[#8c6239]/20 min-h-[300px] flex flex-col justify-center relative before:absolute before:inset-1 before:border before:border-dashed before:border-[#8c6239]/10 before:rounded-2xl before:pointer-events-none">
              {showRecommendation ? (
                <div className="space-y-6 animate-fade-in">
                  <div className="border-b border-forest-900 pb-3">
                    <span className="text-[10px] font-mono text-emerald-500 uppercase font-bold tracking-wider">★ Ready Companion Formula</span>
                    <h3 className="font-serif font-bold text-cream-50 text-lg mt-1">Suggested Pairings</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Suggested Food/Drink */}
                    {recommendedFood && (
                      <div className="p-4 bg-forest-900 rounded-xl border border-[#8c6239]/10 space-y-2">
                        <span className="text-[9px] font-mono text-gold-500 uppercase tracking-widest block">Recommended Bite</span>
                        <div className="flex gap-3">
                          <img
                            src={recommendedFood.image}
                            alt={recommendedFood.name}
                            className="w-12 h-12 object-cover rounded-lg border border-gold-500/10"
                          />
                          <div>
                            <h4 className="font-serif font-bold text-cream-50 text-xs">{recommendedFood.name}</h4>
                            <p className="text-[9px] text-cream-300 line-clamp-2 mt-0.5">{recommendedFood.description}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => onAddToCart(recommendedFood)}
                          className="w-full py-1.5 bg-[#8c6239] hover:bg-[#734d26] text-white font-serif text-[10px] rounded mt-2 cursor-pointer font-bold"
                        >
                          Add to Order (₹{recommendedFood.price})
                        </button>
                      </div>
                    )}

                    {/* Suggested Book/Game */}
                    {recommendedCompanion && (
                      <div className="p-4 bg-forest-900 rounded-xl border border-[#8c6239]/10 space-y-2">
                        <span className="text-[9px] font-mono text-gold-500 uppercase tracking-widest block">
                          {recommendedCompanion.type === 'book' ? 'Suggested Volume' : 'Suggested Boardgame'}
                        </span>
                        <div className="flex gap-3">
                          <img
                            src={recommendedCompanion.image}
                            alt={recommendedCompanion.title}
                            className="w-12 h-16 object-cover rounded-lg border border-gold-500/10"
                          />
                          <div>
                            <h4 className="font-serif font-bold text-cream-50 text-xs leading-snug">{recommendedCompanion.title}</h4>
                            <p className="text-[9px] text-cream-300 mt-1">{recommendedCompanion.subtitle}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-[10px] text-cream-300 text-center italic opacity-85">
                    "Grab a table slot, log onto the co-working WiFi, and request your combo at the serving desk!"
                  </p>
                </div>
              ) : (
                <div className="text-center space-y-3 opacity-60 py-10">
                  <div className="w-12 h-12 rounded-full bg-forest-900 flex items-center justify-center mx-auto text-gold-500 border border-gold-500/20">
                    <UtensilsCrossed className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-cream-100 text-sm">Awaiting Choice Selections</h4>
                  <p className="text-[11px] text-cream-300 max-w-xs mx-auto">
                    Fill out the companion questions on the left side to compile a curated recipe of food, beverage, and study companion.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4. RASODA RECOMMENDATIONS (SIGNATURE SPECIALTIES) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="text-left space-y-2">
            <div className="indian-divider text-gold-500 font-mono text-xs tracking-widest font-bold mb-1">
              <span>❃ RASODA RECOMMENDS ❃</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-cream-50">Signature Specialties</h2>
          </div>
          <button
            onClick={() => setCurrentPage('menu')}
            className="text-xs font-mono uppercase tracking-wider text-gold-500 hover:text-[#734d26] flex items-center gap-1.5 group cursor-pointer"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MENU_ITEMS.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="bg-forest-900 border-2 border-[#8c6239]/20 rounded-2xl overflow-hidden shadow-lg group hover:border-[#8c6239]/40 transition-all flex flex-col justify-between relative before:absolute before:inset-1 before:border before:border-dashed before:border-[#8c6239]/10 before:rounded-2xl before:pointer-events-none"
            >
              <div className="relative h-44 overflow-hidden bg-forest-950 z-10">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 bg-forest-950/90 border border-gold-500/25 text-gold-500 text-[10px] font-mono py-1 px-2.5 rounded-full font-bold">
                  ₹{item.price}
                </span>
                {item.isVeg && (
                  <span className="absolute bottom-3 left-3 bg-emerald-950/90 border border-emerald-500/30 text-emerald-500 text-[9px] font-mono py-0.5 px-2 rounded font-bold uppercase tracking-wider">
                    Veg
                  </span>
                )}
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between text-left z-10">
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-cream-100 text-sm">{item.name}</h3>
                  <p className="text-[11px] text-cream-300 line-clamp-2 leading-relaxed">{item.description}</p>
                </div>

                <button
                  onClick={() => onAddToCart(item)}
                  className="w-full py-2 bg-[#8c6239] hover:bg-[#734d26] text-white font-serif font-bold text-xs rounded transition-colors cursor-pointer"
                >
                  Quick Add To Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. CHAUPAL LOUNGE (COHESIVE FULL-SCREEN ROW LAYOUT FOR GUEST LOUNGE & ORDER TRACKER) */}
      <div className="bg-forest-900 border-y border-gold-500/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="indian-divider text-gold-500 font-mono text-xs tracking-widest font-bold mb-1">
              <span>❃ CHAUPAL LOUNGE ❃</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-cream-50">Community Hub</h2>
            <p className="text-xs text-cream-300">Submit review testimonials or trace active kitchen orders in real-time.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Section A: Live Reviews Carousel */}
            <div className="bg-forest-950 rounded-2xl border-2 border-[#8c6239]/20 p-6 shadow-xl space-y-5 text-left h-full flex flex-col justify-between min-h-[320px] relative before:absolute before:inset-1 before:border before:border-dashed before:border-[#8c6239]/10 before:rounded-2xl before:pointer-events-none">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-forest-900 pb-3">
                  <h3 className="font-serif font-bold text-sm text-cream-50 uppercase tracking-wider">Guest Testimonials</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTestimonialIdx(prev => (prev - 1 + testimonials.length) % testimonials.length)}
                      className="p-1 rounded-full bg-forest-900 hover:bg-forest-850 text-gold-500 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveTestimonialIdx(prev => (prev + 1) % testimonials.length)}
                      className="p-1 rounded-full bg-forest-900 hover:bg-forest-850 text-gold-500 cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex gap-0.5">
                    {[...Array(testimonials[activeTestimonialIdx].rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                    ))}
                  </div>
                  <p className="text-[11px] text-cream-200 italic leading-relaxed">
                    "{testimonials[activeTestimonialIdx].text}"
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] border-t border-forest-900 pt-3 mt-4">
                <div>
                  <p className="font-bold text-cream-50">{testimonials[activeTestimonialIdx].name}</p>
                  <p className="text-[9px] text-cream-400">{testimonials[activeTestimonialIdx].role}</p>
                </div>
                <span className="text-[9px] font-mono text-cream-300">{testimonials[activeTestimonialIdx].date}</span>
              </div>
            </div>

            {/* Section B: Submit Live Guest Feedback */}
            <div className="bg-forest-950 rounded-2xl border-2 border-[#8c6239]/20 p-6 shadow-xl space-y-4 text-left min-h-[320px] relative before:absolute before:inset-1 before:border before:border-dashed before:border-[#8c6239]/10 before:rounded-2xl before:pointer-events-none">
              <h3 className="font-serif font-bold text-sm text-cream-50 uppercase tracking-wider border-b border-forest-900 pb-3">Submit Live Guest Review</h3>
              
              {reviewSuccess ? (
                <div className="p-4 bg-emerald-500/15 border border-emerald-500/20 text-emerald-500 rounded-lg flex items-center gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Review submitted successfully!</span>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-3 text-xs relative z-10">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        className="w-full bg-forest-900 border border-forest-800 rounded p-2 text-cream-100 focus:outline-none focus:border-gold-500 placeholder:text-forest-700"
                      />
                    </div>
                    <div>
                      <select
                        value={reviewRole}
                        onChange={(e) => setReviewRole(e.target.value)}
                        className="w-full bg-forest-900 border border-forest-800 rounded p-2 text-cream-100 focus:outline-none focus:border-gold-500"
                      >
                        <option value="Sanjivani Student">Sanjivani Student</option>
                        <option value="Bibliophile Guest">Bibliophile Guest</option>
                        <option value="Pizza Lover">Pizza Lover</option>
                      </select>
                    </div>
                  </div>

                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="w-full bg-forest-900 border border-forest-800 rounded p-2 text-cream-100 focus:outline-none focus:border-gold-500 font-mono text-[11px]"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                    <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                  </select>

                  <textarea
                    required
                    rows={2}
                    placeholder="Lovely vibe! Coffee and library environments are perfect."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full bg-forest-900 border border-forest-800 rounded p-2 text-cream-100 focus:outline-none focus:border-gold-500 placeholder:text-forest-700"
                  />

                  <button
                    type="submit"
                    className="w-full py-2 bg-[#8c6239] hover:bg-[#734d26] text-white font-serif font-bold rounded cursor-pointer transition-colors text-xs"
                  >
                    Publish Testimonial
                  </button>
                </form>
              )}
            </div>

            {/* Section C: Live Order Tracking Timeline */}
            <div className="bg-forest-950 rounded-2xl border-2 border-[#8c6239]/20 p-6 shadow-xl space-y-4 text-left min-h-[320px] flex flex-col justify-between relative before:absolute before:inset-1 before:border before:border-dashed before:border-[#8c6239]/10 before:rounded-2xl before:pointer-events-none">
              <div className="space-y-4">
                <h3 className="font-serif font-bold text-sm text-cream-50 uppercase tracking-wider border-b border-forest-900 pb-3">Track Active Order Status</h3>
                
                <form onSubmit={handleTrackOrder} className="flex gap-2 relative z-10">
                  <input
                    type="text"
                    required
                    placeholder="e.g. ord-101"
                    value={orderTrackId}
                    onChange={(e) => setOrderTrackId(e.target.value)}
                    className="bg-forest-900 border border-forest-800 rounded px-3 py-2 text-xs text-cream-100 placeholder:text-forest-700 focus:outline-none focus:border-gold-500 flex-1 font-mono uppercase"
                  />
                  <button
                    type="submit"
                    className="bg-[#8c6239] hover:bg-[#734d26] text-white px-4 py-2 text-xs font-mono font-bold uppercase rounded cursor-pointer"
                  >
                    Track
                  </button>
                </form>
              </div>

              {trackedOrder ? (
                <div className="p-3 bg-forest-900 rounded-xl border border-[#8c6239]/10 space-y-2 text-[11px] animate-fade-in mt-2 flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-center border-b border-forest-950 pb-1">
                    <span className="font-mono text-gold-500 font-bold uppercase">ORDER {trackedOrder.id}</span>
                    <span className="px-2 py-0.5 rounded bg-gold-500/10 text-gold-500 text-[9px] font-mono uppercase font-bold">
                      {trackedOrder.status}
                    </span>
                  </div>

                  <div className="relative pl-5 space-y-3 before:absolute before:left-1.5 before:top-1.5 before:bottom-1.5 before:w-0.5 before:bg-forest-800">
                    <div className="relative">
                      <span className={`absolute -left-[18px] top-0.5 w-3 h-3 rounded-full border border-forest-950 ${trackedOrder.status === 'Cancelled' ? 'bg-red-500' : 'bg-emerald-500'}`} />
                      <p className="font-bold text-cream-50 text-[10px]">Order Received</p>
                    </div>
                    <div className="relative">
                      <span className={`absolute -left-[18px] top-0.5 w-3 h-3 rounded-full border border-forest-950 ${trackedOrder.status === 'Preparing' || trackedOrder.status === 'Completed' ? 'bg-emerald-500 animate-pulse' : 'bg-forest-800'}`} />
                      <p className="font-bold text-cream-50 text-[10px]">Preparing & Brewing</p>
                    </div>
                    <div className="relative">
                      <span className={`absolute -left-[18px] top-0.5 w-3 h-3 rounded-full border border-forest-950 ${trackedOrder.status === 'Completed' ? 'bg-emerald-500' : 'bg-forest-800'}`} />
                      <p className="font-bold text-cream-50 text-[10px]">Ready / Dispatched</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-[10px] text-cream-400 font-mono bg-forest-900 rounded-xl border border-forest-800 mt-2 flex-1 flex items-center justify-center relative z-10">
                  Enter order ID to view serving logs
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* 6. REAL-TIME STATS BANNER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-4 sm:gap-8 bg-forest-900 border border-gold-500/10 rounded-2xl p-6 shadow-lg text-center relative before:absolute before:inset-1 before:border before:border-dashed before:border-[#8c6239]/10 before:rounded-2xl before:pointer-events-none">
          <div className="space-y-1">
            <span className="block text-xl sm:text-3xl font-serif font-bold text-gold-500 font-mono">{pizzaCount}</span>
            <span className="block text-[10px] sm:text-xs text-cream-300 uppercase tracking-widest">Pizzas Baked</span>
          </div>
          <div className="space-y-1 border-x border-forest-800">
            <span className="block text-xl sm:text-3xl font-serif font-bold text-gold-500 font-mono">{diceCount}</span>
            <span className="block text-[10px] sm:text-xs text-cream-300 uppercase tracking-widest">Dice Rolled</span>
          </div>
          <div className="space-y-1">
            <span className="block text-xl sm:text-3xl font-serif font-bold text-gold-500 font-mono">{seatCount}</span>
            <span className="block text-[10px] sm:text-xs text-cream-300 uppercase tracking-widest">Active Readers</span>
          </div>
        </div>
      </div>

    </div>
  );
}
