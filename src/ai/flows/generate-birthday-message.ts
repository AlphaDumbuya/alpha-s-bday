
'use server';

/**
 * @fileOverview AI flow to generate personalized birthday messages for Alpha.
 *
 * - generateBirthdayMessage - A function that generates a personalized birthday message.
 * - GenerateBirthdayMessageInput - The input type for the generateBirthdayMessage function.
 * - GenerateBirthdayMessageOutput - The return type for the generateBirthdayMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBirthdayMessageInputSchema = z.object({
  userInput: z
    .string()
    .describe(
      'User input describing the feelings of joy and gratitude to express in the birthday message.'
    ),
  wisherName: z
    .string()
    .describe("The name of the person sending the birthday wishes."),
});
export type GenerateBirthdayMessageInput = z.infer<typeof GenerateBirthdayMessageInputSchema>;

const GenerateBirthdayMessageOutputSchema = z.object({
  message: z.string().describe('The personalized birthday message for Alpha.'),
});
export type GenerateBirthdayMessageOutput = z.infer<typeof GenerateBirthdayMessageOutputSchema>;

export async function generateBirthdayMessage(
  input: GenerateBirthdayMessageInput
): Promise<GenerateBirthdayMessageOutput> {
  return generateBirthdayMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBirthdayMessagePrompt',
  input: {schema: GenerateBirthdayMessageInputSchema},
  output: {schema: GenerateBirthdayMessageOutputSchema},
  prompt: `You are a helpful assistant that crafts personalized birthday messages.

  Create a heartfelt birthday message for Alpha based on the user's input, expressing joy and gratitude.
  This message is from {{{wisherName}}}. Please incorporate their name naturally into the message, for example, as part of a closing like "Warmly, {{{wisherName}}}" or "Best wishes from {{{wisherName}}}".

  User Input: {{{userInput}}}`,
});

const generateBirthdayMessageFlow = ai.defineFlow(
  {
    name: 'generateBirthdayMessageFlow',
    inputSchema: GenerateBirthdayMessageInputSchema,
    outputSchema: GenerateBirthdayMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
