export type Message = {
  id: string;
  text: string;
  createdAt: string;
  from: 'gpt' | 'user';
};
