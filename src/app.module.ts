import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WalletModule } from './wallet/wallet.module';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletSchema } from './wallet/schema/wallet.schema';
import { User, UserSchema } from './users/schema/user.schema';
import { WalletService } from './wallet/wallet.service';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    UsersModule,
    WalletModule,
    MongooseModule.forFeatureAsync([
      {
        name: 'Wallet',
        useFactory: () => {
          const schema = WalletSchema;
          schema.pre('Save', function () {
            console.log('Pre save');
          });
          return schema;
        },
      },
    ]),
    MongooseModule.forRoot('mongodb://localhost:27017/nest', {
      connectionName: 'wallet',
    }),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('Save', function () {
            console.log('Pre save');
          });
          return schema;
        },
      },
    ]),
    MongooseModule.forRoot('mongodb://localhost:27017/nest', {
      connectionName: 'user',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, WalletService, UsersService],
})
export class AppModule {}
