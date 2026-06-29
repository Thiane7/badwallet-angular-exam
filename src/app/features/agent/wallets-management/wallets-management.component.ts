import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { WalletApiService } from '../../../core/services/wallet-api.service';
import { BalanceStoreService } from '../../../core/services/balance-store.service';
import { XofPipe } from '../../../shared/pipes/xof.pipe';
import { Wallet } from '../../../core/models/wallet.model';

@Component({
  selector: 'app-wallets-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, XofPipe],
  templateUrl: './wallets-management.component.html',
  styleUrls: ['./wallets-management.component.css']
})
export class WalletsManagementComponent implements OnInit {
  // Données de listing et pagination
  wallets: Wallet[] = [];
  currentPage = 0;
  pageSize = 5;
  totalPages = 0;
  searchPhone = '';
  selectedWalletForTransaction: Wallet | null = null;

  // Formulaires réactifs
  walletForm!: FormGroup;
  transactionForm!: FormGroup;

  // Feedbacks UX
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private walletApi: WalletApiService,
    private balanceStore: BalanceStoreService
  ) { }

  ngOnInit(): void {
    this.initForms();
    this.loadWallets();
  }

  private initForms(): void {
    // Formulaire de création de Portefeuille (Validations rigoureuses)
    this.walletForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+221(77|78|76|75|70)\d{7}$/)]],
      email: ['', [Validators.required, Validators.email]],
      code: ['', [Validators.required, Validators.minLength(3)]],
      balance: [0, [Validators.required, Validators.min(0)]],
      currency: ['XOF', Validators.required]
    });

    // Formulaire d'opérations financières (Dépôt / Retrait)
    this.transactionForm = this.fb.group({
      type: ['deposit', Validators.required],
      amount: ['', [Validators.required, Validators.min(100)]],
      paymentMethod: ['CASH'] // Pour le dépôt
    });
  }

  loadWallets(): void {
    this.walletApi.getWallets(this.currentPage, this.pageSize).subscribe({
      next: (res) => {
        this.wallets = res.content || res;
        this.totalPages = res.totalPages || 1;
      },
      error: () => this.showError('Erreur lors du chargement des portefeuilles.')
    });
  }

  onSearch(): void {
    if (!this.searchPhone.trim()) {
      this.loadWallets();
      return;
    }
    this.walletApi.getWalletByPhone(this.searchPhone.trim()).subscribe({
      next: (wallet) => {
        this.wallets = wallet ? [wallet] : [];
        this.totalPages = 1;
      },
      error: () => {
        this.wallets = [];
        this.showError('Aucun portefeuille trouvé pour ce numéro.');
      }
    });
  }

  onCreateWallet(): void {
    if (this.walletForm.invalid) return;

    this.walletApi.createWallet(this.walletForm.value).subscribe({
      next: () => {
        this.showSuccess('Portefeuille créé avec succès !');
        this.walletForm.reset({ balance: 0, currency: 'XOF' });
        this.loadWallets();
      },
      error: (err) => this.showError(err.error?.message || 'Erreur lors de la création.')
    });
  }

  openTransactionModal(wallet: Wallet): void {
    this.selectedWalletForTransaction = wallet;
    this.transactionForm.patchValue({ type: 'deposit', amount: '' });
  }

  onExecuteTransaction(): void {
    if (this.transactionForm.invalid || !this.selectedWalletForTransaction) return;

    const { type, amount, paymentMethod } = this.transactionForm.value;
    const walletId = this.selectedWalletForTransaction.id!;
    const phone = this.selectedWalletForTransaction.phoneNumber;

    if (type === 'deposit') {
      this.walletApi.deposit(walletId, amount, paymentMethod).subscribe({
        next: () => this.handleTransactionSuccess(),
        error: () => this.showError('Échec du dépôt.')
      });
    } else {
      // Retrait
      this.walletApi.withdraw({ phoneNumber: phone, amount }).subscribe({
        next: () => this.handleTransactionSuccess(),
        error: () => this.showError('Échec du retrait (Vérifiez le solde).')
      });
    }
  }

  private handleTransactionSuccess(): void {
    this.showSuccess('Opération effectuée avec succès !');
    this.selectedWalletForTransaction = null;
    this.loadWallets();
    this.balanceStore.refreshBalance(); // Rafraîchissement synchrone du solde global (Signals)
  }

  changePage(p: number): void {
    this.currentPage = p;
    this.loadWallets();
  }

  private showSuccess(msg: string): void {
    this.successMessage = msg;
    setTimeout(() => this.successMessage = '', 4000);
  }

  private showError(msg: string): void {
    this.errorMessage = msg;
    setTimeout(() => this.errorMessage = '', 4000);
  }
}