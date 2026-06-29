export interface Wallet {
  id?: number;
  phoneNumber: string;
  email: string;
  balance: number;
  code: string;
  currency: string;
  createdAt?: string;
}

export interface Transaction {
  id?: number;
  type: string;
  amount: number;
  fees: number;
  senderPhone?: string;
  receiverPhone?: string;
  description: string;
  createdAt: string;
}

export interface Facture {
  id?: number;
  reference: string;
  walletCode: string;
  unite: string;
  montant: number;
  payee: boolean;
  dateFacture: string;
}