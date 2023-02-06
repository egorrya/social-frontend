import { Post } from '../../components/ui/PostCard/types';
import { Status } from '../../types/fetchStatus';

export interface PostsState {
  posts: Post[];
  error: unknown;
  lastPage: number | null;
  status: Status;
}
