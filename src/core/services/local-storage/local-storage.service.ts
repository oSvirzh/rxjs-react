import { injectable } from 'tsyringe';
import { BehaviorSubject, map, Observable } from 'rxjs';

@injectable()
export class LocalStorageService {
  private storageSubject: BehaviorSubject<Record<string, any>>;

  constructor() {
    const initialData = this.loadInitialData();
    this.storageSubject = new BehaviorSubject(initialData);
  }

  private loadInitialData(): Record<string, any> {
    const data: Record<string, any> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        data[key] = this.getItem(key);
      }
    }
    return data;
  }

  getItem$(key: string): Observable<any> {
    return this.storageSubject.asObservable().pipe(map((storage) => storage[key]));
  }

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    try {
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error parsing localStorage item', error);
      return null;
    }
  }

  setItem(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
      const newStorage = { ...this.storageSubject.getValue(), [key]: value };
      this.storageSubject.next(newStorage);
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
    const newStorage = { ...this.storageSubject.getValue() };
    delete newStorage[key];
    this.storageSubject.next(newStorage);
  }
}
