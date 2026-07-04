import { Award, GraduationCap, CheckCircle2, Star, Instagram, Flame, Quote, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';
import { useState, FormEvent } from 'react';
import RatingBadge from '../components/RatingBadge';

export default function StudentHubView() {
  const [studentName, setStudentName] = useState('');
  const [college, setCollege] = useState('Sanjivani College of Engineering');
  const [studentId, setStudentId] = useState('');
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    coupon: string;
    message: string;
  } | null>(null);

  const handleValidateID = (e: FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentId) return;

    // Simulate validation checking for Kopargaon colleges
    const isSanjivani = college.toLowerCase().includes('sanjivani');
    const couponCode = isSanjivani ? `RAR_SANJIVANI_15` : `RAR_KOPARGAON_10`;
    const discountAmt = isSanjivani ? '15%' : '10%';

    setValidationResult({
      isValid: true,
      coupon: couponCode,
      message: `Congratulations ${studentName}! Your ID from ${college} has been validated. Show this coupon code to the cashier at the Godavari Complex counter during Happy Hours (11:00 AM – 4:00 PM) to claim your ${discountAmt} student discount.`,
    });
  };

  return (
    <div id="rar-student-hub-view" className="space-y-16 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      
      {/* 1. Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono tracking-wider uppercase">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Sanjivani Student Perks</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-cream-50">
          The Student Corner
        </h1>
        <p className="text-sm text-cream-300">
          Located just minutes away from Sanjivani College, Read & Roast is built for you. Access exclusive daily discounts, co-working corners with fast fiber WiFi, and late-night study sessions.
        </p>
      </div>

      {/* 2. Happy Hour Student Discount Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-forest-900 to-forest-850 border border-gold-500/15 overflow-hidden p-8 sm:p-12 shadow-2xl">
        <div className="absolute right-0 bottom-0 top-0 opacity-10 bg-[radial-gradient(#caa141_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-1 bg-gold-500 text-forest-950 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded">
              <Award className="w-3.5 h-3.5" />
              Daily Study Happy Hour
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-cream-50 leading-tight">
              Get 15% OFF Everyday<br />
              Between 11:00 AM – 4:00 PM
            </h2>
            <p className="text-sm text-cream-300 font-sans leading-relaxed">
              Show your physical or validated digital Student ID Card at our counter to receive flat discounts on all individual wood-fired pizzas, gourmet burger, wraps, maggi and coffees!
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-cream-200 pt-2 font-mono">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>15% Off for Sanjivani Students</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>10% Off for other local colleges</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Valid Monday to Sunday</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                <span>High Speed Charger-equipped desks</span>
              </li>
            </ul>
          </div>

          {/* Dynamic ID Validator Widget */}
          <div className="lg:col-span-5 bg-forest-950/70 p-6 rounded-xl border border-gold-500/10 space-y-4 shadow-xl">
            <h3 className="font-serif font-bold text-sm text-gold-400 flex items-center gap-2 border-b border-forest-900 pb-2">
              <GraduationCap className="w-4 h-4" />
              Student Discount Validator
            </h3>

            {!validationResult ? (
              <form onSubmit={handleValidateID} className="space-y-3 text-xs font-sans">
                <div>
                  <label className="block text-[10px] font-mono text-cream-300 uppercase tracking-wider mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Pooja Patil"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full bg-forest-900 border border-forest-800 rounded px-3 py-2 text-cream-100 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-cream-300 uppercase tracking-wider mb-1">Select Institute</label>
                  <select
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full bg-forest-900 border border-forest-800 rounded px-3 py-2 text-cream-100 focus:outline-none focus:border-gold-500"
                  >
                    <option value="Sanjivani College of Engineering">Sanjivani College of Engineering (SCOE)</option>
                    <option value="Sanjivani K.B.P. Polytechnic">Sanjivani K.B.P. Polytechnic</option>
                    <option value="Sanjivani College of Pharmaceutical Sciences">Sanjivani Pharmacy College</option>
                    <option value="K.B. Rohamare College">K.B. Rohamare College, Kopargaon</option>
                    <option value="Other local Kopargaon School/College">Other local Institute</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-cream-300 uppercase tracking-wider mb-1">Student ID Card Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., SCOE-CS-2026-081"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full bg-forest-900 border border-forest-800 rounded px-3 py-2 text-cream-100 focus:outline-none focus:border-gold-500 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-gold-500 hover:bg-gold-400 text-forest-950 font-serif font-bold rounded transition-colors text-xs uppercase shadow"
                >
                  Generate Discount Coupon
                </button>
              </form>
            ) : (
              <div className="space-y-4 text-center py-2 animate-fade-in">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-emerald-500 uppercase font-bold tracking-wider block">ID Status: Verified</span>
                  <p className="text-xs text-cream-200 leading-relaxed px-1">
                    {validationResult.message}
                  </p>
                </div>

                <div className="p-3 bg-forest-900 border border-dashed border-gold-500/30 rounded-lg">
                  <span className="text-[9px] font-mono text-forest-500 block uppercase tracking-wider">Coupon Code</span>
                  <span className="text-base font-mono font-bold text-gold-400 tracking-widest">{validationResult.coupon}</span>
                </div>

                <button
                  onClick={() => setValidationResult(null)}
                  className="text-[10px] font-mono uppercase text-cream-400 hover:text-gold-400 underline block mx-auto"
                >
                  Validate another ID
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 3. Instagram Social Embed Section */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <span className="text-xs font-mono uppercase tracking-widest text-gold-500 font-bold block">Social Life</span>
          <h2 className="text-2xl sm:text-3xl font-serif text-cream-100 font-semibold tracking-tight">Our Student Wall of Fame</h2>
          <p className="text-xs text-cream-300">Tag <span className="text-gold-400 font-semibold">#ReadAndRoast</span> and showcase your board-game wins, book discoveries, and delicious espresso pours!</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { img: 'https://images.unsplash.com/photo-1543388713-1bca3bc5a6f8?auto=format&fit=crop&q=80&w=300', tag: '#JengaBattle' },
            { img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=300', tag: '#IrishFrappe' },
            { img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=300', tag: '#UjiMatcha' },
            { img: 'https://images.unsplash.com/photo-1510972527409-cef190317417?auto=format&fit=crop&q=80&w=300', tag: '#LitCafe' },
            { img: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&q=80&w=300', tag: '#ExoticPaneer' },
            { img: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&q=80&w=300', tag: '#MonopolyWin' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative aspect-square rounded-lg overflow-hidden group border border-gold-500/5 shadow"
            >
              <div className="absolute inset-0 bg-forest-950/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center z-10 p-2 text-center">
                <Instagram className="w-6 h-6 text-gold-400 mb-1" />
                <span className="text-[10px] font-mono font-bold text-cream-50">{item.tag}</span>
              </div>
              <img
                src={item.img}
                alt={`Instagram student tag ${idx}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 4. Full Expanded Testimonial Wall */}
      <div className="space-y-8 bg-forest-900/10 p-6 sm:p-10 rounded-2xl border border-forest-900/60">
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-forest-800 pb-5 gap-4">
          <div className="space-y-1 text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-gold-500 font-bold block">Guest Endorsements</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-cream-100">
              The RAR Testimonial Wall
            </h2>
          </div>
          
          {/* Prominent Badge */}
          <RatingBadge />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="bg-forest-900 p-6 rounded-xl border border-gold-500/5 shadow-md hover:border-gold-500/15 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-gold-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(test.rating) ? 'fill-current' : 'opacity-30'}`} />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-forest-500">{test.date}</span>
                </div>
                <p className="text-xs text-cream-200 font-sans leading-relaxed italic">
                  "{test.text}"
                </p>
              </div>

              <div className="flex items-start gap-2 pt-3 border-t border-forest-950/40">
                <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400 font-serif font-bold text-sm shrink-0">
                  {test.name[0]}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xs text-cream-50">{test.name}</h4>
                  <p className="text-[10px] text-cream-400 font-mono mt-0.5">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
