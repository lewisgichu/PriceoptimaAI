import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { AnalysisResults } from './components/AnalysisResults';
import { ProductData, AnalysisResult } from './types';
import { analyzePricingStrategy } from './services/geminiService';
import { LayoutDashboard, LineChart } from 'lucide-react';

const App: React.FC = () => {
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async (data: ProductData) => {
    setLoading(true);
    setError(null);
    setProductData(data);
    setAnalysisResult(null); // Clear previous results

    try {
      const result = await analyzePricingStrategy(data);
      setAnalysisResult(result);
    } catch (err: any) {
      setError(err.message || "An error occurred during analysis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-inter">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {error && (
          <div className="mb-8 bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-center gap-3 text-rose-700 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 h-full">
          
          {/* Input Section - Takes up 4 columns on large screens */}
          <div className="xl:col-span-4 h-full">
            <div className="sticky top-24">
               <InputForm onSubmit={handleAnalysis} isLoading={loading} />
            </div>
          </div>

          {/* Results Section - Takes up 8 columns on large screens */}
          <div className="xl:col-span-8">
            {analysisResult && productData ? (
              <AnalysisResults result={analysisResult} productData={productData} />
            ) : (
              // Empty State
              <div className="h-full min-h-[600px] bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center justify-center text-center p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-slate-50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
                
                <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-8 shadow-inner">
                  <LineChart className="h-12 w-12 text-indigo-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Intelligent Pricing Engine</h3>
                <p className="text-slate-500 max-w-md mt-4 leading-relaxed text-lg">
                  Enter your product data and market feedback to unlock AI-driven pricing strategies optimized for revenue and growth.
                </p>
                
                <div className="mt-12 grid grid-cols-3 gap-6 w-full max-w-lg opacity-30 grayscale blur-[1px] select-none pointer-events-none">
                   <div className="bg-slate-100 rounded-lg h-32 w-full animate-pulse"></div>
                   <div className="bg-slate-100 rounded-lg h-32 w-full animate-pulse delay-75"></div>
                   <div className="bg-slate-100 rounded-lg h-32 w-full animate-pulse delay-150"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
             <div className="h-6 w-6 bg-slate-900 rounded-md"></div>
             <p className="text-sm font-semibold text-slate-700">PriceOptima AI</p>
          </div>
          <p className="text-sm text-slate-500">&copy; 2024 PriceOptima AI. Enterprise Retail Solutions.</p>
          <div className="flex space-x-6 text-sm font-medium text-slate-500">
             <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
             <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
             <a href="#" className="hover:text-indigo-600 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;