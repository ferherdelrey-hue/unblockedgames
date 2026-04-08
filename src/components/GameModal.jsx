import { motion, AnimatePresence } from "motion/react";
import { X, Maximize2, RotateCcw } from "lucide-react";
import { useState } from "react";

export default function GameModal({ game, onClose }) {
  const [key, setKey] = useState(0);

  const handleRestart = () => {
    setKey(prev => prev + 1);
  };

  return (
    <AnimatePresence>
      {game && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl bg-zinc-900 brutal-border-neon flex flex-col h-[85vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b-2 border-arcade-neon bg-zinc-900">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <h2 className="ml-2 text-lg font-bold text-arcade-neon">{game.title}</h2>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleRestart}
                  className="p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                  title="Restart Game"
                >
                  <RotateCcw size={20} />
                </button>
                <button 
                  className="p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                  title="Fullscreen"
                >
                  <Maximize2 size={20} />
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-red-500 hover:text-white text-zinc-400 transition-colors ml-2"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Game Container */}
            <div className="flex-grow bg-black relative overflow-hidden">
              <iframe
                key={key}
                src={game.iframeUrl}
                className="w-full h-full border-none"
                title={game.title}
                allow="autoplay; fullscreen; keyboard"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Footer */}
            <div className="p-2 bg-zinc-900 border-t-2 border-arcade-neon flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase">
              <span>Status: Online</span>
              <span>Nexus Arcade v1.0.4</span>
              <span>Latency: 14ms</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
