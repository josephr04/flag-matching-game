import { useRef, useEffect } from "react";
import flipSound from '@/assets/sounds/card-flip.mp3';
import matchSound from '@/assets/sounds/match.mp3';
import winSound from '@/assets/sounds/win.mp3';

function useSound(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(src);
  }, [src]);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return play;
}

export function useGameSounds() {
  const flip = useSound(flipSound);
  const match = useSound(matchSound);
  const win = useSound(winSound);

  return { flip, match, win };
}
