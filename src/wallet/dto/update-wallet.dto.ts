import { PartialType } from '@nestjs/mapped-types';
import { CreateWalletDto } from './create-wallet.dto';

export class UpdateMWalletDto extends PartialType(CreateWalletDto) {}
