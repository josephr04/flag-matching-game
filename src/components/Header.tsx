import IMAGES from '@/assets/images/images';
import HamburgerComponent from './Hamburger';

export function Header() {
  return (
    <div className='flex mx-auto items-center justify-between h-18 w-full bg-[#223A4E] py-4 px-4 min-w-[18em]'>
      <div className='flex items-center pl-2'>
        <img src={IMAGES.flag} alt='flag' className='h-[2em]'/>
        <img src={IMAGES.title} alt='title' className='h-[2em] pt-[0.5em]'/>
      </div>
      <HamburgerComponent />
    </div>
  )
}