import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BalanceStoreService } from '../../../core/services/balance-store.service';
import { XofPipe } from '../../../shared/pipes/xof.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, XofPipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(public balanceStore: BalanceStoreService) {}

  ngOnInit(): void {
    // 1. On définit un numéro client par défaut pour alimenter les requêtes API
    this.balanceStore.setCurrentPhone('+221771234567'); // Modifie par un numéro réel de ton API si besoin
    
    // 2. On rafraîchit le solde global
    this.balanceStore.refreshBalance();
  }
}