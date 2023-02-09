export interface Post {
  _id: string;
  text: string;
  post_likes: any[];
  post_comments: any[];
  isLiked: boolean;
  likesCount: number;
  isOwnPost: boolean;
}
