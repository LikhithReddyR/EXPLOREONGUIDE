import React, { useState } from 'react';
import { ExternalLink, Map as MapIcon, Navigation } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const MapView: React.FC = () => {
  const [start, setStart] = useState('');
  const [destination, setDestination] = useState('');
  const { t } = useLanguage();

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination) return;
    
    let url = 'https://www.google.com/maps/dir/?api=1';
    if (start) {
        url += `&origin=${encodeURIComponent(start)}`;
    }
    url += `&destination=${encodeURIComponent(destination)}`;
    
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="glass rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-slate-900/90 backdrop-blur-md p-8 text-center text-white">
          <MapIcon size={40} className="mx-auto mb-3 text-white/80" />
          <h2 className="text-2xl font-serif font-bold">{t('map_title')}</h2>
          <p className="text-slate-300 mt-1">{t('map_subtitle')}</p>
        </div>

        <form onSubmit={handleNavigate} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">Starting Point</label>
            <input 
              type="text" 
              value={start}
              onChange={(e) => setStart(e.target.value)}
              placeholder="Leave empty for current location"
              className="w-full p-4 rounded-xl glass-input outline-none focus:ring-2 focus:ring-slate-500 text-slate-800 placeholder-slate-500"
            />
          </div>

          <div className="space-y-2">
             <label className="block text-sm font-bold text-slate-700">Destination</label>
             <input 
                type="text" 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g., Mysore Palace"
                className="w-full p-4 rounded-xl glass-input outline-none focus:ring-2 focus:ring-slate-500 text-slate-800 placeholder-slate-500"
                required
             />
          </div>

          <button 
            type="submit"
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 mt-4 shadow-lg"
          >
             <Navigation size={20} /> {t('btn_navigate')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default MapView;