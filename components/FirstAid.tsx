import React, { useState } from 'react';
import { getFirstAidAdvice } from '../services/geminiService';
import { HeartPulse, Send, AlertCircle, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const FirstAid: React.FC = () => {
  const [query, setQuery] = useState('');
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setAdvice(null);
    const result = await getFirstAidAdvice(query);
    setAdvice(result.text);
    setLoading(false);
  };

  const commonTopics = [
    "Treating a burn", "CPR basics", "Sprained ankle", "Heat stroke", "Insect bites"
  ];

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3 mb-6">
        <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={20} />
        <div>
          <h4 className="font-semibold text-red-800">Emergency Disclaimer</h4>
          <p className="text-sm text-red-700">
            This AI tool provides general advice. For life-threatening emergencies, call emergency services immediately.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-h-[500px] flex flex-col">
        {/* Chat Area */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-50">
          {!advice && !loading ? (
             <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                <HeartPulse size={64} className="text-red-400 mb-4" />
                <p className="text-lg font-medium text-slate-700">First Aid Assistant</p>
                <p className="text-sm text-slate-500 mb-6">Describe the situation to get immediate guidance.</p>
                <div className="flex flex-wrap justify-center gap-2">
                    {commonTopics.map(topic => (
                        <button 
                            key={topic}
                            onClick={() => setQuery(topic)}
                            className="bg-white px-3 py-1.5 rounded-full text-sm text-slate-600 border border-slate-200 hover:border-red-300 hover:text-red-600 transition-colors"
                        >
                            {topic}
                        </button>
                    ))}
                </div>
             </div>
          ) : (
            <div className="space-y-6">
                 {/* User Query Bubble */}
                 <div className="flex justify-end">
                    <div className="bg-slate-200 text-slate-800 px-4 py-2 rounded-2xl rounded-tr-none max-w-[80%]">
                        {query}
                    </div>
                 </div>

                 {/* AI Response Bubble */}
                 <div className="flex justify-start">
                    <div className="bg-white border border-slate-200 px-6 py-4 rounded-2xl rounded-tl-none max-w-[95%] shadow-sm prose prose-sm prose-red">
                        {loading ? (
                            <div className="flex items-center gap-2 text-slate-500">
                                <Loader2 className="animate-spin" size={16} /> Analyzing...
                            </div>
                        ) : (
                            <ReactMarkdown>{advice || ''}</ReactMarkdown>
                        )}
                    </div>
                 </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
          <form onSubmit={handleAsk} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., How to treat a bee sting..."
              className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none bg-slate-50"
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-2 top-2 p-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FirstAid;
