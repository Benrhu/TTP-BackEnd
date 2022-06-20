import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Wallet } from 'src/wallet/models/wallet.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.interface';

@Injectable()
export class UsersService {
  private users: Array<User> = [];

  public createUser(user: User) {
    const userIdExists: boolean = this.users.some(
      (item) => item.userId === user.userId,
    );

    if (userIdExists) {
      throw new UnprocessableEntityException('User already exists');
    }
    const maxId: number = Math.max(...this.users.map((user) => user.userId), 0);
    const userId = maxId + 1;

    const newUser: User = {
      ...user,
      userId,
    };

    this.users.push(newUser);

    return newUser;
  }

  public getAllsers(): Array<User> {
    return this.users;
  }

  public getUser(userId: number): User {
    const user: User = this.users.find((user) => user.userId === userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  public updateWallet(userId: number, user: User): User {
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

    const updateUser: User = {
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
