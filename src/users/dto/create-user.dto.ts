import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;
  surname: string;
  email: string;
  phone: number;
  location: string;
}
