
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
}

export interface Client {
  id: string;
  username: string;
}