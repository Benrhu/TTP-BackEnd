import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MoneySchema } from './schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Money', schema: MoneySchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
