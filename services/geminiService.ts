import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, ProductData, RecommendationType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzePricingStrategy = async (data: ProductData): Promise<AnalysisResult> => {
  const modelId = "gemini-2.5-flash";

  const prompt = `
    Act as a Senior Retail Pricing Strategist. Analyze the following product data to determine the optimal pricing strategy.
    
    Product Name: ${data.productName}
    Current Price: $${data.currentPrice}
    Competitor Price: $${data.competitorPrice}
    Monthly Sales Volume: ${data.monthlySales} units
    Seasonality/Trend: ${data.seasonality}
    Category: ${data.category}
    
    Customer Reviews (Raw Text):
    "${data.reviews}"
    
    Task:
    1. Analyze the sentiment regarding price (are customers complaining it's too high, or saying it's a steal?).
    2. Analyze the sentiment regarding quality (does quality justify a higher price?).
    3. Evaluate demand strength based on sales volume, seasonality, and competitor pricing.
    4. Recommend whether to INCREASE, DECREASE, or RETAIN the price.
    5. Suggest a specific new price.
    
    Logic Guide:
    - If Demand is High + Quality is High + Price Sentiment is "Good Value" -> INCREASE (Capture surplus).
    - If Demand is Low + Price Sentiment is "Too Expensive" -> DECREASE (Stimulate demand).
    - If Competitor is much lower + Quality is comparable -> DECREASE or RETAIN (Defensive).
    - If Competitor is higher + Quality is higher -> INCREASE (Premium positioning).
    
    Return the response in strictly structured JSON format.
  `;

  const response = await ai.models.generateContent({
    model: modelId,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          recommendation: {
            type: Type.STRING,
            enum: ["INCREASE", "DECREASE", "RETAIN"],
            description: "The strategic pricing recommendation."
          },
          suggestedPrice: {
            type: Type.NUMBER,
            description: "The specific recommended price point."
          },
          confidenceScore: {
            type: Type.NUMBER,
            description: "Confidence in the recommendation from 0 to 100."
          },
          reasoning: {
            type: Type.STRING,
            description: "A concise executive summary of why this recommendation was made."
          },
          metrics: {
            type: Type.OBJECT,
            properties: {
              priceSentiment: {
                type: Type.NUMBER,
                description: "Sentiment score for price from -100 (negative/expensive) to 100 (positive/value)."
              },
              qualitySentiment: {
                type: Type.NUMBER,
                description: "Sentiment score for quality from -100 (poor) to 100 (excellent)."
              },
              demandStrength: {
                type: Type.NUMBER,
                description: "Calculated demand strength from 0 (weak) to 100 (strong)."
              },
              competitorGap: {
                type: Type.NUMBER,
                description: "Percentage difference from competitor price."
              }
            },
            required: ["priceSentiment", "qualitySentiment", "demandStrength", "competitorGap"]
          },
          keyFactors: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of 3-5 key factors influencing the decision."
          }
        },
        required: ["recommendation", "suggestedPrice", "confidenceScore", "reasoning", "metrics", "keyFactors"]
      }
    }
  });

  const jsonText = response.text;
  if (!jsonText) {
    throw new Error("Failed to generate analysis.");
  }

  try {
    const result = JSON.parse(jsonText);
    // Map string enum to TypeScript Enum if necessary, though strings match directly
    return result as AnalysisResult;
  } catch (error) {
    console.error("Error parsing JSON response", error);
    throw new Error("Invalid response format from AI model.");
  }
};