export interface Post {
  _id: string;
  text: string;
  commentsCount: number;
  isLiked: boolean;
  likesCount: number;
  isOwnPost: boolean;
}
