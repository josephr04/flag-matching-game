import axios from 'axios';
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { CountryData } from '@/types/country';

export const CountryContext = createContext<{
  data: CountryData;
  loading: boolean;
  error: boolean;
} | undefined>(undefined);

export const useCountryContext = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error("useCountryContext must be used inside of a CountryProvider");
  }
  return context;
};

function CountryProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<CountryData>({} as CountryData);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlags = async () => {
      const storedData = localStorage.getItem('countryData');
      const startTime = Date.now();

      if (storedData) {
        setData(JSON.parse(storedData));
      } else {
        try {
          const response = await axios.get<CountryData>('https://flagcdn.com/en/codes.json');
          const filteredData: CountryData = Object.fromEntries(
            Object.entries(response.data).filter(([code]) => !code.includes("-"))
          );

          setData(filteredData);
          localStorage.setItem('countryData', JSON.stringify(filteredData));
        } catch (err) {
          setError(true);
        }
      }

      const elapsed = Date.now() - startTime;
      const remaining = 700 - elapsed;
      setTimeout(() => setLoading(false), remaining > 0 ? remaining : 0);
    }

    fetchFlags();
  }, []);

  return (
    <CountryContext.Provider value={{ data, loading, error }}>
      {children}
    </CountryContext.Provider>
  )
}

export default CountryProvider;