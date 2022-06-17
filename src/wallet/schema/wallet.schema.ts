import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WalletDocument = Wallet & Document;

@Schema()
export class Wallet {
  @Prop({ required: true })
  initialInvestment: number;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  profit: number;

  @Prop({ required: true })
  roi: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
