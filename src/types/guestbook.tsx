export interface GuestbookEntry {
  _id?: string;
  userId: string;
  username: string;
  avatar: string;
  provider: 'google' | 'github' | 'discord';
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  _id?: string;
  userId: string;
  username: string;
  email: string;
  avatar: string;
  provider: 'google' | 'github' | 'discord';
  createdAt: Date;
}