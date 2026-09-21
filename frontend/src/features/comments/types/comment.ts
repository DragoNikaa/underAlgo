export interface Comment {
  id: number;
  body: string;
  user: User;
  reply_count: number;
  like_count: number;
  liked_by_user?: boolean;
  created_at: string;
  updated_at: string;
}

interface User {
  id: number;
  username: string;
}
