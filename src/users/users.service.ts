import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './models/user.interface';

@Injectable()
export class UsersService {
  private users: IUser[] = [];

  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  public createUser(
    singUpDate: Date,
    userId: number,
    username: string,
    name: string,
    surname: string,
    location: string,
    phone: number,
  ) {
    const newUser = new this.userModel({
      singUpDate: singUpDate,
      userId: userId,
      username: username,
      name: name,
      surname: surname,
      location: location,
      phone: phone,
    });

    const userIdExists: boolean = this.users.some(
      (item) => item.userId === userId,
    );

    if (userIdExists) {
      throw new UnprocessableEntityException('User already exists');
    }

    const maxId: number = Math.max(...this.users.map((user) => user.userId), 0);
    userId = maxId + 1;

    return newUser;
  }

  public getAllsers(): IUser[] {
    return this.users;
  }

  public getUser(userId: number): IUser {
    const user: IUser = this.users.find((user) => user.userId === userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  public updateWallet(userId: number, user: IUser): IUser {
    console.log(`Updating user with id: ${userId}`);
    const index: number = this.users.findIndex(
      (item) => item.userId === userId,
    );

    if (index === -1) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const userIdExists: boolean = this.users.some(
      (item) => item.userId === user.userId,
    );

    if (userIdExists) {
      throw new UnprocessableEntityException('User ID already exists');
    }

    const updateUser: IUser = {
      ...user,
      userId,
    };

    this.users[index] = updateUser;

    return updateUser;
  }

  public deleteUser(userId: number): void {
    const index: number = this.users.findIndex(
      (user) => user.userId === userId,
    );
    if (index === -1) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    this.users.splice(index, 1);
  }
}
