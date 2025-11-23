import React, { useState, useEffect } from 'react';
import { AlertTriangle, X, Phone, MapPin } from 'lucide-react';

interface EmergencyAlertProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const EmergencyAlert: React.FC<EmergencyAlertProps> = ({ isOpen, onOpen, onClose }) => {
  const [countdown, setCountdown] = useState(5);
  const [alertSent, setAlertSent] = useState(false);
  const [location, setLocation] = useState<string>('Locating...');

  useEffect(() => {
    let timer: any;
    if (isOpen && countdown > 0 && !alertSent) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    } else if (isOpen && countdown === 0 && !alertSent) {
      handleSendAlert();
    }
    return () => clearTimeout(timer);
  }, [isOpen, countdown, alertSent]);

  const handleSendAlert = () => {
    setAlertSent(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
        },
        () => setLocation("Unknown Location")
      );
    }
  };

  const reset = () => {
    setCountdown(5);
    setAlertSent(false);
    setLocation('Locating...');
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative">
        <button 
          onClick={reset}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full"
        >
          <X size={24} />
        </button>

        <div className="p-8 text-center">
          <div className="mx-auto w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle size={40} className="text-red-600" />
          </div>

          {!alertSent ? (
            <>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">SOS Alert</h2>
              <p className="text-slate-500 mb-6">Sending emergency alerts in...</p>
              <div className="text-6xl font-black text-red-600 mb-8 font-mono">
                {countdown}
              </div>
              <button
                onClick={handleSendAlert}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl text-lg mb-3 shadow-lg shadow-red-200"
              >
                SEND NOW
              </button>
              <button
                onClick={reset}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-4 rounded-xl"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-green-700 mb-2">Alert Sent</h2>
              <p className="text-slate-500 mb-6">Help is on the way. Keep calm.</p>
              
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-left mb-6 space-y-3">
                <div className="flex items-center gap-3">
                    <MapPin className="text-blue-500" size={20} />
                    <span className="font-mono text-sm font-bold text-slate-800">{location}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Phone className="text-green-500" size={20} />
                    <span className="font-medium text-sm text-slate-700">Notifying emergency services...</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                 <a href="tel:911" className="bg-red-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 shadow-md">
                    <Phone size={18} /> Call 911
                 </a>
                 <button onClick={reset} className="bg-slate-200 text-slate-800 py-3 rounded-xl font-bold hover:bg-slate-300">
                    Dismiss
                 </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmergencyAlert;