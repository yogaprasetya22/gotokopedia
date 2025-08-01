import { User } from "./user-auth-type";

export type Comment = {
  id: number;
  content: string;
  rating: number;
  user_id: number;
  product_id: number;
  created_at: Date;
  updated_at: Date;
  user: User;
};

export type MetaComment = {
  total: number;
  total_page: number;
  limit: number;
  offset: number;
  comment: Comment[];
};

export type CommentData ={
    comment: string;
    rating: number;
}