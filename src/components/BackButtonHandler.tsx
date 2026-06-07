import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { App } from '@capacitor/app';

export const BackButtonHandler: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathRef = useRef(location.pathname);

  useEffect(() => {
    pathRef.current = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    const handleBackButton = async () => {
      const currentPath = pathRef.current;
      const rootRoutes = ['/', '/welcome', '/dashboard'];

      if (currentPath === '/dashboard') {
        const activeTab = localStorage.getItem('DASHBOARD_ACTIVE_TAB');
        if (activeTab && activeTab !== '0') {
          localStorage.setItem('DASHBOARD_ACTIVE_TAB', '0');
          window.dispatchEvent(new Event('dashboardTabChange'));
          return;
        }
      }

      if (rootRoutes.includes(currentPath)) {
        await App.exitApp();
      } else {
        navigate(-1);
      }
    };

    let listener: any = null;
    const setupListener = async () => {
      listener = await App.addListener('backButton', handleBackButton);
    };

    setupListener();

    return () => {
      if (listener) {
        listener.remove();
      }
    };
  }, [navigate]);

  return null;
};
