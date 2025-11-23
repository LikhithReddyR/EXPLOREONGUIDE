import React, { useState } from 'react';
import { Hotel, Vehicle, Flight } from '../types';
import { Car, Home, Star, Users, MapPin, Bus, Plane, X, Calendar, CheckCircle, Package } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const KARNATAKA_VILLAS: Hotel[] = [
  { id: 'k1', name: 'The Leela Palace', location: 'Bengaluru, Karnataka', price: 16000, rating: 5.0, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop' },
  { id: 'k2', name: 'Kabini River Lodge', location: 'Kabini, Karnataka', price: 28000, rating: 4.9, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop' },
  { id: 'k3', name: 'Coffee Grove', location: 'Chikmagalur, Karnataka', price: 4500, rating: 4.6, image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=2070&auto=format&fit=crop' },
  { id: 'k4', name: 'Hampi Heritage', location: 'Hampi, Karnataka', price: 12000, rating: 4.5, image: 'https://images.unsplash.com/photo-1600596542815-6ad4c7213aa5?q=80&w=2070&auto=format&fit=crop' },
  { id: 'k5', name: 'Gokarna Villa', location: 'Gokarna, Karnataka', price: 22000, rating: 4.8, image: 'https://images.unsplash.com/photo-1512918760513-95f1fde64283?q=80&w=2070&auto=format&fit=crop' },
  { id: 'k6', name: 'Coorg Rainforest', location: 'Coorg, Karnataka', price: 3500, rating: 4.7, image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2074&auto=format&fit=crop' },
];

const KARNATAKA_RIDES: Vehicle[] = [
  { id: 'r1', name: 'City Taxi (Sedan)', type: 'Cab', pricePerDay: 3200, seats: 4, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop' },
  { id: 'r2', name: 'Auto Rickshaw', type: 'Auto', pricePerDay: 1200, seats: 3, image: 'https://images.unsplash.com/photo-1596423984029-2e77b6320a1c?q=80&w=2070&auto=format&fit=crop' },
  { id: 'r3', name: 'Toyota Innova', type: 'SUV', pricePerDay: 5500, seats: 7, image: 'https://images.unsplash.com/photo-1627453008953-d02336ec438c?q=80&w=2070&auto=format&fit=crop' },
  { id: 'r4', name: 'Royal Enfield', type: 'Bike', pricePerDay: 1500, seats: 2, image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop' },
  { id: 'r5', name: 'Tempo Traveller', type: 'Minibus', pricePerDay: 8500, seats: 12, image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2071&auto=format&fit=crop' },
  { id: 'r6', name: 'Luxury Coach', type: 'Bus', pricePerDay: 15000, seats: 40, image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop' },
];

const HOLIDAY_PACKAGES = [
  { id: 'p1', name: 'Munnar Mist', type: '3N/4D', fromTo: 'Bangalore ⇄ Munnar', image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=2070&auto=format&fit=crop', options: [{ label: 'Budget', price: 5999 }, { label: 'Premium', price: 14500 }] },
  { id: 'p2', name: 'Wayanad Escape', type: '2N/3D', fromTo: 'Mysore ⇄ Wayanad', image: 'https://images.unsplash.com/photo-1596324675549-06048d087955?q=80&w=2070&auto=format&fit=crop', options: [{ label: 'Standard', price: 6500 }, { label: 'Luxury', price: 10500 }] },
  { id: 'p3', name: 'Alleppey Cruise', type: '2N/3D', fromTo: 'Bangalore ⇄ Alleppey', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070&auto=format&fit=crop', options: [{ label: 'Day Cruise', price: 4500 }, { label: 'Houseboat', price: 11000 }] },
  { id: 'p4', name: 'Kochi Heritage', type: 'Day Trip', fromTo: 'Mangalore ⇄ Kochi', image: 'https://images.unsplash.com/photo-1597735881932-d9664c9bbcea?q=80&w=2023&auto=format&fit=crop', options: [{ label: 'Group', price: 1800 }, { label: 'Private', price: 5200 }] },
];

const FLIGHTS: Flight[] = [
  { id: 'f1', airline: 'IndiGo', flightNumber: '6E 502', from: 'BLR', to: 'DEL', price: 5400, duration: '2h 45m', image: 'https://images.unsplash.com/photo-1559223607-133503b222d4?q=80&w=2070&auto=format&fit=crop' },
  { id: 'f2', airline: 'Air India', flightNumber: 'AI 804', from: 'BLR', to: 'BOM', price: 4200, duration: '1h 50m', image: 'https://images.unsplash.com/photo-1556382363-8967ac2b36f8?q=80&w=2070&auto=format&fit=crop' },
  { id: 'f3', airline: 'Vistara', flightNumber: 'UK 812', from: 'IXE', to: 'BLR', price: 2800, duration: '1h 00m', image: 'https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?q=80&w=2070&auto=format&fit=crop' },
  { id: 'f4', airline: 'Akasa', flightNumber: 'QP 135', from: 'BLR', to: 'COK', price: 3100, duration: '1h 15m', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop' },
];

const Bookings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hotels' | 'rides' | 'buses' | 'flights'>('hotels');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedPackageOption, setSelectedPackageOption] = useState<any>(null);
  const [modalStep, setModalStep] = useState(1);
  const [bookingDate, setBookingDate] = useState('');
  const [duration, setDuration] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const { t } = useLanguage();

  const handleOpenBooking = (item: any) => {
    setSelectedItem(item);
    if (activeTab === 'buses' && item.options?.length > 0) setSelectedPackageOption(item.options[0]);
    else setSelectedPackageOption(null);
    setModalStep(1);
    setBookingDate('');
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setSelectedPackageOption(null);
  };

  const calculateTotal = () => {
    if (!selectedItem) return 0;
    let price = selectedPackageOption ? selectedPackageOption.price : (selectedItem.price || selectedItem.pricePerDay || 0);
    if (activeTab === 'hotels' || activeTab === 'rides') return price * duration * quantity; 
    return price * quantity;
  };

  const getLowestPrice = (options: any[]) => options && options.length ? Math.min(...options.map(o => o.price)) : 0;

  const TabButton = ({ id, label, icon: Icon }: any) => (
      <button
        onClick={() => setActiveTab(id)}
        className={`pb-3 px-6 font-bold flex items-center gap-2 transition-all border-b-2 text-sm md:text-base ${
          activeTab === id 
          ? 'border-white text-white drop-shadow-md' 
          : 'border-transparent text-slate-700/70 hover:text-slate-900'
        }`}
      >
        <Icon size={18} /> {label}
      </button>
  );

  return (
    <div className="max-w-7xl mx-auto pb-24">
      <header className="mb-8 border-b border-white/20 pb-6">
        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2 drop-shadow-sm">{t('bookings_title')}</h2>
        <p className="text-slate-700 font-medium">{t('bookings_subtitle')}</p>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar px-2">
        <TabButton id="hotels" label={t('tab_villas')} icon={Home} />
        <TabButton id="rides" label={t('tab_rides')} icon={Car} />
        <TabButton id="buses" label={t('tab_holidays')} icon={Bus} />
        <TabButton id="flights" label={t('tab_flights')} icon={Plane} />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {activeTab === 'hotels' && KARNATAKA_VILLAS.map((item) => <GlassBookingCard key={item.id} item={item} type="hotel" onBook={handleOpenBooking} />)}
        {activeTab === 'rides' && KARNATAKA_RIDES.map((item) => <GlassBookingCard key={item.id} item={item} type="ride" onBook={handleOpenBooking} />)}
        {activeTab === 'buses' && HOLIDAY_PACKAGES.map((item) => <GlassBookingCard key={item.id} item={item} type="package" onBook={handleOpenBooking} minPrice={getLowestPrice(item.options)} />)}
        {activeTab === 'flights' && FLIGHTS.map((item) => <GlassBookingCard key={item.id} item={item} type="flight" onBook={handleOpenBooking} />)}
      </div>

      {/* Glass Booking Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="glass bg-white/90 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up">
            {modalStep === 1 ? (
              <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900">Book {selectedItem.name || selectedItem.airline}</h3>
                    <button onClick={handleCloseModal} className="text-slate-500 hover:text-slate-800 bg-white/50 p-2 rounded-full"><X size={20}/></button>
                  </div>
                  
                  <div className="bg-nature-50/50 p-4 rounded-xl mb-6 flex justify-between items-center border border-nature-100">
                      <div>
                          <p className="text-xs font-bold text-nature-600 uppercase tracking-wider">Estimated Total</p>
                          <p className="text-3xl font-bold text-slate-800">
                             ₹{calculateTotal().toLocaleString()}
                          </p>
                      </div>
                      <div className="text-right">
                          <p className="text-xs font-bold text-slate-500">Price/Unit</p>
                          <p className="font-bold text-slate-800">₹{(selectedPackageOption ? selectedPackageOption.price : (selectedItem.price || selectedItem.pricePerDay || 0)).toLocaleString()}</p>
                      </div>
                  </div>

                  <div className="space-y-4">
                     {activeTab === 'buses' && selectedItem.options && (
                        <div>
                             <label className="block text-sm font-bold text-slate-700 mb-1">Select Package</label>
                             <div className="relative">
                                 <Package className="absolute left-3 top-3.5 text-slate-500" size={18} />
                                 <select
                                    onChange={(e) => setSelectedPackageOption(selectedItem.options.find((o:any) => o.label === e.target.value))}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-nature-600 focus:ring-1 focus:ring-nature-600 outline-none bg-white/60"
                                 >
                                     {selectedItem.options.map((opt:any) => <option key={opt.label} value={opt.label}>{opt.label} (₹{opt.price})</option>)}
                                 </select>
                             </div>
                        </div>
                     )}

                     <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-3.5 text-slate-500" size={18} />
                            <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-nature-600 focus:ring-1 focus:ring-nature-600 outline-none bg-white/60 text-slate-600" />
                        </div>
                     </div>

                     <div className="flex gap-4">
                        {(activeTab === 'hotels' || activeTab === 'rides') && (
                            <div className="flex-1">
                                <label className="block text-sm font-bold text-slate-700 mb-1">Duration</label>
                                <input type="number" min="1" value={duration} onChange={(e) => setDuration(parseInt(e.target.value)||1)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-nature-600 focus:ring-1 focus:ring-nature-600 outline-none bg-white/60" />
                            </div>
                        )}
                        <div className="flex-1">
                            <label className="block text-sm font-bold text-slate-700 mb-1">{activeTab === 'hotels' ? 'Guests' : 'Qty'}</label>
                            <div className="relative">
                                <Users className="absolute left-3 top-3.5 text-slate-500" size={18} />
                                <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value)||1)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-nature-600 focus:ring-1 focus:ring-nature-600 outline-none bg-white/60" />
                            </div>
                        </div>
                     </div>
                  </div>

                  <button 
                    onClick={() => setModalStep(2)} disabled={!bookingDate}
                    className="w-full mt-6 btn-primary font-bold py-4 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-transform"
                  >
                      Confirm Booking
                  </button>
              </div>
            ) : (
              <div className="p-12 text-center">
                 <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 mx-auto border border-green-100 shadow-inner">
                    <CheckCircle size={40} className="text-green-600" />
                 </div>
                 <h3 className="text-2xl font-bold text-slate-900 mb-2">Success!</h3>
                 <p className="text-slate-600 mb-8">Your trip to {selectedItem.name || selectedItem.airline} is booked.</p>
                 <button onClick={handleCloseModal} className="bg-slate-900 text-white font-medium px-8 py-3 rounded-xl hover:bg-slate-800 transition-colors shadow-lg">Done</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Glass Card
const GlassBookingCard = ({ item, type, onBook, minPrice }: any) => {
    const { t } = useLanguage();
    return (
        <div className="glass-card rounded-2xl overflow-hidden group">
            <div className="relative h-48 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                {item.rating && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm flex items-center gap-1 text-xs font-bold text-slate-800">
                        <Star size={12} className="fill-yellow-400 text-yellow-400" /> {item.rating}
                    </div>
                )}
            </div>
            <div className="p-5">
                <h3 className="font-bold text-lg text-slate-900 leading-tight mb-1 truncate">{item.name || item.airline}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mb-4 font-medium">
                   <MapPin size={12} /> {item.location || item.fromTo || item.from + ' > ' + item.to}
                </p>
                <div className="flex items-center justify-between border-t border-slate-200/50 pt-4">
                    <div>
                        <p className="text-xs text-slate-400 font-bold uppercase">{minPrice ? 'From' : 'Price'}</p>
                        <p className="text-lg font-bold text-nature-700">₹{(minPrice || item.price || item.pricePerDay).toLocaleString()}</p>
                    </div>
                    <button 
                        onClick={() => onBook(item)}
                        className="bg-slate-900/90 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-md"
                    >
                        {t('btn_book')}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Bookings;