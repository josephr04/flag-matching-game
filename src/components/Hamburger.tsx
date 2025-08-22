import { useState } from "react";
import Hamburger from "hamburger-react";
import { navItems } from "@/utils/NavData";
import { AnimatePresence, motion } from "framer-motion";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import IMAGES from '@/assets/images/images';

type Label = {
  label: string;
  url: string;
};

function HamburgerComponent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="z-20 hover:text-[#85ba14] duration-150 ease-out">
        <Hamburger 
          color="#14A5BA" 
          size={26}
          toggled={open}
          toggle={setOpen}
        />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0}}
            transition={{ duration: 0.5, type: "spring" }}
            className="absolute bg-[#192A38] top-2 right-2 w-50 min-h-50 rounded-md p-8 z-10 flex flex-col justify-between origin-top-right"
          >
            <ListComponent list={navItems} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ListComponent({list}: {list: Label[]}) {
  const repoLink = "https://github.com/josephr04/flag-matching-game"; 
  const { t } = useTranslation();

  return (
    <ul className="flex flex-col gap-2">
      {list.map(({label, url}) => (
        <li key={label} className="text-xl text-white"><a href={url} className="hover:text-[#14A5BA] duration-150 ease-out" rel="noopener noreferrer">{t(label)}</a></li>
      ))}
      <LanguageSelector />
      <div className="flex justify-center mt-2">
        <a href={repoLink} target="_blank"  rel="noopener noreferrer" className="w-6">
          <img src={IMAGES.github} alt="Github Logo" className="w-6 h-6"/>
        </a>
      </div>
    </ul>
  );
};

export default HamburgerComponent;