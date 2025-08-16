import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useCountryContext } from "@/context/CountryProvider";
import type { CountryData } from '@/types/country';

export function FlagCarousel() {
  const data = useCountryContext().data;
  const loading = useCountryContext().loading;
  const error = useCountryContext().error;

  if (loading) return <div className='h-[2.5em] flex justify-center items-center'>Loading Flags...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView="auto"
      spaceBetween={0}
      loop={true}
      autoplay={{ delay: 0, disableOnInteraction: false }}
      allowTouchMove={false}
      speed={2000}
      freeMode={true}
    >
      {Object.entries(data).map(([code, name]) => (
        <SwiperSlide key={code} style={{ width: "150px" }}>
          <Flag code={code} name={name} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function Flag({ code, name }: CountryData) {
  return (
    <img src={`https://flagcdn.com/h240/${code}.png`} loading='lazy' decoding="async" alt={name} className='w-[3.75em] h-[2.5em]' />
  );
}
