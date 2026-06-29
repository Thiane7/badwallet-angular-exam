import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletApiService } from '../../../core/services/wallet-api.service';
import { BalanceStoreService } from '../../../core/services/balance-store.service';
import { XofPipe } from '../../../shared/pipes/xof.pipe';

@Component({
  selector: 'app-bills',
  standalone: true,
  imports: [CommonModule, XofPipe],
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  bills: any[] = [];
  successMessage = '';
  errorMessage = '';

  constructor(
    private walletApi: WalletApiService,
    private balanceStore: BalanceStoreService
  ) { }

  ngOnInit(): void {
    this.loadClientBills();
  }

  loadClientBills(): void {
    const phone = this.balanceStore.currentPhone();
    if (!phone) {
      this.errorMessage = "Impossible de charger les factures : aucun compte client identifié.";
      return;
    }

    // Récupération des factures via le service API
    this.walletApi.getBillsByPhone(phone).subscribe({
      next: (data: any[]) => {
        this.bills = data || [];
      },
      error: () => {
        this.errorMessage = "Échec de la récupération des redevances et factures.";
      }
    });
  }

  onPayBill(bill: any): void {
    if (bill.status === 'PAID' || bill.status === 'paid') return;

    const phone = this.balanceStore.currentPhone();

    this.walletApi.payBill(bill.id, phone).subscribe({
      next: () => {
        this.successMessage = `La facture ${bill.reference} a été réglée avec succès !`;
        this.errorMessage = '';
        this.loadClientBills(); // Recharger la liste mise à jour
        this.balanceStore.refreshBalance(); // Mettre à jour le solde global de l'application
      },
      error: (err: any) => {
        this.errorMessage = err.error?.message || "Erreur lors du paiement. Veuillez vérifier votre solde disponible.";
        this.successMessage = '';
      }
    });
  }
}