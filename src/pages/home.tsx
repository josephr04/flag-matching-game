import IMAGES from "@/assets/images/images";
import { motion } from "framer-motion";
import { CardList } from "@/feature/LevelCard";
import { levelItems } from "@/utils/LevelData";
import { FlagCarousel } from "@/feature/FlagCarousel";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function Home() {
  const { hash } = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  return (
    <>
      <div className="relative flex flex-col justify-between bg-[url(/src/assets/images/bg-flags.jpg)] bg-cover flex min-h-[18em] md:min-h-[30em] min-w-[18em]">
        <div className="absolute inset-0 bg-[#223A4E] opacity-75"></div>
        <motion.div 
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring"}}
          className="flex flex-col items-center justify-center z-5 pt-6 md:pt-20"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring" }}
          >
            <img src={IMAGES.flagMatching} alt="Flag Matching Logo" className="z-5 h-33 md:h-55"/>
          </motion.div>
          <div className="z-5 text-center font-normal font-[Roboto] text-white text-sm md:text-lg md:w-lg w-55">
            {t('welcome')}
          </div>
        </motion.div>
        <div className="overlay w-full h-15 z-5"></div>
      </div>

      <div className="flex flex-col min-h-[28em] md:min-h-[40rem] bg-[#223A4E] font-[Roboto] md:pb-15 min-w-[18.75em]" id="levels">
        <div className="w-26 md:w-35 pt-5 md:pt-10 pb-5 md:pb-10">
          <div className="text-xl md:text-3xl font-bold text-white pl-8">
            {t('levels')}
          </div>
          <div className="bg-[#14A5BA] h-1 rounded-r-2xl"></div>
        </div>
        <div className="flex flex-wrap gap-12 justify-center">
          <CardList list={levelItems}/>
        </div>
      </div>

      <div className="relative flex flex-col min-w-[18.75em]">
        <div className="w-full h-8 bg-[#223A4E]"></div>
        <div className="w-full h-8 bg-white"></div>
        <img src={IMAGES.worldMap} alt="World Map" className="absolute h-30 md:h-80 rounded-xl left-0 right-0 mx-auto w-fit" />
      </div>

      <div className="flex justify-center min-h-[16em] md:min-h-[30em] pb-14 md:pb-18 bg-white min-w-[18.75em]">
        <div className="md:w-lg w-55 text-center font-normal text-sm md:text-lg mt-auto">
          {t('homeMessage')}
        </div>
      </div>

      <div>
        <FlagCarousel />
      </div>
    </>
  )
}

export default Home;