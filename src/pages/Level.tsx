import { useParams } from "react-router-dom";
import { levelItems } from "@/utils/LevelData";
import { GameCardList } from "@/feature/GameCardList";
import { useState } from "react";

export default function Level() {
  const { id } = useParams();
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [time, setTime] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const cardsNumber = levelItems.find(({ name }) => name === id )?.cards;

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
    <div className="font-[Roboto]">
      <div className="relative bg-[url(/src/assets/images/bg-flags.jpeg)] bg-cover min-h-[2em] min-w-[18em]">
        <div className="absolute inset-0 bg-[#223A4E] opacity-75"></div>
        <div className="overlay w-full h-12 z-5"></div>
      </div>

      <div className="flex flex-col bg-[#223A4E] min-h-[6em] w-full">
        <div className="w-fit pt-5 pb-2">
          <div className="text-xl font-bold text-white pl-5">
            Level {id}
          </div>
          <div className="bg-[#14A5BA] h-1 rounded-r-2xl"></div>
        </div>
        <div className="pl-5 text-white text-xs w-60">
          Here you have {cardsNumber} cards. Find and match all the country flags!
        </div>
      </div>

      <div className="flex justify-center items-center bg-[#223A4E] py-2 min-h-[2.5em]">
        {!gameStarted ? (
          <button onClick={handleStartGame} className="bg-[#14A5BA] px-8 py-2 rounded-lg text-white hover:bg-[#0d8fa3] transition cursor-pointer">
            Start
          </button>
        ) : !gameWon ? (
          <div className="text-white font-medium text-sm">
            Time: <span>{formatTime(time)}</span>
          </div>
        ) : null}
      </div>

      <div className="bg-[#223A4E] min-h-[26em]">
        <div>
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
    </div>
  )
}