import React from 'react';
import { Languages, Check, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../services/translations';

const LANGUAGES: { code: Language; name: string; native: string }[] = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'de', name: 'German', native: 'Deutsch' },
  { code: 'it', name: 'Italian', native: 'Italiano' },
  { code: 'pt', name: 'Portuguese', native: 'Português' },
  { code: 'ru', name: 'Russian', native: 'Русский' },
  { code: 'ja', name: 'Japanese', native: '日本語' },
];

const Translator: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto py-12">
      <div className="glass rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-white/40 border-b border-white/20 p-8 text-center backdrop-blur-sm">
          <Globe size={32} className="mx-auto mb-3 text-slate-600" />
          <h2 className="text-2xl font-serif font-bold text-slate-900">{t('lang_title')}</h2>
          <p className="text-slate-600 mt-1 font-medium">{t('lang_subtitle')}</p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`flex items-center justify-between p-5 rounded-xl border transition-all duration-200 ${
                  language === lang.code
                    ? 'border-nature-600 bg-white/80 shadow-md transform scale-[1.02]'
                    : 'border-white/30 bg-white/30 hover:bg-white/50 hover:border-white/50'
                }`}
              >
                <div className="flex flex-col items-start">
                  <span className={`font-bold text-lg ${language === lang.code ? 'text-nature-900' : 'text-slate-800'}`}>{lang.native}</span>
                  <span className="text-xs text-slate-500 font-bold">{lang.name}</span>
                </div>
                {language === lang.code && (
                  <Check size={20} className="text-nature-600" strokeWidth={3} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translator;