'use server';

/**
 * @fileOverview A golf score estimation AI agent.
 *
 * - estimateGolfScore - A function that handles the golf score estimation process.
 * - EstimateGolfScoreInput - The input type for the estimateGolfScore function.
 * - EstimateGolfScoreOutput - The return type for the estimateGolfScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EstimateGolfScoreInputSchema = z.object({
  playerHistory: z
    .string()
    .describe('The historical golf scores of the player.'),
  holeDifficulty: z.string().describe('The difficulty level of the golf hole.'),
  weather: z.string().describe('The weather conditions during the game.'),
});
export type EstimateGolfScoreInput = z.infer<typeof EstimateGolfScoreInputSchema>;

const EstimateGolfScoreOutputSchema = z.object({
  estimatedScore: z.number().describe('The estimated golf score for the player.'),
  reasoning: z.string().describe('The reasoning behind the estimated score.'),
});
export type EstimateGolfScoreOutput = z.infer<typeof EstimateGolfScoreOutputSchema>;

export async function estimateGolfScore(input: EstimateGolfScoreInput): Promise<EstimateGolfScoreOutput> {
  return estimateGolfScoreFlow(input);
}

const prompt = ai.definePrompt({
  name: 'estimateGolfScorePrompt',
  input: {schema: EstimateGolfScoreInputSchema},
  output: {schema: EstimateGolfScoreOutputSchema},
  prompt: `You are an expert golf score estimator.

You will use the player's history, hole difficulty, and weather conditions to estimate their golf score.

Player History: {{{playerHistory}}}
Hole Difficulty: {{{holeDifficulty}}}
Weather: {{{weather}}}

Estimate the golf score and provide a brief reasoning for your estimation.
`,
});

const estimateGolfScoreFlow = ai.defineFlow(
  {
    name: 'estimateGolfScoreFlow',
    inputSchema: EstimateGolfScoreInputSchema,
    outputSchema: EstimateGolfScoreOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
