import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WalletModule } from './wallet/wallet.module';
import { WalletService } from './wallet/wallet.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { WalletController } from './wallet/wallet.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/TTP', {
      user: 'admin',
      connecctionName: 'TTP',
      authSource: 'admin',
      dbName: 'TTP',
      pass: 'admin',
    }),
    UsersModule,
    WalletModule,
  ],
  controllers: [AppController, UsersController, WalletController],
  providers: [AppService, WalletService, UsersService],
  exports: [WalletService, UsersService],
})
export class AppModule {}
