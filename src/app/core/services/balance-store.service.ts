import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BalanceStoreService {
  constructor() { }

  refreshBalance(): void {
    // Placeholder: can be expanded later to notify the app-wide balance state.
  }
}
