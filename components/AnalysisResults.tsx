import React from 'react';
import { AnalysisResult, ProductData, RecommendationType } from '../types';
import { SentimentChart } from './SentimentChart';
import { ArrowUpRight, ArrowDownRight, Minus, CheckCircle2, BrainCircuit, LineChart, Target, AlertCircle } from 'lucide-react';

interface AnalysisResultsProps {
  result: AnalysisResult;
  productData: ProductData;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result, productData }) => {
  
  const getTheme = (rec: RecommendationType) => {
    switch (rec) {
      case RecommendationType.INCREASE: 
        return {
          gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600',
          text: 'text-emerald-700',
          bgLight: 'bg-emerald-50',
          border: 'border-emerald-100',
          icon: <ArrowUpRight className="h-10 w-10 text-white" />,
          shadow: 'shadow-emerald-500/20'
        };
      case RecommendationType.DECREASE: 
        return {
          gradient: 'bg-gradient-to-br from-rose-500 to-orange-600',
          text: 'text-rose-700',
          bgLight: 'bg-rose-50',
          border: 'border-rose-100',
          icon: <ArrowDownRight className="h-10 w-10 text-white" />,
          shadow: 'shadow-rose-500/20'
        };
      case RecommendationType.RETAIN: 
        return {
          gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600',
          text: 'text-blue-700',
          bgLight: 'bg-blue-50',
          border: 'border-blue-100',
          icon: <Minus className="h-10 w-10 text-white" />,
          shadow: 'shadow-blue-500/20'
        };
      default: return { gradient: '', text: '', bgLight: '', border: '', icon: null, shadow: '' };
    }
  };

  const theme = getTheme(result.recommendation);
  const priceDiff = result.suggestedPrice - productData.currentPrice;
  const percentDiff = (priceDiff / productData.currentPrice) * 100;
  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="space-y-6 h-full flex flex-col">
      
      {/* Hero Recommendation Card */}
      <div className={`rounded-3xl p-8 text-white shadow-xl ${theme.shadow} ${theme.gradient} relative overflow-hidden`}>
        {/* Background decorative circles */}
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-black opacity-10 rounded-full blur-2xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-6">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl shadow-inner border border-white/10">
              {theme.icon}
            </div>
            <div>
              <p className="text-white/80 font-medium text-sm uppercase tracking-wider mb-1">Strategic Recommendation</p>
              <h2 className="text-4xl font-bold tracking-tight">{result.recommendation} PRICE</h2>
              <p className="mt-2 text-white/90 opacity-90 max-w-lg leading-relaxed">
                {result.reasoning.split('.')[0]}.
              </p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 min-w-[220px]">
            <div className="flex justify-between items-end mb-1">
              <span className="text-sm font-medium text-white/70">Target Price</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${priceDiff >= 0 ? 'bg-emerald-400/20 text-emerald-100' : 'bg-rose-400/20 text-rose-100'}`}>
                {priceDiff > 0 ? '+' : ''}{percentDiff.toFixed(1)}%
              </span>
            </div>
            <div className="text-4xl font-extrabold tracking-tight">
              {formatCurrency(result.suggestedPrice)}
            </div>
            <div className="text-xs text-white/60 mt-2 flex justify-between">
              <span>Current: {formatCurrency(productData.currentPrice)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        
        {/* Left Col: Analysis Details (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Detailed Reasoning */}
          <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <BrainCircuit className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-bold text-slate-900">AI Analysis Logic</h3>
            </div>
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 text-slate-700 leading-relaxed text-sm">
               {result.reasoning}
            </div>
          </div>

          {/* Key Factors */}
          <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-bold text-slate-900">Key Drivers</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {result.keyFactors.map((factor, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 transition-colors hover:bg-indigo-50 hover:border-indigo-100 group">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500 mt-0.5 shrink-0 group-hover:text-indigo-600" />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-900">{factor}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className={`rounded-2xl p-4 border ${theme.border} ${theme.bgLight} flex flex-col items-center text-center`}>
              <span className={`text-xs font-bold uppercase ${theme.text} opacity-70`}>Competitor Gap</span>
              <span className={`text-xl font-extrabold ${theme.text} mt-1`}>
                 {result.metrics.competitorGap > 0 ? '+' : ''}{result.metrics.competitorGap}%
              </span>
            </div>
             <div className={`rounded-2xl p-4 border border-slate-100 bg-white flex flex-col items-center text-center shadow-sm`}>
              <span className="text-xs font-bold uppercase text-slate-500">Demand</span>
              <span className="text-xl font-extrabold text-slate-800 mt-1">
                 {result.metrics.demandStrength}/100
              </span>
            </div>
             <div className={`rounded-2xl p-4 border border-slate-100 bg-white flex flex-col items-center text-center shadow-sm`}>
              <span className="text-xs font-bold uppercase text-slate-500">Confidence</span>
              <span className="text-xl font-extrabold text-indigo-600 mt-1">
                 {result.confidenceScore}%
              </span>
            </div>
          </div>
        </div>

        {/* Right Col: Sentiment Viz (5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 h-full">
             <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <LineChart className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-slate-900">Sentiment Radar</h3>
              </div>
             </div>
             
             <div className="flex-1 flex flex-col justify-center">
               <SentimentChart metrics={result.metrics} />
             </div>

             <div className="mt-6 space-y-3">
                <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                  <span className="text-slate-500">Price Perception</span>
                  <span className={`font-bold ${result.metrics.priceSentiment > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {result.metrics.priceSentiment > 0 ? 'Good Value' : 'Expensive'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                  <span className="text-slate-500">Quality Score</span>
                  <span className={`font-bold ${result.metrics.qualitySentiment > 50 ? 'text-emerald-600' : 'text-slate-700'}`}>
                    {result.metrics.qualitySentiment > 75 ? 'Excellent' : result.metrics.qualitySentiment > 25 ? 'Good' : 'Average'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                   <div className="flex items-center gap-1.5 text-slate-500">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Confidence</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500" style={{width: `${result.confidenceScore}%`}}></div>
                      </div>
                      <span className="font-bold text-indigo-600">{result.confidenceScore}%</span>
                   </div>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};