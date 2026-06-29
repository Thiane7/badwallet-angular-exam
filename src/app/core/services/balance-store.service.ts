import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BalanceStoreService {
  readonly currentPhone = signal<string>('');
  readonly balance = signal<number>(0);

  constructor() { }

  refreshBalance(): void {
    // Placeholder: can be expanded later to notify the app-wide balance state.
  }

  setCurrentPhone(phone: string): void {
    this.currentPhone.set(phone);
  }

  setBalance(value: number): void {
    this.balance.set(value);
  }
}
