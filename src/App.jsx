import { useState, useMemo } from "react";
import { Search, Gamepad2, Trophy, Ghost, Zap, Filter } from "lucide-react";
import { motion } from "motion/react";
import GameCard from "./components/GameCard";
import GameModal from "./components/GameModal";
import gamesData from "./games.json";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeGame, setActiveGame] = useState(null);

  const categories = ["All", ...Array.from(new Set(gamesData.map(g => g.category)))];

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b-2 border-white p-6 sticky top-0 bg-arcade-black z-40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-arcade-neon text-black brutal-border">
              <Gamepad2 size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-black italic leading-none">Nexus Arcade</h1>
              <p className="text-xs font-mono text-arcade-neon uppercase tracking-widest mt-1">
                Unblocked & Unfiltered
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-grow max-w-2xl">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border-2 border-white p-3 pl-12 focus:outline-none focus:border-arcade-neon transition-colors font-mono"
              />
            </div>
            <button
              onClick={() => {
                const randomGame = gamesData[Math.floor(Math.random() * gamesData.length)];
                setActiveGame(randomGame);
              }}
              className="brutal-btn whitespace-nowrap hidden sm:block"
            >
              Random
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6 max-w-7xl mx-auto w-full">
        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          <div className="flex items-center gap-2 mr-4 text-zinc-500 font-mono text-sm uppercase">
            <Filter size={16} />
            Filter:
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 font-bold uppercase text-sm transition-all ${
                selectedCategory === cat
                  ? "bg-arcade-neon text-black brutal-border-neon"
                  : "bg-zinc-900 text-zinc-400 border-2 border-transparent hover:border-zinc-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Game Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredGames.map((game, idx) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <GameCard game={game} onPlay={setActiveGame} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-zinc-500">
            <Ghost size={64} className="mb-4 opacity-20" />
            <p className="text-xl font-display uppercase italic">No games found in the matrix</p>
            <button 
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="mt-4 text-arcade-neon hover:underline font-mono text-sm"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Stats / Footer Info */}
        <section className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 border-t-2 border-zinc-800 pt-12 pb-12">
          <div className="flex items-start gap-4">
            <Trophy className="text-arcade-neon mt-1" />
            <div>
              <h4 className="font-bold mb-1">High Scores</h4>
              <p className="text-sm text-zinc-500">Global leaderboards coming soon to the Nexus network.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Zap className="text-arcade-pink mt-1" />
            <div>
              <h4 className="font-bold mb-1">Instant Play</h4>
              <p className="text-sm text-zinc-500">No downloads, no logins. Just pure arcade action in your browser.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Ghost className="text-arcade-blue mt-1" />
            <div>
              <h4 className="font-bold mb-1">Stealth Mode</h4>
              <p className="text-sm text-zinc-500">Optimized for low-bandwidth environments and restricted networks.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-white p-8 bg-zinc-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-500 font-mono text-xs uppercase tracking-tighter">
          <p>© 2026 Nexus Arcade Systems. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-arcade-neon transition-colors">Privacy Protocol</a>
            <a href="#" className="hover:text-arcade-neon transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-arcade-neon transition-colors">Contact Admin</a>
          </div>
        </div>
      </footer>

      {/* Game Modal */}
      <GameModal game={activeGame} onClose={() => setActiveGame(null)} />
    </div>
  );
}
