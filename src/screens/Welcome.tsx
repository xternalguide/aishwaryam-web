import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionManager } from '../utils/SessionManager';
import { Star, Shield, Award } from 'lucide-react';

interface Slide {
  icon: React.ReactNode;
  iconBg: string;
  badge: string;
  title: string;
  subtitle: string;
  body: string;
  stat: string;
  statLabel: string;
  accent: string;
}

const slides: Slide[] = [
  {
    icon: <Star size={48} color="white" fill="white" />,
    iconBg: 'linear-gradient(135deg, #FFD700 0%, #B8860B 100%)',
    badge: 'TRUSTED GOLD PLATFORM',
    title: 'Save for your Future',
    subtitle: 'Start with small steps',
    body: 'Accumulate certified 24K gold regularly to protect your family\'s financial future.',
    stat: '₹100',
    statLabel: 'Min Starting Savings',
    accent: 'var(--gold-warm)'
  },
  {
    icon: <Shield size={48} color="white" fill="white" />,
    iconBg: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
    badge: '100% SECURED VAULT',
    title: 'Safe and Certified',
    subtitle: 'Pure gold guaranteed',
    body: 'Your gold is saved in secure vault lockers with fully certified authenticity.',
    stat: '99.9%',
    statLabel: 'Purity Guarantee',
    accent: 'var(--success-green)'
  },
  {
    icon: <Award size={48} color="white" fill="white" />,
    iconBg: 'linear-gradient(135deg, #C2185B 0%, #4A0E4E 100%)',
    badge: 'EXTRA BONUS BENEFITS',
    title: 'Loyalty Bonus Rewards',
    subtitle: 'Up to 7.5% Bonus',
    body: 'Get additional weight credited directly to your account based on your saving milestone tiers.',
    stat: '7.5%',
    statLabel: 'Max Loyalty Bonus',
    accent: 'var(--brand-accent)'
  }
];

export const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const isLast = current === slides.length - 1;

  const handleNext = () => {
    if (isLast) {
      SessionManager.markWelcomeOnboardingSeen();
      navigate('/login');
    } else {
      setCurrent((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    SessionManager.markWelcomeOnboardingSeen();
    navigate('/login');
  };

  const slide = slides[current];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: 'var(--gradient-brand)',
      padding: '24px',
      justifyContent: 'space-between',
      position: 'relative',
      color: 'white',
      overflow: 'hidden'
    }}>
      {/* Skip Button */}
      {!isLast && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '16px' }}>
          <button
            onClick={handleSkip}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.8)',
              fontFamily: 'var(--font-poppins)',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Skip
          </button>
        </div>
      )}

      {/* Slide Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        flex: 1,
        justifyContent: 'center',
        paddingTop: isLast ? '40px' : '0'
      }}>
        {/* Animated Icon Container */}
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: slide.iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 10px 30px rgba(0, 0, 0, 0.3)`,
          marginBottom: '28px',
          animation: 'pulse 3s infinite alternate'
        }}>
          {slide.icon}
        </div>

        {/* Badge */}
        <div style={{
          background: `${slide.accent}2E`,
          border: `1px solid ${slide.accent}4D`,
          padding: '6px 14px',
          borderRadius: '20px',
          marginBottom: '16px'
        }}>
          <span style={{
            color: slide.accent,
            fontSize: '10px',
            fontWeight: 'bold',
            letterSpacing: '1.5px',
            textTransform: 'uppercase'
          }}>
            {slide.badge}
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: '28px',
          lineHeight: '36px',
          color: 'white',
          marginBottom: '8px'
        }}>
          {slide.title}
        </h1>

        {/* Subtitle */}
        <h3 style={{
          fontSize: '14px',
          color: slide.accent,
          fontWeight: 600,
          marginBottom: '16px'
        }}>
          {slide.subtitle}
        </h3>

        {/* Body Text */}
        <p style={{
          fontSize: '13px',
          lineHeight: '20px',
          color: 'rgba(255, 255, 255, 0.75)',
          maxWidth: '300px',
          marginBottom: '28px'
        }}>
          {slide.body}
        </p>

        {/* Stats highlight chip */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.08)',
          border: `1px solid ${slide.accent}4D`,
          borderRadius: '20px',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{
            fontSize: '24px',
            fontWeight: '900',
            color: slide.accent
          }}>
            {slide.stat}
          </span>
          <span style={{
            fontSize: '13px',
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'left'
          }}>
            {slide.statLabel}
          </span>
        </div>
      </div>

      {/* Bottom Pager Indicators & CTA Button */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        paddingBottom: '32px'
      }}>
        {/* Indicators */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {slides.map((_, i) => {
            const isActive = i === current;
            return (
              <div
                key={i}
                style={{
                  width: isActive ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: isActive ? slide.accent : 'rgba(255, 255, 255, 0.4)',
                  transition: 'all 0.3s ease'
                }}
              />
            );
          })}
        </div>

        {/* Action Button */}
        <button
          onClick={handleNext}
          style={{
            width: '100%',
            height: '56px',
            borderRadius: '16px',
            background: isLast ? 'var(--gold-warm)' : 'var(--brand-accent)',
            color: isLast ? '#1A1200' : 'white',
            border: 'none',
            fontFamily: 'var(--font-poppins)',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.25)',
            transition: 'background-color 0.3s ease'
          }}
        >
          {isLast ? 'Start Saving Gold ✨' : 'Next'}
        </button>

        {/* Already have an account nudging */}
        <button
          onClick={handleSkip}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontFamily: 'var(--font-poppins)',
            fontWeight: 'bold',
            fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};
