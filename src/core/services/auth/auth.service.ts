import { BehaviorSubject, from, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { inject, singleton } from 'tsyringe';
import { LocalStorageService } from '@/core/services/local-storage/local-storage.service';
import type { IApiService } from '@/core/services/api/api.model';
import { Credentials } from '@/shared/types/credentials.model';
import { ApiServiceToken } from '@/core/services/api/api.token';
import { User } from '@/shared/types/user.model';

@singleton()
export class AuthService {
  private readonly AUTH_TOKEN_KEY = 'token';
  private authStatusSubject = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<User | null>(null);
  private authErrorSubject = new BehaviorSubject<string | null>(null);

  constructor(
    @inject(ApiServiceToken) private apiService: IApiService,
    @inject(LocalStorageService) private localStorage: LocalStorageService,
  ) {
    const initialToken = this.localStorage.getItem(this.AUTH_TOKEN_KEY);
    this.refreshUserByToken(initialToken);
  }

  get authStatus$() {
    return this.authStatusSubject.asObservable();
  }

  get authError$() {
    return this.authErrorSubject.asObservable();
  }

  get user$() {
    return this.userSubject.asObservable();
  }

  private refreshUserByToken(token: string) {
    from(this.apiService.getProfile(token))
      .pipe(
        tap((response) => {
          this.authStatusSubject.next(true);
          this.userSubject.next(response);
          this.authErrorSubject.next(null);
        }),
        catchError((error) => {
          this.resetState();
          return throwError(() => new Error(error.message));
        }),
      )
      .subscribe();
  }

  private resetState() {
    this.authStatusSubject.next(false);
    this.userSubject.next(null);
    this.localStorage.removeItem(this.AUTH_TOKEN_KEY);
  }

  login(credentials: Credentials) {
    from(this.apiService.login(credentials))
      .pipe(
        tap((response) => {
          this.authStatusSubject.next(true);
          this.userSubject.next(response.user);
          this.localStorage.setItem(this.AUTH_TOKEN_KEY, response.token);
          this.authErrorSubject.next(null);
        }),
        catchError((error) => {
          this.resetState();
          this.authErrorSubject.next(error.message);
          return throwError(() => new Error(error.message));
        }),
      )
      .subscribe();
  }

  logout() {
    this.resetState();
  }
}
