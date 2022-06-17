import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { moneyEntity } from 'src/money/entities/money.entity';
import { IMoney } from 'src/money/money.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userEntity } from './entities/user.entity';
import { IUser } from './user.interface';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  getInititalInvestment(id: number) {
    try{
        let userModel = userEntity();
        let moneyModel = moneyEntity();

        let moneyFound: IMoney[] = [];

        let response: any = {
          money: [],
        };

        await userModel.findById(id).then(async (user: IUser) => {
          response.user = user.name;

          let objectId:mongoose.Types.ObjectId[] = [];
          user.money.forEach(async (money) => {
              let moneyId = new mongoose.Types.ObjectId(money);
              objectId.push(moneyId);
          });

          await moneyModel.find({ _id: moneyId }).then(async (money: IMoney[]) => {
              moneyFound = money;
          });

      }).catch((error) => {
          console.log(`DATABASE ERROR => Obtaining user: ${error}`);
      })

      response.money = moneyFound:
      return response;