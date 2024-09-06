import { Observable } from 'rxjs';
import { Credentials } from '@/shared/types/credentials.model';
import { AuthState } from '@/shared/types/auth-state.model';
import { User } from '@/shared/types/user.model';

export interface IApiService {
  login(credentials: Credentials): Observable<AuthState>;

  getProfile(token: string): Observable<User>;
}
