import axios from 'axios';
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { CountryData } from '@/types/country';

export const CountryContext = createContext<{
  data: CountryData;
  loading: boolean;
  error: boolean;
} | undefined>(undefined);

export function CountryProvider( {children }: { children: ReactNode}) {
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

  return (
    <CountryContext.Provider value={{ data, loading, error }}>
      { children }
    </CountryContext.Provider>
  )
}

export const useCountryContext = () => {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error("useCountryContext must be used within a CountryProvider");
  }
  return context;
};