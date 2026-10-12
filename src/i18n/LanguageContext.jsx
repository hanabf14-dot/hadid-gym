import { createContext, useContext, useEffect, useState } from 'react';
import { translations } from './translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('lang') === 'ar' ? 'ar' : 'fr';
    } catch {
      return 'fr';
    }
  });

  // كل مرة تتبدل اللغة: نبدّلو اتجاه الصفحة ونحفظو الاختيار
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem('lang', lang);
    } catch {
      // ما يهمش
    }
  }, [lang]);

  const toggleLang = () => setLang(lang === 'fr' ? 'ar' : 'fr');

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  return useContext(LanguageContext);
}