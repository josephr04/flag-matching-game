import IMAGES from '@/assets/images/images';
import HamburgerComponent from './Hamburger';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Navbar } from '@/components/NavBar';

export function Header() {
  const isMobile = useIsMobile();

  return (
    <div className='flex mx-auto items-center justify-between h-18 w-full bg-[#223A4E] py-4 px-4 min-w-[18em]'>
      <div className=''>
        <a href="/" className='flex items-center pl-2 md:pl-5 hover:scale-105 transition-transform duration-200'>
          <img src={IMAGES.flag} alt='flag' className='h-[2em] md:h-[2.3em]'/>
          <img src={IMAGES.title} alt='title' className='h-[2em] md:h-[2.5em] pt-[0.5em]'/>
        </a>
      </div>
      {isMobile ? (
        <HamburgerComponent />
      ) : (
        <Navbar />
      )}
    </div>
  )
}