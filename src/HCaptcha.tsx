import React, { useState, useEffect, useRef, useCallback } from 'react';

interface HCaptchaProps {
  siteKey: string;
  onVerify: (token: string) => void;
  language?: string;
  children: React.ReactNode;
}

declare global {
  interface Window {
    hcaptcha?: {
      render: (
        element: string,
        params: {
          sitekey: string;
          callback: (token: string) => void;
          hl?: string;
        }
      ) => number;
      reset: (widgetId: number) => void;
    };
  }
}

const HCaptcha: React.FC<HCaptchaProps> = ({ siteKey, onVerify, language, children }) => {
  const [widgetId, setWidgetId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null); 
  const handleVerify = useCallback((token: string) => {
    onVerify(token);
  }, [onVerify]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://hcaptcha.com/1/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window && window.hcaptcha && containerRef.current) { 
        const params: {
          sitekey: string;
          callback: (token: string) => void;
          hl?: string;
        } = {
          sitekey: siteKey,
          callback: handleVerify,
        };

        if (language) {
          params.hl = language;
        }

        const captchaId = window.hcaptcha.render(containerRef.current.id, params); 
        setWidgetId(captchaId);
      } else {
        console.error('hCaptcha library not loaded or container is null.');
      }
    };

    return () => {
      if (widgetId !== null && window && window.hcaptcha) {
        window.hcaptcha.reset(widgetId);
      }
    };
  }, [siteKey, language, widgetId, handleVerify]);


  return (
    <div ref={containerRef} id="hcaptcha-container">
      {children}
    </div>
  );
};

export default HCaptcha;
