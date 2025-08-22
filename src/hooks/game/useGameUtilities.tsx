import { useCallback } from "react";

export function useGameUtilities() {
  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const calculateAccuracy = useCallback((moves: number, cardsNumber: number, pairsLeft: number): number => {
    if (moves === 0) return 0;
    const correctPairs = (cardsNumber / 2) - pairsLeft;
    const correctMoves = correctPairs * 2;
    return Math.round((correctMoves / moves) * 100);
  }, []);

  return {
    formatTime,
    calculateAccuracy
  };
}