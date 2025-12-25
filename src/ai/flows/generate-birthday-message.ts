'use server';

import Groq from 'groq-sdk';

export type GenerateBirthdayMessageInput = {
  userInput: string;
  wisherName: string;
};

export type GenerateBirthdayMessageOutput = {
  message: string;
};

export async function generateBirthdayMessage(
  input: GenerateBirthdayMessageInput
): Promise<GenerateBirthdayMessageOutput> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error('GROQ_API_KEY is not configured');
  }

  const groq = new Groq({ apiKey });

  const prompt = `You are a helpful assistant that crafts personalized birthday messages.

Create a heartfelt birthday message for Justious Samura Dumbuya based on the user's input, expressing joy and gratitude.
This message is from ${input.wisherName}. Please incorporate their name naturally into the message, for example, as part of a closing like "Warmly, ${input.wisherName}" or "Best wishes from ${input.wisherName}".

User Input: ${input.userInput}

Return only the birthday message, nothing else.`;

  const response = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: [{ role: 'user', content: prompt }],
  });

  const message = response.choices[0]?.message?.content || 'Happy Birthday!';

  return { message };
}
