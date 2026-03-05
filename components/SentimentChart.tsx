import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { AnalysisResult } from '../types';

interface SentimentChartProps {
  metrics: AnalysisResult['metrics'];
}

export const SentimentChart: React.FC<SentimentChartProps> = ({ metrics }) => {
  const data = [
    {
      name: 'Price Value',
      value: metrics.priceSentiment,
      description: 'Value Perception'
    },
    {
      name: 'Quality',
      value: metrics.qualitySentiment,
      description: 'Product Quality'
    },
    {
      name: 'Demand',
      value: metrics.demandStrength, 
      description: 'Market Demand'
    },
    {
      name: 'Competitor',
      value: metrics.competitorGap,
      description: 'Price Gap %'
    }
  ];

  const getColor = (value: number, name: string) => {
      if (name === 'Competitor') return value > 0 ? '#f43f5e' : '#10b981'; // Gap > 0 means we are more expensive (Red usually), < 0 means cheaper (Green)
      if (value >= 80) return '#059669'; // Emerald 600
      if (value >= 40) return '#34d399'; // Emerald 400
      if (value >= 0) return '#60a5fa'; // Blue 400
      if (value >= -40) return '#fbbf24'; // Amber 400
      return '#f43f5e'; // Rose 500
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 text-white text-xs p-3 rounded-lg shadow-xl border border-slate-700">
          <p className="font-bold mb-1 text-slate-200">{payload[0].payload.name}</p>
          <p className="text-lg font-bold">
             {payload[0].value > 0 ? '+' : ''}{payload[0].value}
          </p>
          <p className="text-slate-400 mt-1">{payload[0].payload.description}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 40, left: 40, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
          <XAxis type="number" domain={[-100, 100]} hide />
          <YAxis 
            type="category" 
            dataKey="name" 
            width={80} 
            tick={{fontSize: 11, fill: '#64748b', fontWeight: 600}} 
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{fill: '#f1f5f9', radius: 4}} />
          <ReferenceLine x={0} stroke="#94a3b8" strokeWidth={2} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
             {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.value, entry.name)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-between text-[10px] font-bold text-slate-400 px-12 mt-2 uppercase tracking-wider">
        <span>Negative</span>
        <span>Neutral</span>
        <span>Positive</span>
      </div>
    </div>
  );
};