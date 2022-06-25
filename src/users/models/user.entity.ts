import mongoose from 'mongoose';
import { IUser } from './user.interface';

export const userEntity = new mongoose.Schema<IUser>({
  singUpDate: { type: Date, required: true },
  userId: { type: Number, required: true },
  username: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: Number, required: true },
  walletId: { type: Number, required: true },
});
