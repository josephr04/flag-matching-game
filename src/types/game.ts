export interface BaseGameProps {
  cardsNumber: number;
  gameStarted: boolean;
  onTimeUpdate: (time: number) => void;
  onGameWon: () => void;
}

export interface UseGameLogicProps extends BaseGameProps {
  data: Record<string, string>;
}

export interface GameCardListProps extends BaseGameProps {
  onRestart: () => void;
}