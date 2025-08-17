import './LoadingScreenStyle.css';
import { useEffect, useState } from "react";

type LoadingScreenProps = {
  onFinish?: () => void;
};

export function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setFadeOut(true);
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`
        fixed inset-0 z-[9999] flex items-center justify-center
        bg-[#223A4E]
      `}
    >
      <div
        className={`transition-opacity duration-700 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
        onTransitionEnd={() => {
          if (fadeOut) onFinish?.();
        }}
      >
      <div className="earth">
        <div className="sand snd-1">
          <div className="cam cam-1"></div>
          <div className="cam cam-2"></div>
          <div className="cam cam-3"></div>
          <div className="cam cam-4"></div>
          <div className="cam cam-5"></div>
          <div className="cam cam-6"></div>
        </div>
        <div className="sand snd-2">
          <div className="cam cam-11"></div>
          <div className="cam cam-12"></div>
          <div className="cam cam-13"></div>
        </div>
        <div className="cloud cld-1">
          <div className="cam cam-1"></div>
          <div className="cam cam-2"></div>
          <div className="cam cam-3"></div>
          <div className="cam cam-4"></div>
          <div className="cam cam-5"></div>
          <div className="cam cam-6"></div>
          <div className="cam cam-7"></div>
          <div className="cam cam-8"></div>
          <div className="cam cam-9"></div>
          <div className="cam cam-10"></div>
        </div>
        <div className="cloud cld-2">
          <div className="cam cam-11"></div>
          <div className="cam cam-12"></div>
          <div className="cam cam-13"></div>
        </div>
      </div>
      <div className="rocket"></div>
      <h1 className="earthday"><span>L</span><span>O</span><span>A</span><span>D</span><span>I</span><span>N</span><span>G</span><span>.</span><span>.</span><span>.</span></h1>
    </div>
    </div>
  );
};