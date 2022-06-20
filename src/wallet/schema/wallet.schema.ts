import * as mongoose from 'mongoose';

export const WalletSchema = new mongoose.Schema({
  walletId: { type: Number, required: true },
  initialInvestment: { type: Number, required: true },
  currency: { type: Number, required: true },
  profit: { type: Number, required: false },
  loss: { type: Number, required: false },
  roi: { type: Number, required: false },
});

export interface Wallet {
  walletId: number;
  initialInvestment: number;
  currency: number;
  profit: number;
  loss: number;
  roi: number;
}
