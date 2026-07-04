import { CalendarDays, Users, Clock, Coffee, ShieldAlert, CheckCircle2, Send, Check } from 'lucide-react';
import { useState, FormEvent } from 'react';

interface Table {
  id: number;
  name: string;
  zone: 'quiet' | 'games' | 'any';
  capacity: number;
  status: 'available' | 'reserved';
}

export default function BookTableView() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('18:00');
  const [partySize, setPartySize] = useState(2);
  const [seatingPref, setSeatingPref] = useState<'quiet' | 'games' | 'any'>('any');
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const tables: Table[] = [
    { id: 1, name: 'Table 1 (Reading Corner Box)', zone: 'quiet', capacity: 2, status: 'available' },
    { id: 2, name: 'Table 2 (Curator Study Alcove)', zone: 'quiet', capacity: 1, status: 'available' },
    { id: 3, name: 'Table 3 (Silent Study desk)', zone: 'quiet', capacity: 4, status: 'reserved' },
    { id: 4, name: 'Table 4 (Monopoly Board Table)', zone: 'games', capacity: 6, status: 'available' },
    { id: 5, name: 'Table 5 (Teak Wood Chess Desk)', zone: 'games', capacity: 2, status: 'available' },
    { id: 6, name: 'Table 6 (Carrom Skill Arena)', zone: 'games', capacity: 4, status: 'reserved' },
    { id: 7, name: 'Table 7 (Cozy Couple Booth)', zone: 'any', capacity: 2, status: 'available' },
    { id: 8, name: 'Table 8 (Massive Group Table)', zone: 'any', capacity: 8, status: 'available' }
  ];

  const handleReserveTable = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !date) return;

    const prefLabel =
      seatingPref === 'quiet'
        ? 'Quiet Reading Corner'
        : seatingPref === 'games'
        ? 'Board Game Table'
        : 'Any Cozy Available Table';

    const chosenTableObj = tables.find(t => t.id === selectedTable);
    const tableLabel = chosenTableObj ? chosenTableObj.name : 'Not Pre-Selected (Assign at counter)';

    let bookMsg = `*📚 READ & ROAST TABLE RESERVATION 🎲*\n`;
    bookMsg += `==========================\n`;
    bookMsg += `*Name:* ${name}\n`;
    bookMsg += `*Phone:* ${phone}\n`;
    bookMsg += `*Date:* ${date}\n`;
    bookMsg += `*Time:* ${time}\n`;
    bookMsg += `*Party Size:* ${partySize} Guest(s)\n`;
    bookMsg += `*Seating Pref:* ${prefLabel}\n`;
    bookMsg += `*Selected Table:* ${tableLabel}\n`;
    bookMsg += `==========================\n\n`;
    bookMsg += `Please confirm table availability. Thank you!`;

    const encoded = encodeURIComponent(bookMsg);
    window.open(`https://wa.me/919420032727?text=${encoded}`, '_blank');

    setIsSubmitted(true);
  };

  const filteredTables = tables.filter(t => seatingPref === 'any' || t.zone === seatingPref);

  return (
    <div id="rar-book-table-view" className="space-y-16 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      
      {/* 1. Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-mono tracking-wider uppercase">
          <CalendarDays className="w-3.5 h-3.5" />
          <span>Table Bookings</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-cream-50">
          Reserve a Cozy Corner
        </h1>
        <p className="text-sm text-cream-300">
          Securing a table in advance is highly recommended on weekends and evenings, especially for large groups planning long board-game campaigns or study sessions.
        </p>
      </div>

      {/* 2. Page Form Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left side: Reservation Form / Success state */}
        <div className="lg:col-span-7 bg-forest-900 rounded-2xl border border-gold-500/10 p-6 sm:p-10 shadow-xl">
          {!isSubmitted ? (
            <form onSubmit={handleReserveTable} className="space-y-5 font-sans text-sm">
              <div className="space-y-1.5 text-left">
                <h2 className="text-2xl font-serif font-semibold text-cream-50">Request Your Space</h2>
                <p className="text-xs text-cream-300">Submit the details below. We'll transfer your request to our hostess on WhatsApp.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <div>
                  <label className="block text-xs font-semibold text-cream-200 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Rohit Patil"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-forest-950 border border-forest-800 rounded-lg px-4 py-2.5 text-cream-100 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-cream-200 mb-1">Contact Phone Number</label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    placeholder="e.g., 9420032727"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full bg-forest-950 border border-forest-800 rounded-lg px-4 py-2.5 text-cream-100 focus:outline-none focus:border-gold-500 transition-colors font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                <div>
                  <label className="block text-xs font-semibold text-cream-200 mb-1">Booking Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-forest-950 border border-forest-800 rounded-lg px-4 py-2.5 text-cream-100 focus:outline-none focus:border-gold-500 transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-cream-200 mb-1">Expected Time</label>
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-forest-950 border border-forest-800 rounded-lg px-4 py-2.5 text-cream-100 focus:outline-none focus:border-gold-500 transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-cream-200 mb-1">Number of Guests</label>
                  <select
                    value={partySize}
                    onChange={(e) => setPartySize(Number(e.target.value))}
                    className="w-full bg-forest-950 border border-forest-800 rounded-lg px-4 py-2.5 text-cream-100 focus:outline-none focus:border-gold-500 transition-colors font-mono"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((size) => (
                      <option key={size} value={size} className="bg-forest-950 text-cream-100">
                        {size} Guest{size > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="text-left">
                <label className="block text-xs font-semibold text-cream-200 mb-1">Seating Zone Preference</label>
                <div className="grid grid-cols-3 gap-2 bg-forest-950 p-1 rounded-lg border border-forest-800">
                  {[
                    { id: 'any', label: 'Any Cozy Table' },
                    { id: 'quiet', label: 'Quiet Library Corner' },
                    { id: 'games', label: 'Board Game Table' },
                  ].map((zone) => (
                    <button
                      key={zone.id}
                      type="button"
                      onClick={() => {
                        setSeatingPref(zone.id as any);
                        setSelectedTable(null); // Reset table selection on zone switch
                      }}
                      className={`text-xs py-2 px-2.5 rounded transition-all capitalize font-medium cursor-pointer ${
                        seatingPref === zone.id
                          ? 'bg-gold-500 text-forest-950 font-bold shadow-md'
                          : 'text-cream-300 hover:bg-forest-900'
                      }`}
                    >
                      {zone.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* FEATURE 20: INTERACTIVE VISUAL SEATING MAP */}
              <div className="text-left space-y-2 pt-2">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-semibold text-cream-200">Interactive Seating Map Selector</label>
                  <span className="text-[10px] font-mono text-gold-400">Filter matches preference</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-forest-950 p-4 rounded-xl border border-forest-800">
                  {filteredTables.map((table) => {
                    const isReserved = table.status === 'reserved';
                    const isSelected = selectedTable === table.id;

                    return (
                      <button
                        key={table.id}
                        type="button"
                        disabled={isReserved}
                        onClick={() => setSelectedTable(isSelected ? null : table.id)}
                        className={`p-3 rounded-lg border text-center flex flex-col justify-between h-20 transition-all text-xs font-mono relative group ${
                          isReserved
                            ? 'bg-forest-950 border-red-500/10 text-red-500/50 cursor-not-allowed opacity-50'
                            : isSelected
                            ? 'bg-gold-500/20 border-gold-500 text-gold-400 scale-[1.02] shadow-md'
                            : 'bg-forest-900 border-gold-500/5 text-cream-300 hover:border-gold-500/20 cursor-pointer'
                        }`}
                      >
                        <span className="font-bold text-[10px] block truncate">{table.name.split(' ')[0] + ' ' + table.name.split(' ')[1]}</span>
                        <span className="text-[9px] block text-cream-400 opacity-80 mt-1">Cap: {table.capacity}p</span>
                        
                        <div className="absolute top-1 right-1">
                          {isSelected && <Check className="w-3.5 h-3.5 text-gold-400 bg-forest-950 rounded-full p-0.5 border border-gold-500" />}
                        </div>

                        <span className={`text-[8px] uppercase font-bold tracking-wider block mt-2 text-right ${isReserved ? 'text-red-400' : isSelected ? 'text-gold-400' : 'text-emerald-400'}`}>
                          {isReserved ? 'Booked' : isSelected ? 'Selected' : 'Free'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-3 rounded bg-forest-950 border-l-2 border-gold-500 flex items-start gap-2.5 text-left">
                <ShieldAlert className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-cream-300 leading-normal font-sans">
                  All table bookings are held for a maximum of <span className="font-bold text-gold-400">15 minutes</span>. If you're running late, please call our hotline at +91 94200 32727 to prevent cancellation.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gold-500 hover:bg-gold-400 text-forest-950 font-serif font-bold rounded-lg transition-all shadow-md hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Request Booking via WhatsApp</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-10 space-y-6 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-serif font-bold text-cream-50">Reservation Request Dispatched!</h2>
                <p className="text-sm text-cream-300 max-w-md mx-auto leading-relaxed">
                  Excellent! We have sent a detailed booking template containing your coordinates directly to **+91 94200 32727** on WhatsApp. The RAR team will reply with your table's active reservation confirmation code shortly!
                </p>
              </div>

              <div className="p-4 bg-forest-950 rounded-xl border border-gold-500/10 max-w-sm mx-auto space-y-2 text-xs text-left font-mono">
                <p><span className="text-forest-500">GUEST:</span> {name}</p>
                <p><span className="text-forest-500">DATE & TIME:</span> {date} at {time}</p>
                <p><span className="text-forest-500">COZY ZONE:</span> {seatingPref === 'quiet' ? 'Library Reading Corner' : seatingPref === 'games' ? 'Board Game Hub' : 'Standard Seating'}</p>
                <p><span className="text-forest-500">TABLE SPEC:</span> {selectedTable ? `Table #${selectedTable} (${tables.find(t=>t.id===selectedTable)?.name.split(' (')[1].slice(0,-1)})` : 'Counter Assigned'}</p>
                <p><span className="text-forest-500">PARTY:</span> {partySize} Guest(s)</p>
              </div>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setName('');
                  setPhone('');
                  setDate('');
                  setSelectedTable(null);
                }}
                className="px-6 py-2 bg-forest-950 hover:bg-forest-900 border border-gold-500/20 text-xs font-mono uppercase text-cream-300 hover:text-gold-400 rounded-lg transition-colors cursor-pointer"
              >
                Place Another Table Request
              </button>
            </div>
          )}
        </div>

        {/* Right side: Hostess details & guidelines */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <div className="p-6 rounded-2xl bg-forest-900 border border-gold-500/10 space-y-4 shadow-lg">
            <h3 className="font-serif font-medium text-cream-50 text-lg border-b border-forest-950 pb-2">
              Our Seating Choices
            </h3>

            <div className="space-y-4 text-xs font-sans">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold-500/10 text-gold-400 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-cream-100">Board Game Tables (Up to 10 guests)</h4>
                  <p className="text-cream-300 mt-1 leading-normal">
                    Expansive teak-wood tables with low glare lighting, perfect for large group roll-and-relax sessions like Monopoly or Carrom tournaments.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold-500/10 text-gold-400 flex items-center justify-center shrink-0">
                  <Coffee className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-cream-100">Quiet Library Corners (For study/work)</h4>
                  <p className="text-cream-300 mt-1 leading-normal">
                    Equipped with power points, warm individual study lamps, and nestled right adjacent to our 200+ curated books collection. Perfect for Sanjivani college self-study or reading.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold-500/10 text-gold-400 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-cream-100">Event Hosting & Birthday Bashes</h4>
                  <p className="text-cream-300 mt-1 leading-normal">
                    Planning a customized group event or board-game themed party? Contact our coordinator at <span className="font-bold text-gold-400">+91 94200 32727</span> for booking pricing packages.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Opening guidelines */}
          <div className="p-6 rounded-2xl bg-forest-950 border border-forest-900 text-xs space-y-2">
            <h4 className="font-serif font-bold text-cream-50 uppercase tracking-wider">Operational Hours Reminder</h4>
            <p className="text-cream-300 font-sans leading-relaxed">
              Our reservation book remains open daily from **11:00 AM to 10:30 PM**. For immediate table holds within the next 2 hours, please call us directly on WhatsApp instead of using the reservation form!
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
