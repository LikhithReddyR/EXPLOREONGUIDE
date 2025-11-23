import React from 'react';
import { AppView } from '../types';
import { Compass, CircleDollarSign, Building2, AlertTriangle, Bus, Languages, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HomeProps {
  setView: (view: AppView) => void;
  triggerEmergency: () => void;
}

const Home: React.FC<HomeProps> = ({ setView, triggerEmergency }) => {
  const { t } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto pb-24">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden mb-10 h-[450px] shadow-2xl group border-4 border-white/30">
        <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop" 
            alt="Travel Landscape" 
            className="w-full h-full object-cover brightness-[0.85] group-hover:scale-105 transition-transform duration-[2s]" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 p-8 md:p-12 text-left w-full">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight drop-shadow-md">
                {t('hero_title')}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl font-light drop-shadow-sm">
                {t('hero_subtitle')}
            </p>
            <button 
                onClick={() => setView(AppView.TRIP_PLANNER)}
                className="bg-nature-600/90 hover:bg-nature-700 backdrop-blur-sm text-white font-medium py-3 px-8 rounded-xl shadow-lg flex items-center gap-2 transition-all transform hover:translate-x-1 border border-white/20"
            >
                Start Exploring <ArrowRight size={18} />
            </button>
        </div>
      </div>

      {/* Glass Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <GlassCard 
            onClick={() => setView(AppView.TRIP_PLANNER)}
            icon={<Compass size={28} className="text-nature-600" />}
            title={t('card_plan_title')}
            desc={t('card_plan_desc')}
        />

        <GlassCard 
            onClick={() => setView(AppView.BOOKINGS)}
            icon={<Building2 size={28} className="text-blue-600" />}
            title={t('card_book_title')}
            desc={t('card_book_desc')}
        />

        <GlassCard 
            onClick={() => setView(AppView.BOOKINGS)}
            icon={<Bus size={28} className="text-orange-600" />}
            title={t('card_holiday_title')}
            desc={t('card_holiday_desc')}
        />

        <GlassCard 
            onClick={() => setView(AppView.CURRENCY)}
            icon={<CircleDollarSign size={28} className="text-emerald-600" />}
            title={t('card_curr_title')}
            desc={t('card_curr_desc')}
        />

        <GlassCard 
            onClick={() => setView(AppView.TRANSLATOR)}
            icon={<Languages size={28} className="text-violet-600" />}
            title={t('card_lang_title')}
            desc={t('card_lang_desc')}
        />

        {/* Emergency Card */}
        <div 
            onClick={triggerEmergency}
            className="glass-card rounded-2xl p-6 cursor-pointer bg-red-500/10 border-red-200/50 hover:bg-red-500/20 group flex flex-col justify-between h-full"
        >
            <div>
                <div className="w-12 h-12 bg-red-100/50 rounded-xl flex items-center justify-center mb-4 text-red-600 group-hover:bg-red-100 transition-colors backdrop-blur-sm">
                    <AlertTriangle size={24} />
                </div>
                <h3 className="font-serif font-bold text-xl text-red-900 mb-2">{t('emergency_title')}</h3>
                <p className="text-red-900/70 text-sm leading-relaxed">{t('emergency_desc')}</p>
            </div>
            <div className="mt-4 flex items-center text-red-700 font-bold text-sm group-hover:translate-x-1 transition-transform">
                Get Help <ArrowRight size={16} className="ml-1" />
            </div>
        </div>
      </div>
    </div>
  );
};

// Glass Card Component
const GlassCard: React.FC<{onClick: () => void, icon: React.ReactNode, title: string, desc: string}> = ({
    onClick, icon, title, desc
}) => (
    <div 
        onClick={onClick}
        className="glass-card rounded-2xl p-6 cursor-pointer group flex flex-col justify-between h-full"
    >
        <div>
            <div className="w-12 h-12 bg-white/50 rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:bg-white/80 transition-colors">
                {icon}
            </div>
            <h3 className="font-serif font-bold text-xl text-slate-800 mb-2">{title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
        </div>
        <div className="mt-6 flex items-center text-slate-500 group-hover:text-nature-700 text-sm font-bold transition-colors">
            View Details <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
    </div>
);

export default Home;