import IMAGES from "@/assets/images/images";
import { motion } from "framer-motion";
import { CardList } from "@/feature/LevelCard";
import { levelItems } from "@/utils/LevelData";
import { FlagCarousel } from "@/feature/FlagCarousel";

function Home() {

  return (
    <>
      <div className="relative flex flex-col justify-between bg-[url(/src/assets/images/bg-flags.jpeg)] bg-cover flex min-h-[18em] min-w-[18em]">
        <div className="absolute inset-0 bg-[#223A4E] opacity-75"></div>
        <motion.div 
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring"}}
          className="flex flex-col items-center justify-center z-5 pt-6"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring" }}
          >
            <img src={IMAGES.flagMatching} alt="Flag Matching Logo" className="z-5 h-33"/>
          </motion.div>
          <div className="z-5 text-center font-normal font-[Roboto] text-white text-sm sm:w-80 w-55">
            Test your geography and memory skills by matching each country to its correct flag.
          </div>
        </motion.div>
        <div className="overlay w-full h-15 z-5"></div>
      </div>

      <div className="flex flex-col min-h-[28em] bg-[#223A4E] font-[Roboto]">
        <div className="w-23 pt-5 pb-5">
          <div className=" text-xl font-bold text-white pl-8">
            Levels
          </div>
          <div className="bg-[#14A5BA] h-1 rounded-r-2xl"></div>
        </div>
        <div className="flex flex-wrap gap-12 justify-center">
          <CardList list={levelItems}/>
        </div>
      </div>

      <div className="relative flex flex-col">
        <div className="w-full h-8 bg-[#223A4E]"></div>
        <div className="w-full h-8 bg-white"></div>
        <img src={IMAGES.worldMap} alt="World Map" className="absolute h-30 rounded-xl left-0 right-0 mx-auto w-fit" />
      </div>

      <div className="flex justify-center min-h-[16em] pb-14">
        <div className="sm:w-80 w-55 text-center font-normal text-sm mt-auto">
          There are so many countries out there, each with its own unique flag, culture, and history. This page lets you explore the world in a fun and engaging way.
        </div>
      </div>

      <div>
        <FlagCarousel />
      </div>
    </>
  )
}

export default Home;