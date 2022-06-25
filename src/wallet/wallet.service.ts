/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { forwardRef, Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { IWallet } from './models/wallet.interface';

@Injectable()
export class WalletService {
  private wallets: IWallet[] = [];

  constructor(
    @InjectModel('Wallet') private readonly walletModel: Model<IWallet>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async getAllMoney() {
    const wallets = this.walletModel.find().exec();
    return wallets as unknown as IWallet[];
  }

  public getWallet(walletId: number): IWallet {
    const wallet: IWallet = this.wallets.find(wallet => wallet.walletId === walletId);

    if (!wallet) {
      throw new NotFoundException(`Wallet with ID ${walletId} not found`);
    }
    return wallet;
  }

  async createWallet(walletId: number, currency: string) {

    const maxId: number = Math.max(...this.wallets.map((wallet) => wallet.walletId), 0);

    const newWallet = new this.walletModel({
      walletId: maxId + 1,
      currency: currency
    });

    const walletIdExists: boolean = this.wallets.some((item) => item.walletId === walletId);
    
    if (walletIdExists) {
      throw new UnprocessableEntityException('Wallet ID already exists');
    }


    const result = await newWallet.save();

    return newWallet;
  }

  public updateWallet(walletId: number, wallet: IWallet): IWallet {
    console.log('Updating wallet with id: ${walletId}');
    const index: number = this.wallets.findIndex((item) => item.walletId === walletId);
    
    if (index === -1) {
      throw new NotFoundException(`Wallet with ID ${walletId} not found`);
    }

    const walletIdExists: boolean = this.wallets.some((item) => item.walletId === wallet.walletId);

    if (walletIdExists) {
      throw new UnprocessableEntityException('Wallet ID already exists');
    }

    const updateWallet: IWallet = {
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
