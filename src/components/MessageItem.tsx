import { Message } from '@/domain/entities/message';
import { cn } from '@/utils';

type MessageItemProps = {
  message: Message;
};

export function MessageItem(props: MessageItemProps) {
  const { message } = props;
  const isFromUser = message.from === 'user';

  return (
    <div
      className={cn({
        'text-end': isFromUser,
      })}
    >
      <div>
        <div
          className={cn('inline-block text-sm', {
            'px-4 rounded-full bg-gray-200 py-2': isFromUser,
          })}
        >
          {message.text}
        </div>
      </div>
    </div>
  );
}
