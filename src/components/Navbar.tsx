import { navItems } from "@/utils/NavData";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from "react-i18next";

type Label = {
  label: string;
  url: string;
};

export function Navbar() {
  return (
    <div >
      <ListComponent list={navItems}/>
    </div>
  )
};

function ListComponent({list}: {list: Label[]}) {
  const { t } = useTranslation();

  return (
    <ul className="flex items-center gap-2">
      {list.map(({label, url}) => (
        <li key={label} className="text-md text-white"><a href={url} className="px-3 py-3 items-center justify-center hover:text-[#14A5BA] duration-150 ease-out font-normal" rel="noopener noreferrer">{t(label)}</a></li>
      ))}
      <LanguageSelector />
    </ul>
  );
};
