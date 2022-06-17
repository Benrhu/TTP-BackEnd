import { Document } from 'mongoose';

export interface IWallet extends Document {
  readonly initialInvestment: number;
  currency: string;
  profit: number;
  roi: number;

  // Obtain daily benefits and profits -> App logical
}
