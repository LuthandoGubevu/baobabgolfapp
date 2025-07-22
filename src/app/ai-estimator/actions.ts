'use server';

import { estimateGolfScore, EstimateGolfScoreInput, EstimateGolfScoreOutput } from '@/ai/flows/estimate-golf-score';

export async function handleEstimateScore(input: EstimateGolfScoreInput): Promise<EstimateGolfScoreOutput> {
  try {
    const result = await estimateGolfScore(input);
    return result;
  } catch (error) {
    console.error("Error in handleEstimateScore server action:", error);
    throw new Error("Failed to get an estimation from the AI.");
  }
}
