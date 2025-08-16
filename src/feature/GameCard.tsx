import type { CountryData } from "@/types/country";
import { motion } from "framer-motion";
import IMAGES from "@/assets/images/images";

export function GameCard({ 
  code, 
  name,
  isFlipped,
  onClick,
  isMatched,
  isMatching
}: CountryData & { 
  isFlipped: boolean;
  onClick: () => void;
  isMatched: boolean;
  isMatching: boolean;
}) {
  return (
    <motion.div
      className="w-[6em] h-[6em] perspective-[1000px]"
      onClick={!isMatched ? onClick : undefined}
      layout
    >
      <motion.div
        animate={{ 
          rotateY: isFlipped ? 180 : 0,
          scale: isMatching ? 0.9 : 1
        }}
        transition={{ duration: 0.5 }}
        className="relative transform-3d cursor-pointer"
      >
        {/* Front */}
        <motion.div
          className={`absolute backface-hidden flex bg-[#ddd] rounded-xl h-24 min-w-[6em] w-4 justify-center items-center ${
            isMatched ? "opacity-0" : ""
          }`}
        >
          <img src={IMAGES.flagMatching} alt="Flag Matching" className="h-16" />
        </motion.div>

        {/* Back */}
        <motion.div
          className={`absolute backface-hidden transform-[rotateY(180deg)] flex flex-col bg-white rounded-xl h-24 min-w-[6em] w-4 justify-center items-center gap-2 ${
            isMatched ? "opacity-0" : ""
          }`}
        >
          <img src={`https://flagcdn.com/h240/${code}.png`} alt={name} className="w-[4.5em] h-[3em]" />
          <div className="font-medium text-xs text-center w-19">{name}</div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}