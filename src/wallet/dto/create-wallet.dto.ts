import { IsNotEmpty } from 'class-validator';

export class CreateWalletDto {
  @IsNotEmpty()
  walletID: number;
  initialInvestment: number;
  currency: string;
  profit: number;
  loss: number;
  roi: number;
}
