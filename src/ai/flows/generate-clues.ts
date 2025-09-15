'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating clues for puzzles in an escape room.
 *
 * The flow takes a description of the room and the puzzle the user needs a hint for, and generates a helpful clue.
 *
 * @param {GenerateClueInput} input - The input to the flow, containing the room description and puzzle information.
 * @returns {Promise<GenerateClueOutput>} - A promise that resolves to the generated clue.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the flow.
const GenerateClueInputSchema = z.object({
  roomDescription: z.string().describe('A detailed description of the escape room, including its theme, layout, and key features.'),
  puzzleDescription: z.string().describe('A description of the specific puzzle for which a clue is needed, including its mechanics and current state.'),
});

export type GenerateClueInput = z.infer<typeof GenerateClueInputSchema>;

// Define the output schema for the flow.
const GenerateClueOutputSchema = z.object({
  clue: z.string().describe('A helpful and contextually relevant clue for the puzzle.'),
});

export type GenerateClueOutput = z.infer<typeof GenerateClueOutputSchema>;

// Define the main function that calls the flow.
export async function generateClue(input: GenerateClueInput): Promise<GenerateClueOutput> {
  return generateClueFlow(input);
}

// Define the prompt for generating the clue.
const generateCluePrompt = ai.definePrompt({
  name: 'generateCluePrompt',
  input: {schema: GenerateClueInputSchema},
  output: {schema: GenerateClueOutputSchema},
  prompt: `You are an expert escape room clue generator.

  Your task is to provide a helpful clue for a player stuck on a puzzle.

  The clue should be contextually relevant to the room and the specific puzzle.

  Here is information about the room and puzzle:

  Room Description: {{{roomDescription}}}
  Puzzle Description: {{{puzzleDescription}}}

  Generate a clue that will help the player make progress without giving away the solution directly.`,
});

// Define the Genkit flow.
const generateClueFlow = ai.defineFlow(
  {
    name: 'generateClueFlow',
    inputSchema: GenerateClueInputSchema,
    outputSchema: GenerateClueOutputSchema,
  },
  async input => {
    const {output} = await generateCluePrompt(input);
    return output!;
  }
);
