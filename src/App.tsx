import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import { LoadingScreen } from '@/components/Loading/LoadingScreen';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';
import Layout from '@/pages/Layout';
import Home from '@/pages/home';
import Level from '@/pages/Level';
import NotFound from '@/pages/NotFound';
import CountryProvider from '@/context/CountryProvider';
import './App.css';
import 'react-tooltip/dist/react-tooltip.css';

function App() {
  useGoogleAnalytics();
  const hasLoaded = localStorage.getItem('hasLoaded');
  const [showLoading, setShowLoading] = useState(!hasLoaded);

  useEffect(() => {
    if (!hasLoaded) {
      const timer = setTimeout(() => {
        setShowLoading(false);
        localStorage.setItem('hasLoaded', 'true');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [hasLoaded]);

  const handleLoadingFinish = () => {
    setShowLoading(false);
    localStorage.setItem('hasLoaded', 'true');
  };

  if (showLoading) {
    return <LoadingScreen onFinish={handleLoadingFinish} />;
  }

  return (
    <CountryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="levels/:id" element={<Level />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      
      <Tooltip id="tooltip" />
      <Analytics />
      <SpeedInsights />
    </CountryProvider>
  );
}

export default App;