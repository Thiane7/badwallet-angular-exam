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
    this.balanceStore.refreshBalance();
  }
}