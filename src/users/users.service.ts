import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAllUsers(): Promise<User[]> {
    const user = await this.userModel.find().exec();
    return user;
  }

  async getUser(userId): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    return user;
  }

  async updateUser(userId, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedWallet = await this.userModel.findByIdAndUpdate(
      userId,
      updateUserDto,
      { new: true },
    );
    return updatedWallet;
  }

  async deleteWallet(userId) {
    const deleteWallet = await this.userModel.findByIdAndRemove(userId);
    return deleteWallet;
  }

  getInititalInvestment(initialInvestment: number) {
    return initialInvestment;
  }
}
