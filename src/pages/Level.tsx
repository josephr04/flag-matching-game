import { useParams, Navigate } from "react-router-dom";
import { levelItems } from "@/utils/LevelData";
import { GameCardList } from "@/feature/GameCardList";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

export default function Level() {
  const { id } = useParams();
  const level = levelItems.find((i) => i.name === id);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [time, setTime] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const cardsNumber = levelItems.find(({ name }) => name === id )?.cards;
  const { t } = useTranslation();

  if (!level) {
    return <Navigate to="/" replace />
  };

  const handleStartGame = () => {
    setGameStarted(true);
    setGameWon(false);
    setTime(0);
    setResetKey(prev => prev + 1);
  };

  const handleGameWon = () => {
    setGameWon(true);
  };

  const handleRestartGame = () => {
    handleStartGame();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="font-[Roboto] min-w-[18em] min-h-screen flex flex-col">
      {/* Header section */}
      <div className="relative bg-[url(/src/assets/images/bg-flags.jpg)] bg-cover min-h-[9em] md:min-h-[13em] min-w-[18em] flex-shrink-0">
        <div className="absolute inset-0 bg-[#223A4E] opacity-75"></div>
        <div className="absolute overlay inset-0 w-full h-full z-5"></div>

        <div className="absolute z-5 flex flex-col justify-end h-full pb-4">
          <div className="w-fit pb-2">
            <div className="text-xl md:text-3xl font-bold text-white pl-5 md:pl-8">
              {t('level')} {t(`difficulty.${id}`)}
            </div>
            <div className="bg-[#14A5BA] h-1 rounded-r-2xl"></div>
          </div>
          <div className="text-white text-xs md:text-base w-60 md:w-md pl-5 md:pl-8">
            {t('levelDescription', {count: cardsNumber})}
          </div>
        </div>
      </div>

      {/* Timer/Start button section */}
      <div className="flex justify-center items-center bg-[#223A4E] py-2 md:py-5 min-h-[2.5em] flex-shrink-0">
        {!gameStarted ? (
          <button onClick={handleStartGame} className="bg-[#14A5BA] px-8 py-2 md:text-lg md:px-8 md:py-2 rounded-lg text-white hover:bg-[#0d8fa3] transition cursor-pointer">
            {t('buttonMessage')}
          </button>
        ) : !gameWon ? (
          <div className="text-white font-medium text-sm md:text-lg">
            Time: <span>{formatTime(time)}</span>
          </div>
        ) : null}
      </div>

      {/* Cards section */}
      <div className="bg-[#223A4E] flex-grow overflow-auto">
        <GameCardList 
          key={resetKey} 
          cardsNumber={cardsNumber ?? 0} 
          gameStarted={gameStarted}
          onTimeUpdate={setTime}
          onGameWon={handleGameWon}
          onRestart={handleRestartGame}
        />
      </div>
    </div>
  )
}