import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UserDto } from './user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  signUserIn(userInfo: any): Promise<User> {
    const user = this.userModel
      .findOne({ email: userInfo.email, password: userInfo.password })
      .exec();

    return user;
  }

  createUser(user: UserDto) {
    const savedUser = new this.userModel(user);
    return savedUser.save();
  }

  updateUser(id: string, user: any) {
    // connect to db and update
  }

  deleteUser(id: string) {
    const query: any = { _id: new mongoose.Types.ObjectId(id) };
    return this.userModel.deleteOne(query).exec();
  }

  deleteMany(deleteCriteria: any) {
    return this.userModel.deleteMany(deleteCriteria);
  }
}
