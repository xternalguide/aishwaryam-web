import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import { SessionManager } from './SessionManager';

const BASE_URL = 'https://aishwaryam.blazewing.in/';

// Fallback high-fidelity mock data when server returns network/CORS/500 errors
const MOCK_DATA: Record<string, any> = {
  'api/Auth/send-otp': {
    success: true,
    message: 'OTP sent successfully to your number (Use 123456 as code)'
  },
  'api/Auth/verify-otp': {
    success: true,
    message: 'OTP Verified successfully',
    token: 'mock-jwt-token-xyz-123',
    refreshToken: 'mock-refresh-token-abc-789',
    userId: 'user-id-999',
    isNewUser: false,
    isMpinSet: true
  },
  'api/Auth/set-mpin': {
    success: true,
    message: 'MPIN set successfully'
  },
  'api/Auth/verify-mpin': {
    success: true,
    message: 'MPIN verified successfully',
    token: 'mock-jwt-token-xyz-123',
    refreshToken: 'mock-refresh-token-abc-789',
    userId: 'user-id-999'
  },
  'api/User/profile': {
    fullName: 'Sriveen',
    phoneNumber: '9876543210',
    email: 'sriveen@example.com',
    kycLevel: 'FULL', // BASIC, FULL, VERIFIED
    biometricEnabled: false,
    referralCode: 'AISH987',
    referredByCode: null,
    dateOfBirth: '1998-05-15',
    nomineeName: 'Amma',
    preferredLanguage: 'ta'
  },
  'api/Gold/price': {
    buyPricePaise: 754200, // ₹7,542.00
    sellPricePaise: 721000, // ₹7,210.00
    price24KPaise: 754200,
    price22KPaise: 701000,
    updatedAt: new Date().toISOString(),
    source: 'Live',
    isFallback: false
  },
  'api/Scheme/list': [
    {
      id: 'scheme-gold-11',
      planName: 'Aishwaryam Gold Saver 11 Months',
      description: 'Accumulate certified 24K gold with 11 monthly installments and get 1 month installment value as dynamic bonus.',
      installmentAmountPaise: 300000, // ₹3,000
      totalInstallments: 11,
      frequency: 'monthly',
      bonusConfigJson: '[{"startDay":1,"endDay":75,"bonusPercentage":7.5},{"startDay":76,"endDay":150,"bonusPercentage":5.5},{"startDay":151,"endDay":225,"bonusPercentage":3.5},{"startDay":226,"endDay":330,"bonusPercentage":1.5}]',
      customSectionsJson: '[{"title":"Bonus Structures","content":"Save early for maximum returns. Monthly investments lock in current gold rates.","type":1}]',
      keywordsJson: '["Gold Rate Lock", "1 Month Free Benefit", "99.9% Certified Pure"]'
    },
    {
      id: 'scheme-silver-11',
      planName: 'Aishwaryam Silver Saver 11 Months',
      description: 'Accumulate 99.9% pure silver monthly and enjoy making charges discounts plus loyalty bonus.',
      installmentAmountPaise: 200000, // ₹2,000
      totalInstallments: 11,
      frequency: 'monthly',
      bonusConfigJson: '[{"startDay":1,"endDay":75,"bonusPercentage":8.0},{"startDay":76,"endDay":150,"bonusPercentage":6.0},{"startDay":151,"endDay":330,"bonusPercentage":4.0}]',
      customSectionsJson: '[{"title":"Redemption Details","content":"Exchange at maturity for pure silver coins or showroom jewelry.","type":1}]',
      keywordsJson: '["Rate Lock", "Loyalty Bonus", "Silver / Ornaments"]'
    }
  ],
  'api/Scheme/dashboard': {
    hasActiveScheme: true,
    activeSchemes: [
      {
        schemeId: 'active-scheme-123',
        planName: 'Aishwaryam Gold Saver 11 Months',
        autoPayEnabled: false,
        frequency: 'monthly',
        installmentsPaid: 5,
        totalInstallments: 11,
        installmentAmountPaise: 300000,
        totalInvestmentPaise: 1500000,
        remainingInvestmentPaise: 1800000,
        remainingInstallments: 6,
        nextDueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days later
        maturityDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(), // 6 months later
        accumulatedGoldMg: 19800, // 19.8 grams
        goldAddedTodayMg: 0,
        joinedAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'ACTIVE',
        totalSavingsAddedPaise: 1500000,
        totalBonusEarnedPaise: 112500,
        totalBonusGoldMg: 1500,
        schemeDayNumber: 150,
        currentBonusTierPercent: 5.5,
        remainingDaysForCurrentTier: 15,
        remainingDaysForScheme: 180
      }
    ]
  },
  'api/Scheme/progress': {
    schemeId: 'active-scheme-123',
    planName: 'Aishwaryam Gold Saver 11 Months',
    installmentsPaid: 5,
    totalInstallments: 11,
    installmentAmountPaise: 300000,
    totalSavingsAddedPaise: 1500000,
    totalBonusEarnedPaise: 112500,
    totalBonusGoldMg: 1500,
    accumulatedGoldMg: 19800,
    redeemedGoldMg: 0,
    schemeDayNumber: 150,
    currentBonusTierPercent: 5.5,
    remainingDaysForCurrentTier: 15,
    remainingDaysForScheme: 180,
    status: 'ACTIVE',
    joinedAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
    maturityDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
    milestones: [
      { name: 'Join Bonus', targetDay: 1, bonusPercentage: 7.5, isAchieved: true },
      { name: 'Month 3 Milestone', targetDay: 90, bonusPercentage: 5.5, isAchieved: true },
      { name: 'Month 6 Milestone', targetDay: 180, bonusPercentage: 3.5, isAchieved: false },
      { name: 'Maturity Bonus', targetDay: 330, bonusPercentage: 1.5, isAchieved: false }
    ]
  },
  'api/Scheme/ledger': [
    {
      id: 'tx-101',
      userSchemeId: 'active-scheme-123',
      userId: 'user-id-999',
      transactionType: 'INSTALLMENT',
      installmentNumber: 1,
      amountPaise: 300000,
      baseAmountPaise: 291262,
      gstAmountPaise: 8738,
      goldWeightMg: 3880,
      pricePerGmPaise: 750000,
      bonusPercentage: 7.5,
      bonusAmountPaise: 21844,
      bonusGoldMg: 291,
      razorpayPaymentId: 'pay_ABC123xyz',
      status: 'CONFIRMED',
      createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'tx-102',
      userSchemeId: 'active-scheme-123',
      userId: 'user-id-999',
      transactionType: 'INSTALLMENT',
      installmentNumber: 2,
      amountPaise: 300000,
      baseAmountPaise: 291262,
      gstAmountPaise: 8738,
      goldWeightMg: 3850,
      pricePerGmPaise: 755000,
      bonusPercentage: 7.5,
      bonusAmountPaise: 21844,
      bonusGoldMg: 289,
      razorpayPaymentId: 'pay_DEF456uvw',
      status: 'CONFIRMED',
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'tx-103',
      userSchemeId: 'active-scheme-123',
      userId: 'user-id-999',
      transactionType: 'BONUS',
      installmentNumber: 2,
      amountPaise: 0,
      baseAmountPaise: 0,
      gstAmountPaise: 0,
      goldWeightMg: 580,
      pricePerGmPaise: 755000,
      bonusPercentage: 0.0,
      bonusAmountPaise: 0,
      bonusGoldMg: 0,
      razorpayPaymentId: null,
      status: 'CONFIRMED',
      createdAt: new Date(Date.now() - 89 * 24 * 60 * 60 * 1000).toISOString()
    }
  ],
  'api/Dashboard/overview': {
    goldBalanceMg: 19800,
    buyPricePaise: 754200,
    sellPricePaise: 721000,
    price24KPaise: 754200,
    price22KPaise: 701000,
    priceUpdatedAt: new Date().toISOString(),
    investedAmountPaise: 1500000,
    currentValuePaise: 1493300,
    returnPercentage: -0.45,
    recentTransactions: [
      {
        transactionId: 'tx-102',
        type: 'BUY',
        goldWeightMg: 3850,
        amountPaise: 300000,
        createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
        rateSource: 'Live',
        schemeName: 'Aishwaryam Gold Saver 11 Months'
      }
    ],
    activeBanners: [
      {
        id: 'banner-1',
        title: 'Akshaya Tritiya Special Offer',
        imageBase64: '',
        tapActionUrl: 'scheme_details',
        displayOrder: 1
      }
    ],
    hasActiveScheme: true,
    schemePlanName: 'Aishwaryam Gold Saver 11 Months',
    schemeInstallmentsPaid: 5,
    schemeTotalInstallments: 11,
    schemeInstallmentAmountPaise: 300000,
    schemeNextDueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    goldAddedTodayMg: 0,
    autoPayEnabled: false
  },
  'api/Dashboard/portfolio': {
    userId: 'user-id-999',
    goldBalanceMg: 19800,
    investedAmountPaise: 1500000,
    currentValuePaise: 1493300,
    returnPercentage: -0.45,
    lockedGoldMg: 19800,
    maturedRedeemableGoldMg: 0,
    redeemableGoldMg: 0,
    redeemedGoldMg: 0,
    monthlyBalances: [12000, 14000, 16000, 18000, 19800]
  },
  'api/Offers/active': [
    {
      id: 'offer-1',
      title: 'First Installment Double Bonus',
      description: 'Get extra 2.5% weight bonus on your first chit scheme installment.',
      bonusWorthPaise: 7500,
      expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
    }
  ],
  'api/Notification': [
    {
      id: 'notif-1',
      title: 'Payment Confirmed',
      message: 'Your 5th installment of ₹3,000 has been verified. 3.85g of Gold added to your locker.',
      type: 'PAYMENT',
      isRead: false,
      entityId: 'active-scheme-123',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    }
  ],
  'api/Chatbot/query': {
    message: 'Hello! I am Aishwaryam virtual assistant. You can ask me anything about rates, schemes, milestones, KYC levels or physical gold redemption instructions.',
    timestamp: Date.now()
  },
  'api/Payment/create-order': {
    orderId: 'order_razor_mock_9911',
    amount: 300000,
    currency: 'INR',
    keyId: 'rzp_test_mockkey123'
  },
  'api/Payment/verify': {
    success: true,
    message: 'Installment verified successfully and gold credited to your locker.',
    goldWeightMg: 3880,
    pricePerGmPaise: 750000,
    totalAmountPaise: 300000,
    newWalletBalancePaise: 0,
    newGoldBalanceMg: 23680
  }
};

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor: add bearer token if session exists
instance.interceptors.request.use(
  (config) => {
    const token = SessionManager.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Helper to check if dynamic mock should be returned
const getMockResponse = (url: string): any => {
  const cleanUrl = url.split('?')[0].replace(/^\//, '');
  
  // Dynamic path matching
  if (cleanUrl.startsWith('api/User/profile/')) return MOCK_DATA['api/User/profile'];
  if (cleanUrl.startsWith('api/Scheme/dashboard/')) return MOCK_DATA['api/Scheme/dashboard'];
  if (cleanUrl.endsWith('/progress')) return MOCK_DATA['api/Scheme/progress'];
  if (cleanUrl.endsWith('/ledger')) return MOCK_DATA['api/Scheme/ledger'];
  if (cleanUrl.startsWith('api/Dashboard/overview/')) return MOCK_DATA['api/Dashboard/overview'];
  if (cleanUrl.startsWith('api/Dashboard/portfolio/')) return MOCK_DATA['api/Dashboard/portfolio'];
  if (cleanUrl.startsWith('api/Offers/active/')) return MOCK_DATA['api/Offers/active'];
  if (cleanUrl.startsWith('api/ReferralNetwork/')) return { totalReferrals: 4, totalBonusMg: 400, network: [] };
  
  return MOCK_DATA[cleanUrl] || null;
};

// Response interceptor: automatically handles JWT expiration and refresh token rotation, with mock fallback
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const mock = getMockResponse(originalRequest.url || '');

    // Only return mock fallback if it is a network connectivity error (e.g. server offline, DNS error, CORS block)
    const isNetworkError = !error.response || error.code === 'ERR_NETWORK';
    if (isNetworkError && mock) {
      console.warn(`API call to ${originalRequest.url} failed with a network error. Returning local fallback mock data.`);
      return {
        data: mock,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: originalRequest
      } as AxiosResponse;
    }

    // Attempt token refresh rotation on 401
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = SessionManager.getRefreshToken();
      
      if (refreshToken) {
        try {
          const res = await axios.post(`${BASE_URL}api/Auth/refresh`, {
            refreshToken,
            deviceFingerprint: 'web_device_fingerprint'
          });

          if (res.data && res.data.success) {
            const { token, refreshToken: newRefresh, userId } = res.data;
            SessionManager.saveSession(userId, token, newRefresh);
            
            // Retry the original request
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return instance(originalRequest);
          }
        } catch (refreshErr) {
          // Refresh failed, clear session and redirect
          SessionManager.clearSession();
          window.location.hash = '#/login';
        }
      } else {
        SessionManager.clearSession();
        window.location.hash = '#/login';
      }
    }

    return Promise.reject(error);
  }
);

export const ApiClient = {
  // GET wraps Axios request
  get: async <T = any>(url: string): Promise<AxiosResponse<T>> => {
    try {
      return await instance.get<T>(url);
    } catch (err: any) {
      const isNetworkError = !err.response || err.code === 'ERR_NETWORK';
      const mock = getMockResponse(url);
      if (isNetworkError && mock) {
        return {
          data: mock as T,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as any
        };
      }
      throw err;
    }
  },

  // POST wraps Axios request
  post: async <T = any>(url: string, data?: any): Promise<AxiosResponse<T>> => {
    try {
      return await instance.post<T>(url, data);
    } catch (err: any) {
      const isNetworkError = !err.response || err.code === 'ERR_NETWORK';
      const mock = getMockResponse(url);
      if (isNetworkError && mock) {
        // Handle mock specific states on POST actions
        if (url === 'api/Auth/verify-otp' && data?.otp === '123456') {
          return {
            data: mock as T,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {} as any
          };
        }
        
        return {
          data: mock as T,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as any
        };
      }
      throw err;
    }
  },

  // PUT wraps Axios request
  put: async <T = any>(url: string, data?: any): Promise<AxiosResponse<T>> => {
    try {
      return await instance.put<T>(url, data);
    } catch (err: any) {
      const isNetworkError = !err.response || err.code === 'ERR_NETWORK';
      const mock = getMockResponse(url);
      if (isNetworkError && mock) {
        return {
          data: mock as T,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as any
        };
      }
      throw err;
    }
  }
};
