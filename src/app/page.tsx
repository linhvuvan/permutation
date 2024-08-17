import MessageItem from '@/features/home/components/MessageItem';

export type Message = {
  id: string;
  text: string;
  createdAt: string;
  from: 'gpt' | 'user';
};

export default function Home() {
  const messages: Message[] = [
    {
      id: '1',
      text: 'Hello!',
      createdAt: '2021-10-02T00:00:00Z',
      from: 'gpt',
    },
    {
      id: '2',
      text: 'Hi!',
      createdAt: '2021-10-01T00:00:01Z',
      from: 'user',
    },
  ];

  return (
    <div className="max-w-[500px] m-auto h-screen p-4 pb-8">
      <div className="grid grid-rows-[auto_1fr_auto] h-full space-y-4">
        <h1 className="text-3xl font-bold">Chatbot</h1>

        <div>
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

        <div>Input</div>
      </div>
    </div>
  );
}
