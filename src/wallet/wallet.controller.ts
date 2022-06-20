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
import { Wallet } from './models/wallet.interface';

@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Get('wallets')
  public getWallets(): Array<Wallet> {
    return this.walletService.getAllMoney();
  }

  @Get(':walletId')
  public getWallet(@Param('walletId') walletId: number): Wallet {
    return this.walletService.getWallet(walletId);
  }

  @Post('/wallet')
  public createWallet(@Body() wallet: Wallet): Wallet {
    return this.walletService.createWallet(wallet);
  }

  @Put(':walletId')
  public walletUpdate(
    @Param('walletId') walletId: number,
    @Body() wallet: Wallet,
  ): Wallet {
    return this.walletService.updateWallet(walletId, wallet);
  }

  @Delete(':walletId')
  public walletDelete(@Param('walletId') walletId: number): void {
    this.walletService.deleteWallet(walletId);
  }
}
