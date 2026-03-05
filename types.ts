export enum RecommendationType {
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
  RETAIN = 'RETAIN'
}

export interface ProductData {
  productName: string;
  currentPrice: number;
  competitorPrice: number;
  monthlySales: number;
  category: string;
  reviews: string; // Raw text of reviews
  seasonality: string; // e.g., "High", "Low", "Stable"
}

export interface AnalysisResult {
  recommendation: RecommendationType;
  suggestedPrice: number;
  confidenceScore: number; // 0-100
  reasoning: string;
  metrics: {
    priceSentiment: number; // -100 (Too Expensive) to 100 (Great Value)
    qualitySentiment: number; // -100 (Poor) to 100 (Excellent)
    demandStrength: number; // 0 (Weak) to 100 (Strong)
    competitorGap: number; // Difference percentage
  };
  keyFactors: string[];
}