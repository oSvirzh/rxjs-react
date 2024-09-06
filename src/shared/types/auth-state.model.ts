import { User } from '@/shared/types/user.model';

export interface AuthState {
  user: User;
  token: string;
}
