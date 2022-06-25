import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { IUser } from './models/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('Users')
  public getUsers(): IUser[] {
    return this.usersService.getAllsers();
  }

  @Get(':userId')
  public getUser(@Param('userId') userId: number): IUser {
    return this.usersService.getUser(userId);
  }

  @Post('/users')
  async createUser(
    @Param('singUpDate') singUpDate: Date,
    @Param('userId') userId: number,
    @Body('username') username: string,
    @Body('name') name: string,
    @Body('surname') surname: string,
    @Body('location') location: string,
    @Body('phone') phone: number,
  ) {
    const newUser = await this.usersService.createUser(
      singUpDate,
      userId,
      username,
      name,
      surname,
      location,
      phone,
    );
    return newUser;
  }

  @Put(':userId')
  public userUpdate(
    @Param('userId') userId: number,
    @Body() user: IUser,
  ): IUser {
    return this.usersService.updateWallet(userId, user);
  }

  @Delete(':userId')
  public userDelete(@Param('userId') userId: number): void {
    this.usersService.deleteUser(userId);
  }
}
