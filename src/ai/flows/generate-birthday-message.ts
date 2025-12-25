'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

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
  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('GOOGLE_GENAI_API_KEY is not configured');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `You are a helpful assistant that crafts personalized birthday messages.

Create a heartfelt birthday message for Justious Samura Dumbuya based on the user's input, expressing joy and gratitude.
This message is from ${input.wisherName}. Please incorporate their name naturally into the message, for example, as part of a closing like "Warmly, ${input.wisherName}" or "Best wishes from ${input.wisherName}".

User Input: ${input.userInput}

Return only the birthday message, nothing else.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const message = response.text();

  return { message };
}
