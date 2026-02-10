import { createContext, useContext, useEffect, useState } from 'react';

export const currencies = [
  { code: 'USD', symbol: '$', name: 'United States', flag: '🇺🇸', rate: 1 },
  { code: 'EGP', symbol: 'EGP', name: 'Egypt', flag: '🇪🇬', rate: 49.30 },
  { code: 'AED', symbol: 'AED', name: 'UAE', flag: '🇦🇪', rate: 3.67 },
  { code: 'SAR', symbol: 'SAR', name: 'Saudi Arabia', flag: '🇸🇦', rate: 3.75 },
  { code: 'IQD', symbol: 'IQD', name: 'Iraq', flag: '🇮🇶', rate: 1308 },
  { code: 'CAD', symbol: 'C$', name: 'Canada', flag: '🇨🇦', rate: 1.41 },
  { code: 'EUR', symbol: '€', name: 'Europe', flag: '🇪🇺', rate: 0.95 },
  { code: 'SYP', symbol: 'LS', name: 'Syria', flag: '🇸🇾', rate: 14650 },
  { code: 'KWD', symbol: 'KD', name: 'Kuwait', flag: '🇰🇼', rate: 0.31 },
  { code: 'RUB', symbol: '₽', name: 'Russia', flag: '🇷🇺', rate: 105.50 },
  { code: 'MAD', symbol: 'DH', name: 'Morocco', flag: '🇲🇦', rate: 10.10 },
  { code: 'TND', symbol: 'DT', name: 'Tunisia', flag: '🇹🇳', rate: 3.15 },
  { code: 'LYD', symbol: 'LD', name: 'Libya', flag: '🇱🇾', rate: 4.85 }
] as const;

export type CurrencyCode = typeof currencies[number]['code'];

type CurrencyContextType = {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  selectedCurrency: typeof currencies[number];
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function ContextProvider({ children }: { children: React.ReactNode }) {
  // 1. Initialize state directly from localStorage if it exists
  const [currency, setCurrency] = useState<CurrencyCode>(() => {
    // Check if we are in the browser
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('currency') as CurrencyCode;
      if (stored && currencies.some((c) => c.code === stored)) {
        return stored;
      }
    }
    return 'USD';
  });

  // 2. Only one useEffect to sync state change TO localStorage
  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  const selectedCurrency = currencies.find((c) => c.code === currency) || currencies[0];

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, selectedCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}