import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Res,
  NotFoundException,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidateObjectId } from 'src/shared/pipes/validate-object-id-pipes';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  userService: any;
  constructor(private readonly usersService: UsersService) {}

  @Post('/user')
  async createUser(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.createUser(createUserDto);
    return res.status(HttpStatus.OK).json({
      message: 'User has been created successfully!',
      post: newUser,
    });
  }

  @Get('users')
  async getUsers(@Res() res: Response) {
    const users = await this.userService.getAllUser();
    return res.status(HttpStatus.OK).json(users);
  }

  @Get('user/:userId')
  async findAll(
    @Res() res: Response,
    @Param('userId', new ValidateObjectId()) userId,
  ) {
    const user = await this.userService.getUser(userId);
    if (!user) throw new NotFoundException(`User doesn't exists`);
    return res.status(HttpStatus.OK).json(user);
  }

  @Put('/update')
  async updateUser(
    @Res() res: Response,
    @Query('userId', new ValidateObjectId()) userId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.updateUser(
      userId,
      updateUserDto,
    );
    if (!updatedUser) throw new NotFoundException(`User doesn't exists`);
    return res.status(HttpStatus.OK).json({
      message: 'User has been successfully updated',
      post: updatedUser,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUser(+id);
  }
}
