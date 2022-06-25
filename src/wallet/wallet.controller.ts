import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { IWallet } from './models/wallet.interface';

@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Get('wallets')
  public getWallets() {
    return this.walletService.getAllMoney();
  }

  @Get(':walletId')
  async getWallet(@Param('walletId') walletId: number) {
    return this.walletService.getWallet(walletId);
  }

  @Post('/wallet')
  async createWallet(
    @Body('currency') currency: string,
    @Param('walletId') walletId: number,
  ) {
    const newWallet = await this.walletService.createWallet(walletId, currency);
    return newWallet;
  }

  @Put(':walletId')
  public walletUpdate(
    @Param('walletId') walletId: number,
    @Body() wallet: IWallet,
  ): IWallet {
    return this.walletService.updateWallet(walletId, wallet);
  }

  @Delete(':walletId')
  public walletDelete(@Param('walletId') walletId: number): void {
    this.walletService.deleteWallet(walletId);
  }
}
