import { useState } from "react";
import Hamburger from "hamburger-react";
import { navItems } from "@/utils/NavData";
import { AnimatePresence, motion } from "framer-motion";
import IMAGES from '@/assets/images/images';

type Label = {
  label: string;
  url: string;
};

const repoLink = "https://github.com/josephr04/flag-matching-game"; 

function HamburgerComponent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="z-20">
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
            <div className="flex">
              <a href={repoLink} target="_blank"  rel="noopener noreferrer" className="w-6">
                <img src={IMAGES.github} alt="Github Logo" className="w-6 h-6"/>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ListComponent({list}: {list: Label[]}) {
  return (
    <ul>
      {list.map(({label, url}) => (
        <li className="text-xl text-white"><a href={url} rel="noopener noreferrer">{label}</a></li>
      ))}
    </ul>
  );
};

export default HamburgerComponent;