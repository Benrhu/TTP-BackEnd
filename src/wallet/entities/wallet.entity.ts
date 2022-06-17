import { IWallet } from '../interfaces/wallet.interface';
import mongoose from 'mongoose';

export const moneyEntity = () => {
  const walletSchema = new mongoose.Schema<IWallet>({
    initialInvestment: { type: Number, required: true },
    currency: { type: String, required: true },
    profit: { type: Number, required: true },
    roi: { type: Number, required: true },
  });

  return (
    mongoose.models.Money || mongoose.model<IWallet>('Wallet', walletSchema)
  );
};
