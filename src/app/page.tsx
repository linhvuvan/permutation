'use client';

import { Message } from '@/domains/entities/message';
import { MessageItem } from '@/components/MessageItem';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';
import { chat } from '@/actions/chat';

type FormValues = {
  text: string;
};

export default function Home() {
  const form = useForm<FormValues>();
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSubmit = async (data: FormValues) => {
    const { text } = data;

    if (!text || form.formState.isSubmitting) return;

    form.resetField('text');

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: v4(),
        text,
        createdAt: new Date().toISOString(),
        from: 'user',
      },
    ]);

    const res = await chat(text);
    const content = res.data;

    if (content) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: v4(),
          text: content,
          createdAt: new Date().toISOString(),
          from: 'gpt',
        },
      ]);
    }
  };

  return (
    <div className="space-y-4 grid grid-rows-[1fr_auto] h-screen">
      <div className="overflow-auto">
        <div className="max-w-[500px] w-full mx-auto space-y-2 p-8">
          <div className="text-sm">
            Hi! I&apos;m ChatGPT. How can I help you today?
          </div>
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
          {form.formState.isSubmitting && (
            <div className="text-sm">Loading...</div>
          )}
        </div>
      </div>

      {JSON.stringify(form.formState.isSubmitting)}

      <form
        className="max-w-[500px] w-full p-8 pt-0 mx-auto"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <input
          {...form.register('text')}
          name="text"
          placeholder="Message ChatGPT"
          className="py-3 px-6 rounded-full w-full bg-gray-100"
        />
      </form>
    </div>
  );
}
