import { useState, useEffect } from 'react';
import { SessionManager } from './SessionManager';

export const translations = {
  en: {
    app_name: "Aishwaryam @ Your Home",
    dashboard_title: "Dashboard",
    gold_balance: "GOLD BALANCE",
    invested_value: "Invested Value",
    current_value: "Current Value",
    live_22k_price: "LIVE 22K PRICE (BUY)",
    buy_gold: "Add Savings",
    sell_gold: "Redeem",
    auto_saving: "Smart Savings Plan",
    refer_earn: "Referral Rewards",
    faqs: "FAQ's",
    history: "History",
    profile: "Profile",
    language: "Language",
    proceed_to_buy: "Proceed to Save",
    proceed_to_sell: "Proceed to Redeem",
    available_balance: "AVAILABLE BALANCE",
    live_sell_price: "LIVE REDEMPTION PRICE",
    account_settings: "Account Settings",
    personal_info: "Personal Information",
    bank_accounts: "Bank Accounts",
    security_mpin: "Security & MPIN",
    help_support: "Help & Support",
    logout: "Logout",
    escalate_support: "Talk to a Human",
    type_message: "Type a message...",
    ai_greeting: "Vanakkam! 🙏 I am your Aishwaryam jewellery savings assistant. How can I help you today?",
    ai_assistant_title: "Aishwaryam @ Your Home Assistant",
    ai_assistant_subtitle: "Always here to help",
    qr_scheme_title: "About Schemes",
    qr_scheme_response: "We offer flexible gold savings plans starting from ₹100. Save over time, earn up to 7.5% bonus gold, and redeem as jewellery or coins upon maturity.",
    qr_bonus_title: "Bonus Calculation",
    qr_bonus_response: "Your bonus is calculated based on how early you save. For a 330-day scheme, you get 7.5% bonus for the first 75 days, gradually reducing to 1.5% towards maturity.",
    qr_safety_title: "Gold Safety",
    qr_safety_response: "Your gold is 100% safe. Every gram you save is backed by 22K 91.6% pure physical gold, insured and stored in secure vaults.",
    qr_redemption_title: "How to Redeem",
    qr_redemption_response: "After your scheme matures, you can redeem your accumulated gold as beautiful jewellery at any of our partner stores, or request delivery of coins/bars to your home.",
    qr_missed_title: "Missed Savings Day",
    qr_missed_response: "Don't worry! There are no strict penalties for missed savings. However, regular savings maximize your bonus rewards.",
    qr_kyc_title: "KYC Help",
    qr_kyc_response: "KYC is required for regulatory compliance. You can easily upload your PAN or Aadhaar card in the Profile section to complete verification.",
    qr_gst_title: "GST Queries",
    qr_gst_response: "A standard 3% GST is applicable when you convert your savings into physical gold (buying), as per government regulations."
  },
  ta: {
    app_name: "ஐஸ்வர்யம் @ உங்கள் இல்லத்தில்",
    dashboard_title: "முகப்பு",
    gold_balance: "தங்க இருப்பு",
    invested_value: "முதலீடு செய்த தொகை",
    current_value: "இன்றைய மதிப்பு",
    live_22k_price: "இன்றைய 22K தங்கம் விலை (வாங்குதல்)",
    buy_gold: "சேமிப்பைத் தொடங்கு",
    sell_gold: "பணமாக மாற்று",
    auto_saving: "தங்க சேமிப்புத் திட்டம்",
    refer_earn: "பரிந்துரை செய்து சம்பாதியுங்கள்",
    faqs: "கேள்வி பதில்கள்",
    history: "வரலாறு",
    profile: "சுயவிவரம்",
    language: "மொழி",
    proceed_to_buy: "சேமிப்பைத் தொடரவும்",
    proceed_to_sell: "மீட்டெடுக்கத் தொடரவும்",
    available_balance: "கிடைக்கக்கூடிய இருப்பு",
    live_sell_price: "இன்றைய மீட்பு விலை",
    account_settings: "கணக்கு அமைப்புகள்",
    personal_info: "தனிப்பட்ட விவரங்கள்",
    bank_accounts: "வங்கி கணக்குகள்",
    security_mpin: "பாதுகாப்பு மற்றும் பின் (MPIN)",
    help_support: "உதவி மற்றும் ஆதரவு",
    logout: "வெளியேறு",
    escalate_support: "வாடிக்கையாளர் சேவையைத் தொடர்பு கொள்க",
    type_message: "உங்கள் செய்தியை உள்ளிடவும்...",
    ai_greeting: "வணக்கம்! 🙏 நான் உங்கள் ஐஸ்வர்யம் தங்க சேமிப்பு உதவியாளர். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?",
    ai_assistant_title: "ஐஸ்வர்யம் உதவியாளர்",
    ai_assistant_subtitle: "உங்களுக்கு உதவ நாங்கள் தயாராக இருக்கிறோம்",
    qr_scheme_title: "திட்டங்கள் பற்றி",
    qr_scheme_response: "₹100 முதல் நெகிழ்வான தங்க சேமிப்பு திட்டங்களை நாங்கள் வழங்குகிறோம். நீங்கள் சேமிக்கும் காலத்திற்கு ஏற்ப 7% வரை போனஸ் தங்கம் பெறலாம். முதிர்வு காலத்தில் நகையாகவோ அல்லது நாணயமாகவோ பெற்றுக்கொள்ளலாம்.",
    qr_bonus_title: "போனஸ் கணக்கீடு",
    qr_bonus_response: "நீங்கள் எவ்வளவு சீக்கிரம் சேமிக்கிறீர்களோ, அதற்கேற்ப உங்கள் போனஸ் கணக்கிடப்படும். 330-நாள் திட்டத்திற்கு, முதல் 75 நாட்களுக்கு 7.5% போனஸ் கிடைக்கும், இது முதிர்வு காலத்தை நெருங்கும்போது 1.5% ஆகக் குறையும்.",
    qr_safety_title: "தங்கத்தின் பாதுகாப்பு",
    qr_safety_response: "உங்கள் தங்கம் 100% பாதுகாப்பானது. நீங்கள் சேமிக்கும் ஒவ்வொரு கிராமும் 22K 91.6% தூய தங்கமாக மாற்றப்பட்டு, காப்பீடு செய்யப்பட்டு பாதுகாப்பான பெட்டகங்களில் சேமிக்கப்படுகிறது.",
    qr_redemption_title: "மீட்பது எப்படி",
    qr_redemption_response: "உங்கள் திட்டம் முடிவடைந்ததும், நீங்கள் சேமித்த தங்கத்தை எங்கள் கூட்டாளர் கடைகளில் அழகான நகையாகப் பெறலாம் அல்லது நாணயங்களாக/கட்டிகளாக உங்கள் வீட்டிற்கே வரவழைக்கலாம்.",
    qr_missed_title: "தவறவிட்ட சேமிப்பு",
    qr_missed_response: "கவலைப்பட வேண்டாம்! தினசரி சேமிப்பை தவறவிடுவதால் எந்த அபராதமும் இல்லை. இருப்பினும், தொடர்ந்து சேமிப்பது உங்கள் போனஸ் பலன்களை அதிகரிக்கும்.",
    qr_kyc_title: "KYC உதவி",
    qr_kyc_response: "KYC என்பது அரசாங்க விதிமுறைகளுக்கு அவசியமானது. சரிபார்ப்பை முடிக்க உங்கள் PAN அல்லது ஆதார் அட்டையை Profile பிரிவில் எளிதாக பதிவேற்றலாம்.",
    qr_gst_title: "GST குறித்த கேள்விகள்",
    qr_gst_response: "அரசாங்க விதிமுறைகளின்படி, நீங்கள் சேமிப்பை (வாங்கும் போது) தங்கமாக மாற்றும் போது நிலையான 3% GST பொருந்தும்."
  }
};

export type Language = 'en' | 'ta';

export function getTranslation(key: keyof typeof translations.en, lang: Language): string {
  return translations[lang][key] || translations['en'][key] || String(key);
}

// Hook to support language changes dynamically
export function useTranslation() {
  const [lang, setLangState] = useState<Language>(SessionManager.getLanguage());

  const changeLanguage = (newLang: Language) => {
    SessionManager.saveLanguage(newLang);
    setLangState(newLang);
    // Custom event to notify other components
    window.dispatchEvent(new Event('languageChange'));
  };

  useEffect(() => {
    const handleLanguageChange = () => {
      setLangState(SessionManager.getLanguage());
    };
    window.addEventListener('languageChange', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  const t = (key: keyof typeof translations.en): string => {
    return getTranslation(key, lang);
  };

  return { t, lang, changeLanguage };
}
