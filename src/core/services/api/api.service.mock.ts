import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { injectable } from 'tsyringe';
import { IApiService } from '@/core/services/api/api.model';
import { User } from '@/shared/types/user.model';
import { Credentials } from '@/shared/types/credentials.model';
import { AuthState } from '@/shared/types/auth-state.model';

@injectable()
export class ApiServiceMock implements IApiService {
  login(credentials: Credentials): Observable<AuthState> {
    return new Observable<AuthState>((observer) => {
      setTimeout(() => {
        if (credentials.email === 'test@example.com' && credentials.password === 'password') {
          observer.next({ user: { id: 2, username: 'TEST' } as User, token: 'valid-token' });
          observer.complete();
        } else {
          observer.error(new Error('Invalid credentials'));
        }
      }, 1000);
    }).pipe(catchError((error) => throwError(() => error)));
  }

  getProfile(token: string): Observable<User> {
    return new Observable<User>((observer) => {
      setTimeout(() => {
        if (token === 'valid-token') {
          observer.next({ id: 2, username: 'TEST' });
          observer.complete();
        } else {
          observer.error(new Error('Invalid token'));
        }
      }, 1000);
    }).pipe(catchError((error) => throwError(() => error)));
  }
}
