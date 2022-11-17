import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UserDto } from './user.dto';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async signUserIn(userInfo: any): Promise<User> {
    console.log('signUserIn user.server');
    const user = await this.userModel.findOne({ email: userInfo.email }).exec();

    const isMatch = await bcrypt.compare(userInfo.password, user.password);
    if (isMatch) {
      return user;
    }
  }

  async createUser(user: UserDto) {
    const hashedPassword = await bcrypt.hash(user.password, 12);
    let userHashed = { ...user, password: hashedPassword };
    const savedUser = new this.userModel(userHashed);
    return await savedUser.save();
  }

  updateUser(id: string, userDto: UserDto) {
    return this.userModel.updateOne({ _id: id }, userDto).exec();
  }

  deleteUser(id: string) {
    const query: any = { _id: new mongoose.Types.ObjectId(id) };
    return this.userModel.deleteOne(query).exec();
  }

  deleteMany(deleteCriteria: any) {
    return this.userModel.deleteMany(deleteCriteria);
  }
}
