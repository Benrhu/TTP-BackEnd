import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userEntity } from './models/user.entity';
import { WalletModule } from 'src/wallet/wallet.module';

@Module({
  imports: [
    forwardRef(() => WalletModule),
    MongooseModule.forFeature([{ name: 'User', schema: userEntity }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
