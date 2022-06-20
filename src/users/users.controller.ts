import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { User } from './models/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  public getUsers(): Array<User> {
    return this.usersService.getAllsers();
  }

  @Get(':userId')
  public getUser(@Param('userId') userId: number): User {
    return this.usersService.getUser(userId);
  }

  @Post()
  public createUser(@Body() user: User): User {
    return this.usersService.createUser(user);
  }

  @Put(':userId')
  public userUpdate(@Param('userId') userId: number, @Body() user: User): User {
    return this.usersService.updateWallet(userId, user);
  }

  @Delete(':userId')
  public userDelete(@Param('userId') userId: number): void {
    this.usersService.deleteUser(userId);
  }
}
