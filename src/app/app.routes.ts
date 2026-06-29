import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/client/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'transfer',
    loadComponent: () => import('./features/client/transfer/transfer.component').then(m => m.TransferComponent)
  },
  {
    path: 'bills/current',
    loadComponent: () => import('./features/client/bills/bills.component').then(m => m.BillsComponent)
  },
  {
    path: 'transactions',
    loadComponent: () => import('./features/client/transactions/transactions.component').then(m => m.TransactionsComponent)
  },
  {
    path: 'admin/wallets',
    loadComponent: () => import('./features/agent/wallets-management/wallets-management.component').then(m => m.WalletsManagementComponent)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];