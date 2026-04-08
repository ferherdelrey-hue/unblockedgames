import { motion } from "motion/react";
import { Play } from "lucide-react";

export default function GameCard({ game, onPlay }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative bg-zinc-900 brutal-border overflow-hidden flex flex-col h-full"
    >
      <div className="relative aspect-video overflow-hidden border-b-2 border-white">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-2 left-2 px-2 py-0.5 bg-arcade-neon text-black text-[10px] font-bold uppercase">
          {game.category}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-1 group-hover:text-arcade-neon transition-colors">
          {game.title}
        </h3>
        <p className="text-zinc-400 text-sm mb-4 flex-grow">
          {game.description}
        </p>
        
        <button
          onClick={() => onPlay(game)}
          className="brutal-btn w-full flex items-center justify-center gap-2 group-hover:bg-arcade-neon group-hover:text-black transition-colors"
        >
          <Play size={16} fill="currentColor" />
          Play Now
        </button>
      </div>
    </motion.div>
  );
}
