import { Routes } from '@angular/router';
import { DashboardComponent } from './features/client/dashboard/dashboard.component';
import { TransferComponent } from './features/client/transfer/transfer.component';
import { TransactionsComponent } from './features/client/transactions/transactions.component';
import { BillsComponent } from './features/client/bills/bills.component';
import { WalletsManagementComponent } from './features/agent/wallets-management/wallets-management.component';

export const routes: Routes = [
  // Redirection par défaut vers le Dashboard Client
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  
  // Espace Client
  { path: 'dashboard', component: DashboardComponent },
  { path: 'transfer', component: TransferComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'bills/current', component: BillsComponent }, // C'est l'URL appelée par ton bouton !

  // Espace Agent / Admin
  { path: 'admin/wallets', component: WalletsManagementComponent },

  // Redirection de secours si l'URL n'existe pas
  { path: '**', redirectTo: 'dashboard' }
];
