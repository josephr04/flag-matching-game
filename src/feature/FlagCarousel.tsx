import axios from 'axios';
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

type CountryData = {
  [code: string]: string;
}

export function FlagCarousel() {
  const [data, setData] = useState<CountryData>({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchFlags = async () => {
      try {
        const response = await axios.get<CountryData>(`https://flagcdn.com/en/codes.json`);
        setData(response.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchFlags()
  }, [])

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
    <img src={`https://flagcdn.com/h40/${code}.png`} srcSet={`https://flagcdn.com/w80/${code}.png 2x`} loading='lazy' decoding="async" alt={name} className='w-[3.75em] h-[2.5em]' />
  );
}
