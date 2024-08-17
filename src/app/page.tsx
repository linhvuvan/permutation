'use client';

import { Message } from '@/domain/entities/message';
import { MessageItem } from '@/components/MessageItem';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';
import { chat } from '@/actions/chat';

type FormValues = {
  text: string;
};

export const maxDuration = 60; // Applies to the actions

export default function Home() {
  const form = useForm<FormValues>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSubmit = async (data: FormValues) => {
    const { text } = data;

    if (!text || !text.trim() || isLoading) return;

    form.resetField('text');

    const newMessages: Message[] = [
      ...messages,
      {
        id: v4(),
        text,
        from: 'user',
      },
    ];
    setMessages(newMessages);
    setIsLoading(true);
    scrollToBottom();

    const res = await chat(newMessages);
    const message =
      res?.data || 'Sorry, We are unable to process your request.';

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: v4(),
        text: message,
        from: 'assistant',
      },
    ]);

    setIsLoading(false);
    scrollToBottom();
  };

  return (
    <>
      <div className="max-w-[550px] w-full mx-auto space-y-2 p-8 pb-28">
        <div className="text-sm">
          Hi! I&apos;m ChatGPT. How can I help you today?
        </div>
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
        {isLoading && <div className="text-sm">Loading...</div>}
        <div ref={ref} />
      </div>

      <div className="fixed bottom-0 w-full bg-white">
        <form
          className="max-w-[550px] m-auto p-8"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <input
            {...form.register('text')}
            name="text"
            autoFocus
            placeholder="Message ChatGPT"
            className="text-sm py-3 px-6 rounded-full w-full bg-gray-100"
          />
        </form>
      </div>
    </>
  );
}
