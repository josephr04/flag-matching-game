import { GameCard } from "@/feature/GameCard";
import { useCountryContext } from "@/context/CountryProvider";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import flipSound from '@/assets/sounds/card-flip.mp3';
import matchSound from '@/assets/sounds/match.mp3';
import winSound from '@/assets/sounds/win.mp3';
import { useTranslation } from 'react-i18next';

interface GameCardListProps {
  cardsNumber: number;
  gameStarted: boolean;
  onTimeUpdate: (time: number) => void;
  onGameWon: () => void;
  onRestart: () => void;
}

export function GameCardList({
  cardsNumber,
  gameStarted,
  onTimeUpdate,
  onGameWon,
  onRestart
}: GameCardListProps) {
  const { data } = useCountryContext();
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<string[]>([]);
  const [gameCards, setGameCards] = useState<Array<[string, string]>>([]);
  const [matchingCards, setMatchingCards] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [pairsLeft, setPairsLeft] = useState(cardsNumber / 2);
  const [gameWon, setGameWon] = useState(false);
  const [time, setTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const flipAudioRef = useRef<HTMLAudioElement | null>(null);
  const winAudioRef = useRef<HTMLAudioElement | null>(null);
  const matchAudioRef = useRef<HTMLAudioElement | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    flipAudioRef.current = new Audio(flipSound);
    winAudioRef.current = new Audio(winSound);
    matchAudioRef.current = new Audio(matchSound);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (gameStarted && !gameWon) {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [gameStarted, gameWon]);

  useEffect(() => {
    if (gameStarted && !gameWon) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameStarted, gameWon]);

  useEffect(() => {
    onTimeUpdate(time);
  }, [time, onTimeUpdate]);

  useEffect(() => {
    if (gameStarted && Object.keys(data).length > 0) {
      const pairs = cardsNumber / 2;
      const randomCountries = Object.entries(data)
        .sort(() => Math.random() - 0.5)
        .slice(0, pairs);

      const duplicated = [...randomCountries, ...randomCountries];
      const shuffled = duplicated.sort(() => Math.random() - 0.5);
      setGameCards(shuffled);

      setPairsLeft(pairs);
      setGameWon(false);
      setTime(0);
      setMoves(0);
      resetGameState();
    }
  }, [gameStarted, data, cardsNumber]);

  const resetGameState = () => {
    setFlippedCards([]);
    setMatchedCards([]);
    setMatchingCards([]);
  };

  useEffect(() => {
    if (flippedCards.length === 2 && gameStarted) {
      const newMoves = moves + 1;
      setMoves(newMoves);

      const [firstIndex, secondIndex] = flippedCards;
      const [firstCode] = gameCards[firstIndex];
      const [secondCode] = gameCards[secondIndex];

      if (firstCode === secondCode) {
        if (matchAudioRef.current) {
          matchAudioRef.current.currentTime = 0;
          matchAudioRef.current.play();
        }

        setMatchingCards([firstCode]);
        setTimeout(() => {
          setMatchedCards(prev => [...prev, firstCode]);
          setMatchingCards([]);
          setFlippedCards([]);
          setPairsLeft(prev => prev - 1);
        }, 700);
      } else {
        setTimeout(() => setFlippedCards([]), 500);
      }
    }
  }, [flippedCards, gameCards, gameStarted]);

  useEffect(() => {
    if (pairsLeft === 0 && cardsNumber > 0 && gameStarted) {
      if (winAudioRef.current) {
        winAudioRef.current.play();
      }
      setGameWon(true);
      onGameWon();
    }
  }, [pairsLeft, cardsNumber, gameStarted, onGameWon]);

  const handleCardClick = (index: number) => {
    if (flipAudioRef.current && !flippedCards.includes(index) && flippedCards.length < 2) {
      flipAudioRef.current.currentTime = 0;
      flipAudioRef.current.play()
    }

    if (
      !gameStarted ||
      flippedCards.includes(index) ||
      matchedCards.includes(gameCards[index][0]) ||
      matchingCards.includes(gameCards[index][0]) ||
      flippedCards.length >= 2
    ) return;

    setFlippedCards(prev => [...prev, index]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateAccuracy = () => {
    if (moves === 0) return 0;
    const correctPairs = (cardsNumber / 2) - pairsLeft;
    const correctMoves = correctPairs * 2;
    return Math.round((correctMoves / moves) * 100);
  };

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
}
