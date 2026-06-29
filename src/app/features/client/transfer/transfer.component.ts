import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { WalletApiService } from '../../../core/services/wallet-api.service';
import { BalanceStoreService } from '../../../core/services/balance-store.service';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  transferForm!: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private walletApi: WalletApiService,
    public balanceStore: BalanceStoreService
  ) { }

  ngOnInit(): void {
    this.transferForm = this.fb.group({
      senderPhone: [this.balanceStore.currentPhone() || '', Validators.required],
      receiverPhone: ['', [Validators.required, Validators.pattern(/^\+221(77|78|76|75|70)\d{7}$/)]],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onTransfer(): void {
    if (this.transferForm.invalid) return;

    this.walletApi.transfer(this.transferForm.value).subscribe({
      next: () => {
        this.successMessage = 'Transfert effectué avec succès !';
        this.errorMessage = '';
        this.transferForm.patchValue({ receiverPhone: '', amount: '' });
        this.transferForm.get('receiverPhone')?.markAsUntouched();
        this.transferForm.get('amount')?.markAsUntouched();
        this.balanceStore.refreshBalance(); // Synchro du solde global
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Échec du transfert. Veuillez vérifier le solde ou le destinataire.';
        this.successMessage = '';
      }
    });
  }
}