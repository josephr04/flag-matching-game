import { navItems } from "@/utils/NavData";

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
  return (
    <ul className="flex">
      {list.map(({label, url}) => (
        <li key={label} className="text-md text-white"><a href={url} className="px-3 py-3 hover:text-[#14A5BA] duration-150 ease-out font-normal" rel="noopener noreferrer">{label}</a></li>
      ))}
      <select className="pl-3" name="Language" id="language">
        <option value="">English</option>
        <option value="">Spanish</option>
      </select>
    </ul>
  );
};
