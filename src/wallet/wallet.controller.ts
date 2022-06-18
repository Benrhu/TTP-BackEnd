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
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { ValidateObjectId } from 'src/shared/pipes/validate-object-id-pipes';
import { Response } from 'express';
import { WalletSchema } from './schema/wallet.schema';

@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Get('wallets')
  async getWallets(@Res() response: Response) {
    const wallets = await this.walletService.getAllMoney();
    return response.status(HttpStatus.OK).json(wallets);
  }

  @Get('wallet/:walletId')
  async findAll(
    @Res() response: Response,
    @Param(WalletSchema., new ValidateObjectId()) walletId,
  ) {
    const wallet = await this.walletService.getWallet(walletID);
    if (!wallet) throw new NotFoundException(`Wallet doesn't exists`);
    return response.status(HttpStatus.OK).json(wallet);
  }

  @Post('/wallet')
  async createWallet(
    @Res() response: Response,
    @Body() createWalletDto: CreateWalletDto,
  ) {
    const newWallet = await this.walletService.createWallet(createWalletDto);
    return response.status(HttpStatus.OK).json({
      message: 'Wallet has been created successfully!',
      post: newWallet,
    });
  }

  @Put('/update')
  async updateWallet(
    @Res() response: Response,
    @Query('walletID', new ValidateObjectId()) walletID,
    @Body() updateWalletDto: UpdateWalletDto,
  ) {
    const updatedWallet = await this.walletService.updateWallet(
      walletID,
      updateWalletDto,
    );
    if (!updatedWallet) throw new NotFoundException(`Wallet doesn't exists`);
    return response.status(HttpStatus.OK).json({
      message: 'Wallet has been successfully updated',
      post: updatedWallet,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletService.deleteWallet(+id);
  }
}
