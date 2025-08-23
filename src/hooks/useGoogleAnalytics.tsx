import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
};

export const useGoogleAnalytics = () => {
  useEffect(() => {
    const trackingId = import.meta.env.VITE_GA_TRACKING_ID;
    const isDevelopment = import.meta.env.DEV;
    
    if (!trackingId || isDevelopment) {
      console.log('Google Analytics not loaded:', { trackingId, isDevelopment });
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script);

    // Config gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', trackingId);

    // Cleanup function
    return () => {
      const existingScript = document.querySelector(`script[src*="${trackingId}"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);
};