import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
  NotFoundException,
  Put,
  Query,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { ValidateObjectId } from 'src/shared/pipes/validate-object-id-pipes';
import { Response } from 'express';
import { Wallet } from './schema/wallet.schema';

@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Get('wallets')
  async getWallets(@Res() response: Response) {
    const wallets = await this.walletService.getAllMoney();
    return response.status(HttpStatus.OK).json(wallets);
  }

  /*   @Get('wallet/:walletId')
  async getWallet(
    @Res() res,
    @Param('walletId', new ValidateObjectId()) walletId: number,
  ){
    const wallet = await this.walletService.getWallet(walletId);
    if (!wallet) throw new NotFoundException(`Wallet doesn't exists`);
    return res.status(HttpStatus.OK).json(wallet); 
  } */

  @Post('/wallet')
  async createWallet(@Res() response: Response, @Body() wallet: Wallet) {
    const newWallet = await this.walletService.createWallet(wallet);
    return response.status(HttpStatus.OK).json({
      message: 'Wallet has been created successfully!',
      post: newWallet,
    });
  }

  @Put('/update')
  async updateWallet(
    @Res() response: Response,
    @Query('walletID', new ValidateObjectId()) walletID,
    @Body() wallet: Wallet,
  ) {
    const updatedWallet = await this.walletService.updateWallet(wallet);
    if (!updatedWallet) throw new NotFoundException(`Wallet doesn't exists`);
    return response.status(HttpStatus.OK).json({
      message: 'Wallet has been successfully updated',
      post: updatedWallet,
    });
  }

  @Delete('wallet/:walletId')
  remove(@Param('walletId') walletId: string) {
    return this.walletService.deleteWallet(+walletId);
  }
}
