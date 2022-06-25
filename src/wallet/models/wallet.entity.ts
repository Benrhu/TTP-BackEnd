import mongoose from 'mongoose';
import { IWallet } from './wallet.interface';

export const walletEntity = new mongoose.Schema<IWallet>({
  walletId: { type: Number, required: true },
  initialInvestment: { type: Number, required: true },
  currency: { type: String, required: true },
  profit: { type: Number, required: true },
  loss: { type: Number, required: true },
  roi: { type: Number, required: true },
});
