import React, { useState } from 'react';
import { generateTripPlan } from '../services/geminiService';
import { TripPlan } from '../types';
import { MapPin, Calendar, Loader2, Wallet, Crown, Package, User, ChevronDown, ChevronUp, Clock, Compass } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '../contexts/LanguageContext';

const KARNATAKA_DESTINATIONS = [
  { name: 'Bengaluru, Karnataka', label: 'Bengaluru', interests: 'Gardens, Tech, Pubs, Palaces' },
  { name: 'Coorg, Karnataka', label: 'Coorg', interests: 'Coffee, Trekking, Nature' },
  { name: 'Hampi, Karnataka', label: 'Hampi', interests: 'Ruins, History, Temples' },
  { name: 'Mysore, Karnataka', label: 'Mysore', interests: 'Palace, Heritage, Silk' },
  { name: 'Gokarna, Karnataka', label: 'Gokarna', interests: 'Beaches, Temples' },
  { name: 'Udupi, Karnataka', label: 'Udupi', interests: 'Temples, Cuisine, Beaches' },
];

const TripPlanner: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(3);
  const [interests, setInterests] = useState('');
  const [tripStyle, setTripStyle] = useState('normal'); 
  const [loading, setLoading] = useState(false);
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [rawText, setRawText] = useState<string | null>(null);
  
  const { t } = useLanguage();

  const handlePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination || !interests) return;
    
    setLoading(true);
    setTripPlan(null);
    setRawText(null);
    setExpandedDay(null);

    const result = await generateTripPlan(destination, days, interests, tripStyle);
    
    if (result.tripPlan) {
      setTripPlan(result.tripPlan);
      if (result.tripPlan.days && Array.isArray(result.tripPlan.days) && result.tripPlan.days.length > 0) {
        setExpandedDay(result.tripPlan.days[0].day);
      }
    } else {
      setRawText(result.text);
    }
    
    setLoading(false);
  };

  const toggleDay = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  const styles = [
      { id: 'budget', label: t('style_budget'), icon: Wallet },
      { id: 'normal', label: t('style_normal'), icon: User },
      { id: 'package', label: t('style_package'), icon: Package },
      { id: 'luxury', label: t('style_luxury'), icon: Crown },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <header className="mb-8 border-b border-white/20 pb-6">
        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2 drop-shadow-sm">{t('trip_title')}</h2>
        <p className="text-slate-700 font-medium">{t('trip_subtitle')}</p>
      </header>

      {/* Quick Select */}
      <div className="mb-8">
        <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3 px-1">Popular in Karnataka</h3>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {KARNATAKA_DESTINATIONS.map(dest => (
            <button
              key={dest.name}
              onClick={() => {
                  setDestination(dest.name);
                  setInterests(dest.interests);
              }}
              className="glass-card whitespace-nowrap px-4 py-2 rounded-full text-sm text-slate-700 hover:bg-white hover:text-nature-700 transition-colors"
            >
              {dest.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Planner Form */}
        <div className="lg:col-span-1">
          <form onSubmit={handlePlan} className="glass p-6 rounded-2xl sticky top-24 space-y-6">
            
            {/* Trip Style */}
            <div>
                 <label className="block text-sm font-bold text-slate-700 mb-3">{t('lbl_trip_style')}</label>
                 <div className="grid grid-cols-2 gap-3">
                    {styles.map((style) => (
                        <div 
                            key={style.id}
                            onClick={() => setTripStyle(style.id)}
                            className={`cursor-pointer rounded-xl p-3 flex flex-col items-center justify-center border transition-all ${
                                tripStyle === style.id 
                                ? 'bg-white/80 border-nature-600 text-nature-800 shadow-sm' 
                                : 'bg-white/40 border-transparent text-slate-600 hover:bg-white/60'
                            }`}
                        >
                            <style.icon size={18} className="mb-1.5" />
                            <span className="text-xs font-bold">{style.label}</span>
                        </div>
                    ))}
                 </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{t('lbl_dest')}</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 text-slate-500" size={18} />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Where to?"
                    className="w-full pl-10 pr-4 py-3 rounded-xl glass-input outline-none focus:ring-2 focus:ring-nature-500 text-slate-800 placeholder-slate-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{t('lbl_days')}</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 text-slate-500" size={18} />
                  <input
                    type="number"
                    min="1"
                    max="14"
                    value={days}
                    onChange={(e) => setDays(parseInt(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 rounded-xl glass-input outline-none focus:ring-2 focus:ring-nature-500 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{t('lbl_interests')}</label>
                <textarea
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  placeholder="e.g., Hiking, Food, History"
                  className="w-full px-4 py-3 rounded-xl glass-input outline-none focus:ring-2 focus:ring-nature-500 text-slate-800 min-h-[100px] resize-none placeholder-slate-400"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Compass size={20} />}
              {loading ? 'Planning...' : t('btn_plan')}
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="lg:col-span-2">
          {tripPlan ? (
            <div className="space-y-4">
              <div className="bg-slate-900/90 backdrop-blur-md p-8 rounded-2xl text-white shadow-xl">
                <h3 className="text-3xl font-serif font-bold">{tripPlan.tripName}</h3>
                <p className="text-slate-300 mt-2">A customized {days}-day journey tailored just for you.</p>
              </div>

              {tripPlan.days?.map((dayItem) => (
                    <div 
                        key={dayItem.day} 
                        className="glass-card rounded-2xl overflow-hidden"
                    >
                        <button 
                            onClick={() => toggleDay(dayItem.day)}
                            className="w-full flex items-center justify-between p-5 text-left focus:outline-none hover:bg-white/40 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-center justify-center w-12 h-12 bg-white/60 rounded-xl text-nature-800 shadow-sm">
                                    <span className="text-[10px] font-bold uppercase">Day</span>
                                    <span className="text-lg font-bold">{dayItem.day}</span>
                                </div>
                                <h4 className="font-bold text-lg text-slate-800">{dayItem.theme}</h4>
                            </div>
                            <div className={`text-slate-500 transform transition-transform ${expandedDay === dayItem.day ? 'rotate-180' : ''}`}>
                                <ChevronDown size={20} />
                            </div>
                        </button>
                        
                        {expandedDay === dayItem.day && (
                            <div className="px-5 pb-6 border-t border-white/20">
                                <div className="space-y-6 mt-6 relative pl-2 md:pl-4">
                                    <div className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-slate-300/50"></div>
                                    
                                    {dayItem.activities?.map((activity, idx) => (
                                        <div key={idx} className="relative pl-8">
                                            <div className="absolute left-2.5 md:left-[1.15rem] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-nature-500 z-10 shadow-sm"></div>
                                            
                                            <div className="bg-white/40 p-4 rounded-xl border border-white/30 backdrop-blur-sm">
                                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                                    <span className="bg-nature-100/80 text-nature-900 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                                                        <Clock size={12} /> {activity.time}
                                                    </span>
                                                    {activity.locationName && (
                                                        <span className="text-xs text-slate-700 font-bold flex items-center gap-1">
                                                            <MapPin size={12} /> {activity.locationName}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-slate-800 text-sm">{activity.activity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
          ) : rawText ? (
            <div className="glass p-8 rounded-2xl prose prose-slate max-w-none">
                <ReactMarkdown>{rawText}</ReactMarkdown>
            </div>
          ) : !loading && (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-white/40 rounded-2xl glass min-h-[400px]">
                <Compass size={48} className="mb-4 opacity-50" />
                <p className="text-center font-bold text-lg">Your dream itinerary awaits.</p>
                <p className="text-center text-sm opacity-70">Enter details to generate a plan</p>
            </div>
          )}
          
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-800">
              <Loader2 size={40} className="animate-spin mb-4 text-white drop-shadow-md" />
              <p className="text-lg font-bold text-white drop-shadow-md">Designing your perfect trip...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;