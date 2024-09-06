import { from, Observable, switchMap } from 'rxjs';
import { injectable } from 'tsyringe';
import { IApiService } from '@/core/services/api/api.model';
import { Credentials } from '@/shared/types/credentials.model';
import { AuthState } from '@/shared/types/auth-state.model';
import { User } from '@/shared/types/user.model';

@injectable()
export class ApiService implements IApiService {
  protected get<T>(url: string): Observable<T> {
    return from(window.fetch(url)).pipe(switchMap((response) => from(response.json())));
  }

  protected post<TResponse, TBody extends object>(url: string, body: TBody): Observable<TResponse> {
    return from(
      window.fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    ).pipe(switchMap((response) => from(response.json())));
  }

  login(credentials: Credentials): Observable<AuthState> {
    return this.post('/api/login', credentials);
  }

  getProfile(token: string): Observable<User> {
    return this.post('/api/profile', { token });
  }
}
