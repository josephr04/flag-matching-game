import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/home';
import Level from '@/pages/Level';
import { CountryProvider } from './context/CountryProvider';
import './App.css';
import { LoadingScreen } from "@/components/Loadings/LoadingScreen";
import { useState, useEffect } from "react";

function App() {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const hasLoaded = localStorage.getItem('hasLoaded');

    if (!hasLoaded) {
      setShowLoading(true);
      const timer = setTimeout(() => {
        setShowLoading(false);
        localStorage.setItem('hasLoaded', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (showLoading) {
    return (
      <LoadingScreen
        onFinish={() => {
          setShowLoading(false);
          localStorage.setItem("hasLoaded", "true");
        }}
      />
    );
  }

  return (
    <CountryProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='levels/:id' element={<Level />} />
            <Route path='*' />
          </Route>
        </Routes>
      </BrowserRouter>
    </CountryProvider>
  );
}

export default App;
