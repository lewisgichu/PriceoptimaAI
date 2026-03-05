import React from 'react';
import { TrendingUp, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-violet-500 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-900/20">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                PriceOptima <span className="text-indigo-400">AI</span>
              </h1>
              <p className="text-xs text-slate-400 font-medium tracking-wide">Retail Intelligence Engine</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Powered by Gemini 2.5</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                 <p className="text-sm font-medium text-white">Michael K.</p>
                 <p className="text-xs text-slate-400">Senior Strategist</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px]">
                <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-xs border-2 border-transparent">
                  MK
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};