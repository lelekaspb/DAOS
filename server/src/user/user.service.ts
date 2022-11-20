import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UserDto } from './user.dto';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async signUserIn(email: string, password: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email: email }).exec();

      if (!user) {
        throw new NotFoundException();
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      }

      return null;
    } catch (err) {
      console.log(err);
    }
  }

  async createUser(user: UserDto) {
    if (!user) {
      throw new BadRequestException();
    }

    const hashedPassword = await bcrypt.hash(user.password, 12);
    let userHashed = { ...user, password: hashedPassword };
    const savedUser = new this.userModel(userHashed);

    try {
      return await savedUser.save();
    } catch (err) {
      throw new ServiceUnavailableException();
    }
  }

  updateUser(id: string, userDto: UserDto) {
    if (!id || !userDto) {
      throw new BadRequestException();
    }

    try {
      return this.userModel.updateOne({ _id: id }, userDto).exec();
    } catch (err) {
      throw new ServiceUnavailableException();
    }
  }

  deleteUser(id: string) {
    const query: any = { _id: new mongoose.Types.ObjectId(id) };
    return this.userModel.deleteOne(query).exec();
  }

  deleteMany(deleteCriteria: any) {
    return this.userModel.deleteMany(deleteCriteria);
  }
}
