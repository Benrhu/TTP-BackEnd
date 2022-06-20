/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet, WalletSchema } from './schema/wallet.schema';

@Injectable()
export class WalletService {
  private readonly wallets: Wallet[] = [];

  constructor(@InjectModel('Wallet') private walletModel: Model<Wallet>) {}

  getAllMoney(): Wallet[] {
    return [...this.wallets];
  }

  getWallet() {
    const wallet = new this.walletModel();
    return wallet;
  }

  async createWallet(wallet: Wallet): Promise<Wallet> {
    const newWallet = new this.walletModel(wallet);
    this.wallets.push(newWallet);
    return newWallet;
  }

 async updateWallet(wallet: Wallet): Promise<Wallet> {
  const updatedWallet = await this.walletModel.findOneAndUpdate({ walletId: wallet.walletId }, wallet, { new: true });
  return updatedWallet
  }

  async deleteWallet(walletID): Promise<Wallet> {
    const deleteWallet = await this.walletModel.findByIdAndRemove(walletID);
    return deleteWallet;
  }

  getInitialInvestment(walletId: number, initialInvestment: number) {
    const wallet = this.wallets.find(wallet => wallet.walletId === walletId);
    wallet.initialInvestment = initialInvestment;
    console.log(initialInvestment);
  }
}
