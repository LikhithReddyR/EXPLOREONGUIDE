import React, { useState } from 'react';
import { getCurrencyRate } from '../services/geminiService';
import { ArrowRightLeft, RefreshCw, Coins } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '../contexts/LanguageContext';

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR'];

  const handleConvert = async () => {
    setLoading(true);
    const res = await getCurrencyRate(fromCurrency, toCurrency, amount);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="glass rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-white/40 border-b border-white/20 p-8 text-center backdrop-blur-sm">
            <h2 className="text-2xl font-serif font-bold text-slate-800 flex items-center justify-center gap-2">
                <Coins size={24} className="text-nature-600" />
                {t('currency_title')}
            </h2>
            <p className="text-slate-600 text-sm mt-1 font-medium">{t('currency_subtitle')}</p>
        </div>
        
        <div className="p-8 space-y-6">
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Amount</label>
                <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    className="w-full text-4xl font-bold text-slate-800 border-b-2 border-slate-300 focus:border-nature-600 outline-none py-2 bg-transparent transition-colors text-center"
                />
            </div>

            <div className="flex items-center gap-4">
                <div className="flex-1">
                     <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">From</label>
                     <div className="relative">
                         <select 
                            value={fromCurrency} 
                            onChange={(e) => setFromCurrency(e.target.value)}
                            className="w-full p-4 rounded-xl border border-white/40 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-nature-500 glass-input cursor-pointer"
                         >
                            {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                         </select>
                     </div>
                </div>
                
                <button 
                    onClick={() => {
                        const temp = fromCurrency;
                        setFromCurrency(toCurrency);
                        setToCurrency(temp);
                    }}
                    className="mt-6 p-3 rounded-full bg-white/60 text-slate-600 hover:bg-white hover:text-nature-600 transition-all shadow-md"
                >
                    <ArrowRightLeft size={20} />
                </button>

                <div className="flex-1">
                     <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">To</label>
                     <div className="relative">
                         <select 
                            value={toCurrency} 
                            onChange={(e) => setToCurrency(e.target.value)}
                            className="w-full p-4 rounded-xl border border-white/40 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-nature-500 glass-input cursor-pointer"
                         >
                            {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                         </select>
                     </div>
                </div>
            </div>

            <button 
                onClick={handleConvert}
                disabled={loading}
                className="w-full btn-primary font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 mt-4"
            >
                {loading ? <RefreshCw className="animate-spin" /> : t('btn_convert')}
            </button>
            
            {result && (
                <div className="mt-8 p-6 bg-white/50 rounded-xl border border-white/40 shadow-inner">
                    <div className="prose prose-sm text-slate-800 font-medium text-center">
                        <ReactMarkdown>{result}</ReactMarkdown>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;