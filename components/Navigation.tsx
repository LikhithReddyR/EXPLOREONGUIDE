import React from 'react';
import { Home, Map, Building2, CircleDollarSign, Compass, Languages } from 'lucide-react';
import { AppView } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface NavigationProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const { t } = useLanguage();

  const navItems = [
    { view: AppView.HOME, label: t('nav_home'), icon: <Home size={20} /> },
    { view: AppView.TRIP_PLANNER, label: t('nav_plan'), icon: <Compass size={20} /> },
    { view: AppView.BOOKINGS, label: t('nav_bookings'), icon: <Building2 size={20} /> },
    { view: AppView.MAP, label: t('nav_map'), icon: <Map size={20} /> },
    { view: AppView.CURRENCY, label: t('nav_currency'), icon: <CircleDollarSign size={20} /> },
    { view: AppView.TRANSLATOR, label: t('nav_language'), icon: <Languages size={20} /> },
  ];

  return (
    <>
      {/* Desktop Glass Sidebar */}
      <nav className="hidden md:flex fixed top-0 left-0 h-screen w-64 glass flex-col z-40 border-r border-white/40">
        <div className="p-8 pb-4">
            <h1 className="text-2xl font-serif font-bold text-slate-800 flex items-center gap-2">
            <Compass className="text-nature-600" size={28} />
            Explore On
            </h1>
        </div>
        
        <div className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => setView(item.view)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                currentView === item.view
                  ? 'bg-white/60 text-nature-800 shadow-sm border border-white/50'
                  : 'text-slate-600 hover:bg-white/30 hover:text-slate-900'
              }`}
            >
              <div className={currentView === item.view ? 'text-nature-600' : 'text-slate-500'}>
                {item.icon}
              </div>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        
        <div className="p-6 border-t border-white/20">
           <p className="text-xs text-slate-500 font-medium">© 2024 Explore On</p>
        </div>
      </nav>

      {/* Mobile Glass Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass z-50 px-4 py-2 flex justify-between items-center pb-safe">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => setView(item.view)}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              currentView === item.view ? 'text-nature-800' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {item.icon}
            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

export default Navigation;