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
import { UpdateMWalletDto } from './dto/update-wallet.dto';
import { ValidateObjectId } from 'src/shared/pipes/validate-object-id-pipes';
import { Wallet } from './schema/wallet.schema';

@Controller('wallet')
export class WalletController {
  [x: string]: any;
  constructor(private readonly walletService: WalletService) {}

  @Post()
  async createWallet(@Res() res, @Body() createWalletDto: CreateWalletDto) {
    const newWallet = await this.walletService.createWallet(createWalletDto);
    return res.status(HttpStatus.OK).json({
      message: 'Wallet has been created successfully!',
      post: newWallet,
    });
  }

  @Get('wallets')
  async getWallets(@Res() res) {
    const wallets = await this.walletService.getAllMoney();
    return res.status(HttpStatus.OK).json(wallets);
  }

  @Get('wallet/:walletID')
  async findAll(
    @Res() res,
    @Param('walletID', new ValidateObjectId()) walletID,
  ) {
    const wallet = await this.walletService.getWallet(walletID);
    if (!wallet) throw new NotFoundException(`Wallet doesn't exists`);
    return res.status(HttpStatus.OK).json(wallet);
  }
  ) {
    const wallet = await this.walletService.getWallet();
    if (!wallet) throw new NotFoundException(`Wallet doesn't exists`);
    return res.status(HttpStatus.OK).json(wallet);

    return this.walletService.getAllMoney();
  }

  @Put('/update')
  async updateWallet(
    @Res() res,
    @Query('walletID', new ValidateObjectId()) walletID,
    @Body() updateWalletDto: UpdateMWalletDto,
  ) {
    const updatedWallet = await this.walletService.updateWallet(
      walletID,
      updateWalletDto,
    );
    if (!updatedWallet) throw new NotFoundException(`Wallet doesn't exists`);
    return res.status(HttpStatus.OK).json({
      message: 'Wallet has been successfully updated',
      post: updatedWallet,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moneyService.remove(+id);
  }
}
