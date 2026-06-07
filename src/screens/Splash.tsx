import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionManager, OnboardingStage } from '../utils/SessionManager';

export const Splash: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenWelcome = SessionManager.hasSeenWelcomeOnboarding();
      const hasToken = SessionManager.getToken() != null;
      const stage = SessionManager.getOnboardingStage();

      if (!hasSeenWelcome) {
        navigate('/welcome');
      } else if (stage === OnboardingStage.FULLY_VERIFIED) {
        navigate('/mpin/verify');
      } else if (!hasToken) {
        navigate('/login');
      } else if (stage === OnboardingStage.OTP_VERIFIED) {
        navigate('/mpin/setup');
      } else if (stage === OnboardingStage.MPIN_CREATED) {
        navigate('/profile-setup');
      } else {
        navigate('/mpin/verify');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'var(--gradient-brand)',
      color: 'white',
      textAlign: 'center'
    }}>
      <img
        src="/logo.png"
        alt="Aishwaryam Logo"
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '28px',
          marginBottom: '24px',
          boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
          objectFit: 'cover'
        }}
      />
      <h1 style={{ color: 'var(--gold-primary)', fontFamily: 'var(--font-playfair)', fontSize: '36px', marginBottom: '8px' }}>
        AISHWARYAM
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', letterSpacing: '2px' }}>
        DIGITAL GOLD
      </p>
    </div>
  );
};
