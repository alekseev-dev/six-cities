import { UserData } from './user-data';

export type Comments = Comment[];

export type Comment = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: CommentedUser;
}

  type CommentedUser = Omit<UserData, 'email' | 'token'>
