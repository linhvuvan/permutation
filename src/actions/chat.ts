'use server';

import { OPENAI_API_KEY } from '@/utils/env';
import { OpenAI } from 'openai';

const client = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export const chat = async (text: string) => {
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [{ role: 'user', content: text }],
      model: 'gpt-4',
    });

    const { choices } = chatCompletion;
    const [{ message }] = choices;
    const { content } = message;

    return {
      data: content || undefined,
    };
  } catch {
    return {
      error: 'An error occurred while processing the request',
    };
  }
};
