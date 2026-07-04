import { Search, Gamepad2, BookOpen, Clock, Users, Star } from 'lucide-react';
import { BoardGame, Book } from '../types';
import { useState, useMemo } from 'react';
import { BOARD_GAMES, BOOKS_LIST } from '../data/mockData';

const GENRES = [
  'All',
  'Classics',
  'Sci-Fi & Fantasy',
  'Mystery & Thriller',
  'Rom-Coms',
  'Self-Help',
  'Indian Lit',
];

export default function GamesView() {
  const [bookSearch, setBookSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [gameCategory, setGameCategory] = useState<string>('All');

  const filteredBooks = useMemo(() => {
    return BOOKS_LIST.filter((book) => {
      const matchesGenre = selectedGenre === 'All' || book.genre === selectedGenre;
      const matchesSearch =
        book.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
        book.author.toLowerCase().includes(bookSearch.toLowerCase());
      return matchesGenre && matchesSearch;
    });
  }, [selectedGenre, bookSearch]);

  const uniqueGameCategories = useMemo(() => {
    return ['All', ...Array.from(new Set(BOARD_GAMES.map((g) => g.category)))];
  }, []);

  const filteredGames = useMemo(() => {
    return BOARD_GAMES.filter((game) => {
      return gameCategory === 'All' || game.category === gameCategory;
    });
  }, [gameCategory]);

  return (
    <div id="rar-games-view" className="space-y-20 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      
      {/* Introduction Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-mono tracking-wider uppercase">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>Screen-Free Entertainment Zone</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-cream-50">
          The Board Game Arena & Library
        </h1>
        <p className="text-sm text-cream-300">
          Disconnect from the digital noise. Dive into our hand-selected library of over 200 books or challenge your college friends to 9 of the world's best strategic tabletop and board games.
        </p>
      </div>

      {/* SECTION 1: BOARD GAMES TRACKER */}
      <div className="space-y-8">
        <div className="border-b border-forest-900 pb-5 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-xs font-mono uppercase tracking-widest text-gold-500 font-bold block">Tabletop Playlists</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-cream-100">
              The Roll & Relax Grid (9 Games)
            </h2>
          </div>

          {/* Quick game filters */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none max-w-full">
            {uniqueGameCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setGameCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-wider transition-all whitespace-nowrap border ${
                  gameCategory === cat
                    ? 'bg-emerald-700 border-emerald-600 text-cream-50 font-bold'
                    : 'bg-forest-900 border-gold-500/5 text-cream-300 hover:text-gold-400'
                }`}
              >
                {cat === 'All' ? 'All Games' : cat.split(' & ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="bg-forest-900 rounded-xl border border-gold-500/10 overflow-hidden shadow-lg flex flex-col group hover:border-gold-500/25 transition-all duration-300"
            >
              <div className="relative h-44 bg-forest-950 overflow-hidden shrink-0">
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-3 left-3 bg-forest-950/80 backdrop-blur-xs px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-widest text-gold-400 border border-gold-500/15">
                  {game.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-bold text-cream-50 group-hover:text-gold-400 transition-colors">
                    {game.name}
                  </h3>
                  <p className="text-xs text-cream-300 leading-relaxed font-sans truncate-3-lines">
                    {game.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 border-t border-forest-950/50 pt-3 text-xs font-mono text-cream-200">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-gold-500" />
                    <span>{game.players}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gold-500" />
                    <span>{game.playTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: 200+ BOOK CATALOGUE */}
      <div className="space-y-8 bg-forest-900/10 p-6 sm:p-10 rounded-2xl border border-forest-900/60">
        <div className="space-y-4 text-center max-w-xl mx-auto">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-gold-500 font-bold block">Literary Treasury</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-cream-100">
              Curated 200+ Book Catalogue
            </h2>
          </div>
          <p className="text-xs text-cream-300 font-sans">
            Read from our physical shelves containing bestsellers, manga, rom-coms, business primers, and classic philosophy, entirely free while dining!
          </p>
        </div>

        {/* Search and Filters bar */}
        <div className="space-y-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-500" />
            <input
              type="text"
              placeholder="Search library books by Title or Author..."
              value={bookSearch}
              onChange={(e) => setBookSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-forest-900 border border-gold-500/10 hover:border-gold-500/30 focus:border-gold-500/60 rounded-lg text-xs text-cream-100 placeholder:text-forest-600 focus:outline-none transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 justify-start sm:justify-center scrollbar-none">
            {GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all whitespace-nowrap border ${
                  selectedGenre === genre
                    ? 'bg-gold-500 border-gold-400 text-forest-950 font-bold'
                    : 'bg-forest-950 border-gold-500/5 text-cream-300 hover:text-gold-400 hover:border-gold-500/20'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Books display as Covers */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-12 text-forest-500 text-xs">
            No matching books found in our Kopargaon shelves. Ask our library curator!
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="group flex flex-col cursor-pointer"
              >
                {/* Book Cover Card */}
                <div className="relative h-64 rounded-lg overflow-hidden border border-gold-500/10 group-hover:border-gold-400/40 shadow-md group-hover:shadow-xl transition-all duration-300 bg-forest-950">
                  <img
                    src={book.image || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400'}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Rating Badge */}
                  <div className="absolute top-2 right-2 bg-forest-950/85 backdrop-blur-xs px-2 py-0.5 rounded-md flex items-center gap-1 text-[10px] font-mono text-gold-400 border border-gold-500/10">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{book.rating}</span>
                  </div>
                  {/* Genre Badge */}
                  <div className="absolute bottom-2 left-2 bg-forest-950/85 backdrop-blur-xs px-2 py-0.5 rounded-md text-[8px] font-mono uppercase tracking-wider text-cream-200 border border-gold-500/10">
                    {book.genre}
                  </div>
                </div>

                {/* Book Details below cover */}
                <div className="mt-2.5 text-left space-y-0.5">
                  <h4 className="font-serif font-bold text-sm text-cream-50 leading-snug line-clamp-2 group-hover:text-gold-400 transition-colors">
                    {book.title}
                  </h4>
                  <p className="text-xs text-cream-300 font-sans">
                    by {book.author}
                  </p>
                  <p className="text-[10px] font-mono text-emerald-500 flex items-center gap-1 pt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Available on Shelf
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
