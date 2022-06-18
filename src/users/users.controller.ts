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

  @Post('/wallet')
  async createUser(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.createUser(createUserDto);
    return res.status(HttpStatus.OK).json({
      message: 'Wallet has been created successfully!',
      post: newUser,
    });
  }

  @Get('users')
  async getUsers(@Res() res: Response) {
    const wallets = await this.userService.getAllUser();
    return res.status(HttpStatus.OK).json(wallets);
  }

  @Get('user/:userId')
  async findAll(
    @Res() res: Response,
    @Param('userId', new ValidateObjectId()) userId,
  ) {
    const wallet = await this.userService.getUser(userId);
    if (!wallet) throw new NotFoundException(`Wallet doesn't exists`);
    return res.status(HttpStatus.OK).json(wallet);
  }

  @Put('/update')
  async updateWallet(
    @Res() res: Response,
    @Query('walletID', new ValidateObjectId()) userId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.updateUser(
      userId,
      updateUserDto,
    );
    if (!updatedUser) throw new NotFoundException(`Wallet doesn't exists`);
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
