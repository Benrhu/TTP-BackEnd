import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateMWalletDto } from './dto/update-wallet.dto';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';

@Controller('wallet')
export class WalletController {
  [x: string]: any;
  constructor(private readonly walletService: WalletService) {}

  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.createWallet(createWalletDto);
  }

  @Get('wallets')
  async getWallets(
    @Res() res)
    {
      const wallets = await this.walletService.getAllMoney();
      return res.status(HttpStatus.OK).json(wallets);
    }

  @Get('wallet/:walletID')
  async findAll(
    @Res() res,
    @Param('walletID', new ValidateObjectId()) walletID)
    {
      const wallet = await tñhis.walletService.getAllMoney(walletID)
      if (!wallet)thrownew NotFoundException(`Wallet doesn't exists`)
        return res.status(HttpStatus.OK).json(wallet);
      }
    return this.walletService.getAllMoney();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateMWalletDto) {
    return this.moneyService.update(+id, updateWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moneyService.remove(+id);
  }
}
