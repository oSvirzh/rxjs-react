import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ApiService } from '@/core/services/api/api.service';
import { Credentials } from '@/shared/types/credentials.model';
import { User } from '@/shared/types/user.model';
import { AuthState } from '@/shared/types/auth-state.model';

describe('ApiService', () => {
  let apiService: ApiService;

  beforeEach(() => {
    apiService = new ApiService();
    vi.resetAllMocks();
  });

  it('should call the correct endpoint and return auth state for login', () => {
    const mockAuthState: AuthState = {
      user: { id: 1, username: 'testuser' },
      token: 'token123',
    };

    const mockResponse = {
      json: vi.fn().mockResolvedValue(mockAuthState),
    };

    vi.spyOn(window, 'fetch').mockResolvedValue(mockResponse as any);

    const credentials: Credentials = { email: 'testuser', password: 'password123' };

    apiService.login(credentials).subscribe((result) => {
      expect(result).toEqual(mockAuthState);
      expect(window.fetch).toHaveBeenCalledWith('/api/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
  });

  it('should call the correct endpoint and return user profile for getProfile', () => {
    const mockUser: User = { id: 1, username: 'testuser' };

    const mockResponse = {
      json: vi.fn().mockResolvedValue(mockUser),
    };

    vi.spyOn(window, 'fetch').mockResolvedValue(mockResponse as any);

    const token = 'token123';

    apiService.getProfile(token).subscribe((result) => {
      expect(result).toEqual(mockUser);
      expect(window.fetch).toHaveBeenCalledWith('/api/profile', {
        method: 'POST',
        body: JSON.stringify({ token }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
  });
});
