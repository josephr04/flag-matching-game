import { useState, useEffect } from "react";
import { useGameSounds } from "@/hooks/useSound";
import { useTimer } from "@/hooks/useTimer";
import { useGameUtilities } from "@/hooks/game/useGameUtilities";
import type { UseGameLogicProps } from "@/types/game";

export function useGameLogic({
  cardsNumber,
  gameStarted,
  data,
  onTimeUpdate,
  onGameWon
}: UseGameLogicProps) {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<string[]>([]);
  const [gameCards, setGameCards] = useState<Array<[string, string]>>([]);
  const [matchingCards, setMatchingCards] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [pairsLeft, setPairsLeft] = useState(cardsNumber / 2);
  const [gameWon, setGameWon] = useState(false);
  const { flip, match, win } = useGameSounds();
  const { formatTime, calculateAccuracy } = useGameUtilities();
  const { time, reset: resetTimer } = useTimer(gameStarted && !gameWon, onTimeUpdate);

  // Prevent page reload during active game
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (gameStarted && !gameWon) {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [gameStarted, gameWon]);

  // Update time
  useEffect(() => {
    onTimeUpdate(time);
  }, [time, onTimeUpdate]);

  // Initialize game
  useEffect(() => {
    if (gameStarted && Object.keys(data).length > 0) {
      initializeGame();
    }
  }, [gameStarted, data, cardsNumber]);

  // Handle card flipping logic
  useEffect(() => {
    if (flippedCards.length === 2 && gameStarted) {
      handleTwoCardsFlipped();
    }
  }, [flippedCards, gameCards, gameStarted]);

  // Check win condition
  useEffect(() => {
    if (pairsLeft === 0 && cardsNumber > 0 && gameStarted) {
      handleGameWin();
    }
  }, [pairsLeft, cardsNumber, gameStarted, onGameWon]);

  const initializeGame = () => {
    const pairs = cardsNumber / 2;
    const randomCountries = Object.entries(data)
      .sort(() => Math.random() - 0.5)
      .slice(0, pairs);

    const duplicated = [...randomCountries, ...randomCountries];
    const shuffled = duplicated.sort(() => Math.random() - 0.5);
    
    setGameCards(shuffled);
    setPairsLeft(pairs);
    setGameWon(false);
    resetTimer();
    setMoves(0);
    resetGameState();
  };

  const resetGameState = () => {
    setFlippedCards([]);
    setMatchedCards([]);
    setMatchingCards([]);
  };

  const handleTwoCardsFlipped = () => {
    const newMoves = moves + 1;
    setMoves(newMoves);

    const [firstIndex, secondIndex] = flippedCards;
    const [firstCode] = gameCards[firstIndex];
    const [secondCode] = gameCards[secondIndex];

    if (firstCode === secondCode) {
      handleMatch(firstCode);
    } else {
      handleMismatch();
    }
  };

  const handleMatch = (code: string) => {
    match();
    setMatchingCards([code]);
    
    setTimeout(() => {
      setMatchedCards(prev => [...prev, code]);
      setMatchingCards([]);
      setFlippedCards([]);
      setPairsLeft(prev => prev - 1);
    }, 700);
  };

  const handleMismatch = () => {
    setTimeout(() => setFlippedCards([]), 500);
  };

  const handleGameWin = () => {
    win();
    setGameWon(true);
    onGameWon();
  };

  const handleCardClick = (index: number) => {
    if (!flippedCards.includes(index) && flippedCards.length < 2) {
      flip();
    }

    // Check if card can be clicked
    if (
      !gameStarted ||
      flippedCards.includes(index) ||
      matchedCards.includes(gameCards[index]?.[0]) ||
      matchingCards.includes(gameCards[index]?.[0]) ||
      flippedCards.length >= 2
    ) return;

    setFlippedCards(prev => [...prev, index]);
  };

  const restart = () => {
    if (gameStarted && Object.keys(data).length > 0) {
      initializeGame();
    }
  };

  const getCurrentAccuracy = () => {
    return calculateAccuracy(moves, cardsNumber, pairsLeft);
  };

  return {
    // State
    flippedCards,
    matchedCards,
    gameCards,
    matchingCards,
    moves,
    pairsLeft,
    gameWon,
    time,
    
    // Actions
    handleCardClick,
    restart,
    
    // Utilities
    formatTime,
    calculateAccuracy: getCurrentAccuracy
  };
}