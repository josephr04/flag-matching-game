import { useState, useEffect, useRef, useCallback } from "react";

export function useTimer(active: boolean, onTick?: (time: number) => void) {
  const [time, setTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (active) {
      timerRef.current = setInterval(() => {
        setTime(prev => {
          const newTime = prev + 1;
          onTick?.(newTime);
          return newTime;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [active, onTick]);

  const reset = useCallback(() => setTime(0), []);

  return { time, reset };
}
