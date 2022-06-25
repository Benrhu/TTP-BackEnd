export interface IWallet {
  walletId?: number;
  initialInvestment: number;
  currency: string;
  profit: number;
  loss: number;
  roi: number;
}
