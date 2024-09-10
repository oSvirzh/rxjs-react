import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { LocalStorageService } from './local-storage.service';

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    length: 0,
    key: vi.fn((index: number) => {
      const keys = Object.keys(store);
      return keys[index] || null;
    }),
  };
})();

globalThis.localStorage = localStorageMock;

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    service = new LocalStorageService();
  });

  afterEach(() => {
    localStorageMock.clear();
  });

  it('should initialize with no data', () => {
    expect(service.getItem('key')).toBeNull();
  });

  it('should set and get items correctly', () => {
    const testData = { foo: 'bar' };
    service.setItem('key', testData);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('key', JSON.stringify(testData));
    expect(service.getItem('key')).toEqual(testData);
    service.getItem$('key').subscribe((value) => {
      expect(value).toEqual(testData);
    });
  });

  it('should remove items correctly', () => {
    service.setItem('key', { foo: 'bar' });
    service.removeItem('key');
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('key');
    expect(service.getItem('key')).toBeNull();
  });

  it('should handle errors when parsing JSON', () => {
    localStorageMock.setItem('key', '{invalidJson');
    expect(service.getItem('key')).toBeNull();
  });
});
