import { GameCard } from "@/feature/GameCard";
import { useCountryContext } from "@/context/CountryProvider";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { useGameLogic } from "@/hooks/game/useGameLogic";
import type { GameCardListProps } from "@/types/game";

export function GameCardList({
  cardsNumber,
  gameStarted,
  onTimeUpdate,
  onGameWon,
  onRestart
}: GameCardListProps) {
  const { data } = useCountryContext();
  const { t } = useTranslation();
  
  const {
    flippedCards,
    matchedCards,
    gameCards,
    matchingCards,
    moves,
    gameWon,
    time,
    handleCardClick,
    formatTime,
    calculateAccuracy
  } = useGameLogic({
    cardsNumber,
    gameStarted,
    data,
    onTimeUpdate,
    onGameWon
  });

  return (
    <div className="flex flex-col items-center relative justify-center">
      <div className="flex flex-wrap gap-4 justify-center py-3 min-h-[18.75em] md:min-h-[20em] md:max-w-[60em] relative">

        {/* Initial message */}
        {!gameStarted && gameCards.length === 0 && (
          <div className="flex flex-col items-center justify-center min-w-80 p-6 bg-[#223A4E] text-white rounded-xl">
            <div className="text-lg md:text-xl mb-4 text-center">{t('startMessage1')}</div>
            <div className="text-sm md:text-lg text-center">{t('startMessage2')}</div>
          </div>
        )}

        {/* Win message */}
        <AnimatePresence>
          {gameWon && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute p-10 flex flex-col items-center justify-center bg-white bg-opacity-90 z-10 rounded-xl w-70 md:w-80 mx-auto"
            >
              <motion.h2
                className="text-2xl text-center font-bold text-[#14A5BA] mb-2"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                🎉 {t('winMessage1')} 🎉
              </motion.h2>
              <div className="font-medium text-sm md:text-base text-center mb-5">{t('winMessage2')}</div>
              <div className="font-medium text-sm md:text-base">{t('winStats.time')}: {formatTime(time)}</div>
              <div className="font-medium text-sm md:text-base">{t('winStats.Moves')}: {moves}</div>
              <div className="font-medium text-sm md:text-base">{t('winStats.Accuracy')}: {calculateAccuracy()}%</div>
              <button
                onClick={onRestart}
                className="px-4 py-2 mt-6 bg-[#14A5BA] text-white rounded-lg hover:bg-[#0d8fa3] transition cursor-pointer"
              >
                {t('playAgainMessage')}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cards */}
        {!gameWon && gameCards.map(([code, name], index) => (
          <GameCard
            key={`${index}-${code}`}
            code={code}
            name={name}
            isFlipped={flippedCards.includes(index) || matchedCards.includes(code)}
            onClick={() => handleCardClick(index)}
            isMatched={matchedCards.includes(code)}
            isMatching={matchingCards.includes(code)}
          />
        ))}
      </div>
    </div>
  );
};