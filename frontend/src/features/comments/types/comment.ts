export interface Comment {
  id: number;
  body: string;
  user: {
    username: string;
  };
  reply_count: number;
  like_count: number;
  liked_by_user?: boolean;
  created_at: string;
  updated_at: string;
}
