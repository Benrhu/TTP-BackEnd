import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet, WalletDocument, WalletSchema } from './schema/wallet.schema';

@Injectable()
export class WalletService {
  constructor(@InjectModel('Wallet') private walletModel: Model<Wallet>) {}

  async getAllMoney(): Promise<Wallet[]> {
    const wallet = await this.walletModel.find().exec();
    return wallet;
  }

  async getWallet(walletID): Promise<Wallet[]> {
    const wallet = await this.walletModel.find(walletID).exec();
    return wallet;
  }

  async createWallet(createWalletDto: CreateWalletDto): Promise<Wallet> {
    const walletCreated = new this.walletModel(createWalletDto);
    return walletCreated.save();
  }

  async updateWallet(
    walletID,
    createWalletDto: CreateWalletDto,
  ): Promise<Wallet> {
    const updatedWallet = await this.walletModel.findByIdAndUpdate(
      walletID,
      createWalletDto,
      { new: true },
    );
    return updatedWallet;
  }

  async deleteWallet(walletID) {
    const deleteWallet = await this.walletModel.findByIdAndRemove(walletID);
    return deleteWallet;
  }

  getInitialInvestment(id: number, initialInvestment: number) {
    return `This action returns a #${id} money`;
    console.log(initialInvestment);
  }
}
