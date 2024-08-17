'use client';

import { Message } from '@/domains/entities/message';
import { MessageItem } from '@/components/MessageItem';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';
import { chat } from '@/actions/chat';

type FormValues = {
  text: string;
};

export default function Home() {
  const form = useForm<FormValues>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (data: FormValues) => {
    const { text } = data;

    if (!text || isLoading) return;

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
    setTimeout(scrollToBottom, 100);

    const res = await chat(newMessages);
    const message = res.data || 'Sorry, We are unable to process your request.';

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: v4(),
        text: message,
        from: 'assistant',
      },
    ]);

    setIsLoading(false);
    setTimeout(scrollToBottom, 100);
  };

  return (
    <div className="space-y-4 grid grid-rows-[1fr_auto] h-screen">
      <div className="overflow-auto">
        <div className="max-w-[550px] w-full mx-auto space-y-2 p-8">
          <div className="text-sm">
            Hi! I&apos;m ChatGPT. How can I help you today?
          </div>
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
          {isLoading && <div className="text-sm">Loading...</div>}
          <div ref={ref} />
        </div>
      </div>

      <form
        className="max-w-[550px] w-full p-8 pt-0 mx-auto"
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
  );
}
