'use client';

import { Message } from '@/domains/entities/message';
import MessageItem from '@/features/home/components/MessageItem';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';

type FormValues = {
  text: string;
};

export default function Home() {
  const form = useForm<FormValues>();
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSubmit = (data: FormValues) => {
    const { text } = data;

    if (!text) return;

    form.reset();

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: v4(),
        text,
        createdAt: new Date().toISOString(),
        from: 'user',
      },
    ]);
  };

  return (
    <div className="max-w-[500px] m-auto h-screen p-4 pb-8">
      <div className="grid grid-rows-[auto_1fr_auto] h-full space-y-4">
        <h1 className="text-3xl font-bold">Chatbot</h1>

        <div className="space-y-2">
          {messages
            .sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime(),
            )
            .map((message) => (
              <MessageItem key={message.id} message={message} />
            ))}
        </div>

        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <input
            {...form.register('text')}
            name="text"
            className="w-full py-3 px-6 rounded-full bg-gray-100"
          />
        </form>
      </div>
    </div>
  );
}
