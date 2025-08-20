import type { Country } from "@/types/country";
import { motion } from "framer-motion";
import IMAGES from "@/assets/images/images";

export function GameCard({ 
  code, 
  name,
  isFlipped,
  onClick,
  isMatched,
  isMatching
}: Country & { 
  isFlipped: boolean;
  onClick: () => void;
  isMatched: boolean;
  isMatching: boolean;
}) {
  return (
    <motion.div
      className="w-[6em] h-[6em] md:w-[12em] md:h-[12em] perspective-[1000px]" 
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
          className={`absolute backface-hidden flex bg-[#ddd] rounded-xl h-[6em] w-[6em] md:h-[12em] md:w-[12em] justify-center items-center ${
            isMatched ? "opacity-0" : ""
          }`}
        >
          <img src={IMAGES.flagMatching} alt="Flag Matching" className="h-10 md:h-28" />
        </motion.div>

        {/* Back */}
        <motion.div
          className={`absolute backface-hidden transform-[rotateY(180deg)] flex flex-col bg-white rounded-xl h-[6em] w-[6em] md:h-[12em] md:w-[12em] justify-center items-center gap-2 md:gap-4 ${
            isMatched ? "opacity-0" : ""
          }`}
        >
          <img 
            src={`https://flagcdn.com/h240/${code}.png`} 
            alt={name} 
            className="w-[4.5em] h-[3em] md:w-[10em] md:h-[6em]" 
          />
          <div className="font-medium text-xs md:text-lg text-center w-19 md:w-auto">
            {name}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
