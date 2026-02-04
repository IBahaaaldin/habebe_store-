import { createContext, useContext, useEffect, useState } from 'react';

export const currencies = [
  { code: 'USD', symbol: '$', name: 'United States', flag: '🇺🇸', rate: 1 },
  { code: 'EGP', symbol: 'EGP', name: 'Egypt', flag: '🇪🇬', rate: 48.50 },
  { code: 'AED', symbol: 'AED', name: 'UAE', flag: '🇦🇪', rate: 3.67 },
  { code: 'SAR', symbol: 'SAR', name: 'Saudi Arabia', flag: '🇸🇦', rate: 3.75 },
  { code: 'IQD', symbol: 'IQD', name: 'Iraq', flag: '🇮🇶', rate: 1310 },
  { code: 'CAD', symbol: 'C$', name: 'Canada', flag: '🇨🇦', rate: 1.36 },
  { code: 'EUR', symbol: '€', name: 'Europe', flag: '🇪🇺', rate: 0.92 },
  { code: 'SYP', symbol: 'LS', name: 'Syria', flag: '🇸🇾', rate: 13000 },

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