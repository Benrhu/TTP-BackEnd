import { forwardRef, Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { walletEntity } from './models/wallet.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([{ name: 'Wallet', schema: walletEntity }]),
  ],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}
