/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Wallet } from './models/wallet.interface';

@Injectable()
export class WalletService {
  private wallets: Array<Wallet> = [];

  public getAllMoney(): Array<Wallet> {
    return this.wallets;
  }

  public getWallet(walletId: number): Wallet {
    const wallet: Wallet = this.wallets.find(wallet => wallet.walletId === walletId);

    if (!wallet) {
      throw new NotFoundException(`Wallet with ID ${walletId} not found`);
    }
    return wallet;
  }

  public createWallet(wallet: Wallet): Wallet {
    const walletIdExists: boolean = this.wallets.some((item) => item.walletId === wallet.walletId);
    
    if (walletIdExists) {
      throw new UnprocessableEntityException('Wallet ID already exists');
    }
    const maxId: number = Math.max(...this.wallets.map((wallet) => wallet.walletId), 0);
    const walletId = maxId + 1;

    const newWallet: Wallet = {
      ...wallet,
      walletId,
    };

    this.wallets.push(newWallet);

    return newWallet;
  }

  public updateWallet(walletId: number, wallet: Wallet): Wallet {
    console.log('Updating wallet with id: ${walletId}');
    const index: number = this.wallets.findIndex((item) => item.walletId === walletId);
    
    if (index === -1) {
      throw new NotFoundException(`Wallet with ID ${walletId} not found`);
    }

    const walletIdExists: boolean = this.wallets.some((item) => item.walletId === wallet.walletId);

    if (walletIdExists) {
      throw new UnprocessableEntityException('Wallet ID already exists');
    }

    const updateWallet: Wallet = {
      ...wallet,
      walletId,
    };

    this.wallets[index] = updateWallet;

    return updateWallet;
  }

  public deleteWallet(walletId: number): void {
    const index: number = this.wallets.findIndex((wallet) => wallet.walletId === walletId);
    if (index === -1) {
      throw new NotFoundException(`Wallet with ID ${walletId} not found`);
    }
    this.wallets.splice(index, 1);
  }

  getInitialInvestment(walletId: number, initialInvestment: number) {
    const wallet = this.wallets.find(wallet => wallet.walletId === walletId);
    wallet.initialInvestment = initialInvestment;
    console.log(initialInvestment);
  }
}
