import { IUser } from '../user.interface';
import mongoose from 'mongoose';

export const userEntity = () => {
  const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    location: { type: String, required: true },
    phone: { type: Number, required: true },
    money: { type: [String], required: true },
  });

  return mongoose.models.Users || mongoose.model<IUser>('User', userSchema);
};
