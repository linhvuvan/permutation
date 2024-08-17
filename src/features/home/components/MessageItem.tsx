import { Message } from '@/app/page';
import { cn } from '@/utils';

type MessageItemProps = {
  message: Message;
};

export default function MessageItem(props: MessageItemProps) {
  const { message } = props;
  const isFromUser = message.from === 'user';

  return (
    <div
      key={message.id}
      className={cn({
        'text-end': isFromUser,
      })}
    >
      <div>
        <div
          className={cn('inline-block py-2 px-4', {
            'rounded-full bg-gray-200': isFromUser,
          })}
        >
          {message.text}
        </div>
      </div>
    </div>
  );
}
