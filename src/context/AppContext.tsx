import React, { createContext, useContext, useState, useEffect } from 'react';
import { ApiClient } from '../utils/ApiClient';
import { SessionManager } from '../utils/SessionManager';

interface AppContextType {
  profile: any;
  livePrice: any;
  activeSchemes: any[];
  portfolio: any;
  availableSchemes: any[];
  transactions: any[];
  notifications: any[];
  unreadNotifCount: number;
  offers: any[];
  bankAccounts: any[];
  isLoading: boolean;
  refreshData: () => Promise<void>;
  clearData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<any>(null);
  const [livePrice, setLivePrice] = useState<any>({ buyPricePaise: 754200, sellPricePaise: 721000, price24KPaise: 754200, price22KPaise: 701000 });
  const [activeSchemes, setActiveSchemes] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any>({ goldBalanceMg: 19800, investedAmountPaise: 1500000, currentValuePaise: 1493300, returnPercentage: -0.45, lockedGoldMg: 19800, redeemableGoldMg: 19800 });
  const [availableSchemes, setAvailableSchemes] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadNotifCount, setUnreadNotifCount] = useState(0);
  const [offers, setOffers] = useState<any[]>([]);
  const [bankAccounts, setBankAccounts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refreshData = async () => {
    const userId = SessionManager.getUserId();
    if (!userId) return;
    setIsLoading(true);

    try {
      const [
        profileRes,
        priceRes,
        dashRes,
        portfolioRes,
        listRes,
        ledgerRes,
        offersRes,
        bankRes,
        notifRes
      ] = await Promise.allSettled([
        ApiClient.get(`api/User/profile/${userId}`),
        ApiClient.get('api/Gold/price'),
        ApiClient.get(`api/Scheme/dashboard/${userId}`),
        ApiClient.get(`api/Dashboard/portfolio/${userId}`),
        ApiClient.get('api/Scheme/list'),
        ApiClient.get(`api/Scheme/ledger/${userId}`),
        ApiClient.get(`api/Offers/active/${userId}`),
        ApiClient.get(`api/Banking/accounts/${userId}`),
        ApiClient.get('api/Notification')
      ]);

      if (profileRes.status === 'rejected') {
        const reason = profileRes.reason;
        if (reason && reason.response && (reason.response.status === 404 || reason.response.status === 401)) {
          console.warn('User profile not found or unauthorized on server. Logging out...');
          SessionManager.clearSession();
          window.location.href = '/login';
          return;
        }
      }
      if (profileRes.status === 'fulfilled' && profileRes.value.data) {
        setProfile(profileRes.value.data);
      }
      if (priceRes.status === 'fulfilled' && priceRes.value.data) {
        setLivePrice(priceRes.value.data);
      }
      if (dashRes.status === 'fulfilled' && dashRes.value.data) {
        setActiveSchemes(dashRes.value.data.activeSchemes || []);
      }
      if (portfolioRes.status === 'fulfilled' && portfolioRes.value.data) {
        setPortfolio(portfolioRes.value.data);
      }
      if (listRes.status === 'fulfilled' && listRes.value.data) {
        setAvailableSchemes(listRes.value.data);
      }
      if (ledgerRes.status === 'fulfilled' && ledgerRes.value.data) {
        setTransactions(ledgerRes.value.data);
      }
      if (offersRes.status === 'fulfilled' && offersRes.value.data) {
        setOffers(offersRes.value.data);
      }
      if (bankRes.status === 'fulfilled' && bankRes.value.data && Array.isArray(bankRes.value.data)) {
        setBankAccounts(bankRes.value.data.length > 0 ? bankRes.value.data : [
          { bankName: 'State Bank of India', accountNumberMasked: '•••• •••• 1234', ifscCode: 'SBIN0000843' }
        ]);
      } else {
        setBankAccounts([
          { bankName: 'State Bank of India', accountNumberMasked: '•••• •••• 1234', ifscCode: 'SBIN0000843' }
        ]);
      }
      if (notifRes.status === 'fulfilled' && notifRes.value.data) {
        setNotifications(notifRes.value.data);
        setUnreadNotifCount(notifRes.value.data.filter((n: any) => !n.isRead).length);
      }
    } catch (err) {
      console.error('Error refreshing app context data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearData = () => {
    setProfile(null);
    setActiveSchemes([]);
    setTransactions([]);
    setNotifications([]);
    setUnreadNotifCount(0);
    setOffers([]);
    setBankAccounts([]);
  };

  useEffect(() => {
    const userId = SessionManager.getUserId();
    if (userId) {
      refreshData();
    } else {
      clearData();
    }
  }, []);

  return (
    <AppContext.Provider value={{
      profile,
      livePrice,
      activeSchemes,
      portfolio,
      availableSchemes,
      transactions,
      notifications,
      unreadNotifCount,
      offers,
      bankAccounts,
      isLoading,
      refreshData,
      clearData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
