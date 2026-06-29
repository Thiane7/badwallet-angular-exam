import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wallet, Transaction } from '../models/wallet.model';

@Injectable({
  providedIn: 'root'
})
export class WalletApiService {
  private readonly BASE_URL = 'http://localhost:8080/api/wallets'; // [cite: 7, 174]

  constructor(private http: HttpClient) {} // [cite: 175]

  // 1.1 Seeder la base de données
  seedDatabase(numWallets: number, eventsPerWallet: number): Observable<string> {
    return this.http.post(`${this.BASE_URL}/seed?numWallets=${numWallets}&eventsPerWallet=${eventsPerWallet}`, {}, { responseType: 'text' }); // [cite: 13]
  }

  // 1.2 Créer un nouveau portefeuille
  createWallet(wallet: Wallet): Observable<Wallet> {
    return this.http.post<Wallet>(this.BASE_URL, wallet); // [cite: 16]
  }

  // 1.3 Lister tous les portefeuilles (Paginé)
  getWallets(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}?page=${page}&size=${size}`); // [cite: 26]
  }

  // 1.4 Consulter un portefeuille par numéro de téléphone
  getWalletByPhone(phone: string): Observable<Wallet> {
    return this.http.get<Wallet>(`${this.BASE_URL}/${phone}`); // [cite: 29]
  }

  // 1.5 Consulter uniquement le solde à jour
  getBalance(phone: string): Observable<number> {
    return this.http.get<number>(`${this.BASE_URL}/${phone}/balance`); // [cite: 32, 177]
  }

  // 1.6 Effectuer un Dépôt
  deposit(walletId: number, amount: number, paymentMethod: string): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/${walletId}/deposit`, { amount, paymentMethod }); // [cite: 35]
  }

  // 1.7 Effectuer un Retrait
  withdraw(payload: { phoneNumber: string; amount: number }): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/withdraw`, payload); // [cite: 42]
  }

  // 1.8 Effectuer un Transfert entre deux portefeuilles
  transfer(payload: { senderPhone: string; receiverPhone: string; amount: number }): Observable<void> {
    return this.http.post<void>(`${this.BASE_URL}/transfer`, payload); // [cite: 49, 180]
  }

  // 1.9 Payer une facture globale du mois en cours
  payService(payload: { phoneNumber: string; serviceName: string; amount: number }): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/pay`, payload); // [cite: 57]
  }

  // 1.10 Payer des factures spécifiques cochées
  paySpecificFactures(payload: { phoneNumber: string; serviceName: string; factureReferences: string[] }): Observable<string> {
    return this.http.post(`${this.BASE_URL}/pay-factures`, payload, { responseType: 'text' }); // [cite: 65]
  }

  // 1.11 Consulter l'historique des transactions par téléphone
  getTransactionHistory(phone: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.BASE_URL}/${phone}/transactions`); // [cite: 73]
  }
}