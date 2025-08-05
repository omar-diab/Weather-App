import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Safe fallback for SSR or non-browser environments
const getSavedLang = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('lang') || 'en';
  }
  return 'en';
};

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        appName: 'WEATHER',
        language: 'Arabic',
        selectLocation: 'Select Location',
        temperature: 'Temperature',
        maxTemp: 'Max',
        minTemp: 'Min',
        weatherDesc: 'Description',
        currentDate: 'Current Date & Time',
        buttonLabel: 'Switch to Arabic',
        country: {
          Palestine: 'Palestine',
          Egypt: 'Egypt',
          Jordan: 'Jordan',
          Turkey: 'Turkey',
          SaudiArabia: 'Saudi Arabia',
          UAE: 'UAE',
          Germany: 'Germany',
          France: 'France',
          UnitedKingdom: 'UK',
          UnitedStates: 'USA',
          Canada: 'Canada',
          Japan: 'Japan',
          Brazil: 'Brazil',
          India: 'India',
          Australia: 'Australia',
        },
      },
    },
    ar: {
      translation: {
        appName: 'الطقس',
        language: 'الإنجليزية',
        selectLocation: 'اختر الموقع',
        temperature: 'درجة الحرارة',
        maxTemp: 'العظمى',
        minTemp: 'الصغرى',
        weatherDesc: 'الوصف',
        currentDate: 'التاريخ والوقت الحالي',
        buttonLabel: 'التبديل إلى الإنجليزية',
        country: {
          Palestine: 'فلسطين',
          Egypt: 'مصر',
          Jordan: 'الأردن',
          Turkey: 'تركيا',
          SaudiArabia: 'السعودية',
          UAE: 'الإمارات',
          Germany: 'ألمانيا',
          France: 'فرنسا',
          UnitedKingdom: 'المملكة المتحدة',
          UnitedStates: 'الولايات المتحدة',
          Canada: 'كندا',
          Japan: 'اليابان',
          Brazil: 'البرازيل',
          India: 'الهند',
          Australia: 'أستراليا',
        },
      },
    },
  },
  lng: getSavedLang(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
