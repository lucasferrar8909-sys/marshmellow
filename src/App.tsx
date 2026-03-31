import { useState, useEffect } from 'react';
import { Gamepad2, X, Maximize2, ExternalLink, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './games.json';

interface Game {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
}

export default function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setGames(gamesData);
  }, []);

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/20">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Unblocked Hub
            </h1>
          </div>

          <div className="relative max-w-xs w-full hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Mobile Search */}
        <div className="relative w-full mb-8 md:hidden">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-800 rounded-full py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>

        {/* Hero Section */}
        {!searchQuery && (
          <section className="mb-12">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 p-8 md:p-12 shadow-2xl shadow-indigo-500/20">
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                  Play Your Favorite Games Anywhere.
                </h2>
                <p className="text-indigo-100 text-lg mb-8 opacity-90">
                  Fast, free, and unblocked. No downloads required. Just pick a game and start playing instantly in your browser.
                </p>
                <button 
                  onClick={() => document.getElementById('game-grid')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition-colors shadow-lg"
                >
                  Browse All Games
                </button>
              </div>
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl" />
            </div>
          </section>
        )}

        {/* Game Grid */}
        <div id="game-grid" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredGames.map((game) => (
              <motion.div
                key={game.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -4 }}
                className="group cursor-pointer"
                onClick={() => setSelectedGame(game)}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-800 border border-slate-800 group-hover:border-indigo-500/50 transition-all shadow-lg">
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-bold text-white text-sm md:text-base truncate">
                      {game.title}
                    </h3>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-indigo-600 p-3 rounded-full shadow-xl">
                      <Maximize2 className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">No games found matching "{searchQuery}"</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <Gamepad2 className="w-5 h-5" />
            <span className="font-semibold">Unblocked Hub</span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2026 Unblocked Games Hub. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-indigo-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* Game Player Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-950/95 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-6xl h-full max-h-[90vh] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-white">{selectedGame.title}</h2>
                  <a 
                    href={selectedGame.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-all"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <button
                  onClick={() => setSelectedGame(null)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Iframe Container */}
              <div className="flex-1 bg-black relative">
                <iframe
                  src={selectedGame.url}
                  className="w-full h-full border-none"
                  title={selectedGame.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-slate-900/50 flex items-center justify-between">
                <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
                  Playing: {selectedGame.title}
                </p>
                <div className="flex gap-2">
                   <button 
                    onClick={() => setSelectedGame(null)}
                    className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-white transition-colors"
                   >
                    Close Game
                   </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
