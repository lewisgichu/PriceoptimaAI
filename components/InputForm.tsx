import React, { useState } from 'react';
import { ProductData } from '../types';
import { Search, DollarSign, BarChart2, ShoppingBag, FileText, Sparkles, ArrowRight } from 'lucide-react';

interface InputFormProps {
  onSubmit: (data: ProductData) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<ProductData>({
    productName: 'Premium Noise Cancelling Headphones',
    currentPrice: 249.99,
    competitorPrice: 229.00,
    monthlySales: 450,
    category: 'Electronics',
    reviews: 'Great sound quality but feels a bit cheap for the price. \nBattery life is amazing. \nWay better than the competitor model. \nToo expensive, wait for a sale. \nBest headphones I have ever owned, worth every penny.',
    seasonality: 'Stable'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'currentPrice' || name === 'competitorPrice' || name === 'monthlySales' 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden h-full flex flex-col">
      <div className="p-8 border-b border-slate-100 bg-gradient-to-r from-white to-slate-50">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <Search className="w-5 h-5 text-indigo-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Analysis Parameters</h2>
        </div>
        <p className="text-sm text-slate-500">Input product metrics and market feedback to generate AI-driven pricing strategies.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-8 space-y-8 flex-1 overflow-y-auto custom-scrollbar">
        {/* Product Basics */}
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Product Details</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <ShoppingBag className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              </div>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
                className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                placeholder="e.g. Wireless Headphones"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Current Price</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <DollarSign className="h-4 w-4 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                </div>
                <input
                  type="number"
                  step="0.01"
                  name="currentPrice"
                  value={formData.currentPrice}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Competitor Price</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <DollarSign className="h-4 w-4 text-slate-400 group-focus-within:text-rose-600 transition-colors" />
                </div>
                <input
                  type="number"
                  step="0.01"
                  name="competitorPrice"
                  value={formData.competitorPrice}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all font-medium text-slate-600"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Monthly Volume</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <BarChart2 className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                  type="number"
                  name="monthlySales"
                  value={formData.monthlySales}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Market Trend</label>
              <div className="relative">
                <select
                  name="seasonality"
                  value={formData.seasonality}
                  onChange={handleChange}
                  className="block w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none"
                >
                  <option value="Stable">Stable</option>
                  <option value="High">High Season</option>
                  <option value="Low">Low Season</option>
                  <option value="Trending Up">Trending Up</option>
                  <option value="Trending Down">Trending Down</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                  <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Customer Voice & Feedback</label>
          <div className="relative group">
             <div className="absolute top-4 left-4 pointer-events-none">
                <FileText className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              </div>
            <textarea
              name="reviews"
              rows={6}
              value={formData.reviews}
              onChange={handleChange}
              required
              placeholder="Paste reviews, support tickets, or social media feedback here..."
              className="block w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm leading-relaxed resize-none"
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
            <span>Minimum 5 reviews recommended</span>
            <span>{formData.reviews.length} chars</span>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`group relative w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:-translate-y-0.5 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <>
                <Sparkles className="w-5 h-5 animate-spin" />
                <span>Processing Market Data...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                <span>Generate Strategy</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};