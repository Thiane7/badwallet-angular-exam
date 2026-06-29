import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facture } from '../models/wallet.model';

@Injectable({
  providedIn: 'root'
})
export class BillingApiService {
  private readonly BASE_URL = 'http://localhost:8080/api/external/factures'; // [cite: 7, 79]

  constructor(private http: HttpClient) {}

  // 2.2 & 2.3 Consulter les factures impayées du mois en cours (avec ou sans filtre d'unité)
  getFacturesDuMois(walletCode: string, unite?: string): Observable<Facture[]> {
    let url = `${this.BASE_URL}/${walletCode}/current`; // [cite: 79]
    if (unite) {
      url += `?unite=${unite}`; // [cite: 82]
    }
    return this.http.get<Facture[]>(url);
  }

  // 2.4 Consulter les factures impayées sur une période donnée
  getFacturesSurPeriode(walletCode: string, debut: string, fin: string): Observable<Facture[]> {
    return this.http.get<Facture[]>(`${this.BASE_URL}/${walletCode}/periode?debut=${debut}&fin=${fin}`); // [cite: 85]
  }
}