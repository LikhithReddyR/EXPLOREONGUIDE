import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import TripPlanner from './components/TripPlanner';
import Bookings from './components/Bookings';
import CurrencyConverter from './components/CurrencyConverter';
import MapView from './components/MapView';
import Translator from './components/Translator';
import EmergencyAlert from './components/EmergencyAlert';
import { AppView } from './types';
import { LanguageProvider } from './contexts/LanguageContext';

function AppContent() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case AppView.HOME: return <Home setView={setCurrentView} triggerEmergency={() => setIsEmergencyOpen(true)} />;
      case AppView.TRIP_PLANNER: return <TripPlanner />;
      case AppView.BOOKINGS: return <Bookings />;
      case AppView.CURRENCY: return <CurrencyConverter />;
      case AppView.MAP: return <MapView />;
      case AppView.TRANSLATOR: return <Translator />;
      default: return <Home setView={setCurrentView} triggerEmergency={() => setIsEmergencyOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans text-slate-800">
      <Navigation currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-1 p-4 md:p-8 md:ml-64 overflow-x-hidden min-h-screen relative z-10 transition-all duration-300">
         <div className="max-w-7xl mx-auto mt-0">
           {renderView()}
         </div>
      </main>

      <EmergencyAlert 
        isOpen={isEmergencyOpen} 
        onOpen={() => setIsEmergencyOpen(true)} 
        onClose={() => setIsEmergencyOpen(false)} 
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}