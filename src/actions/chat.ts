'use server';

import { Message } from '@/domains/entities/message';
import { OPENAI_API_KEY } from '@/utils/env';
import { OpenAI } from 'openai';

const client = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export const chat = async (messages: Message[]) => {
  const chatCompletion = await client.chat.completions.create({
    messages: messages.map(({ text, from }) => ({
      role: from,
      content: text,
    })),
    model: 'gpt-4',
  });

  const { choices } = chatCompletion;
  const [{ message }] = choices;
  const { content } = message;

  return content || undefined;
};
