import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UserDto } from './user.dto';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { InstrumentDto } from './instrument.dto';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async signUserIn(email: string, password: string): Promise<User> {
    console.log('signUserIn from user.service');
    try {
      const user = await this.userModel.findOne({ email: email }).exec();

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return await user.populate('orchestras_created', ['title']);
      }

      return null;
    } catch (err) {
      console.log(err);
    }
  }

  async createUser(user: CreateUserDto) {
    const userExists = await this.userModel
      .findOne({ email: user.email })
      .exec();
    console.log(userExists);
    if (userExists) {
      throw new HttpException(
        {
          success: false,
          status: HttpStatus.FORBIDDEN,
          message: 'Bruger med denne e-mail findes allerede',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    const hashedPassword = await bcrypt.hash(user.password, 12);
    let userHashed = { ...user, password: hashedPassword };
    const savedUser = new this.userModel(userHashed);

    try {
      await savedUser.save();
      const { password, ...result } = savedUser.toObject();

      return {
        success: true,
        status: HttpStatus.CREATED,
        user: result,
      };
    } catch (err) {
      throw new ServiceUnavailableException();
    }
  }

  async updateUser(id: string, userDto: UserDto) {
    if (!id || !userDto) {
      throw new BadRequestException();
    }

    try {
      const response = await this.userModel
        .updateOne({ _id: id }, userDto)
        .exec();
      return {
        success: true,
        status: HttpStatus.OK,
        ...response,
      };
    } catch (err) {
      throw new ServiceUnavailableException();
    }
  }

  async deleteUser(id: string) {
    const query: any = { _id: new mongoose.Types.ObjectId(id) };
    try {
      const result = await this.userModel.deleteOne(query).exec();
      return {
        success: true,
        status: HttpStatus.OK,
        ...result,
      };
    } catch (err) {
      console.log(err);
      throw new HttpException(
        {
          success: false,
          status: HttpStatus.SERVICE_UNAVAILABLE,
          message: 'Kunne ikke slette brugeren',
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  deleteMany(deleteCriteria: any) {
    return this.userModel.deleteMany(deleteCriteria);
  }

  async changePassword(id: string, passwords: any) {
    const query: any = { _id: new mongoose.Types.ObjectId(id) };
    const user = await this.userModel.findOne(query).exec();

    const isMatch = await bcrypt.compare(passwords.current, user.password);
    if (isMatch) {
      try {
        const hashedPassword = await bcrypt.hash(passwords.new, 12);
        user.password = hashedPassword;
        const savedUser = await user.save();
        const { password, ...result } = savedUser.toObject();

        return {
          success: true,
          status: HttpStatus.OK,
          user: result,
        };
        //  return user;
      } catch (err) {
        console.error(err);
        throw new ServiceUnavailableException();
      }
    } else {
      throw new HttpException(
        {
          success: false,
          status: HttpStatus.UNAUTHORIZED,
          message: 'Nuværende adgangskode er forket',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async addInstrumentToUser(id: string, instrument: InstrumentDto) {
    if (instrument.title == 'vælg') {
      throw new HttpException(
        {
          success: false,
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: 'Instrumentet må ikke være tomt',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const query: any = { _id: new mongoose.Types.ObjectId(id) };
    const user = await this.userModel.findOne(query).exec();
    // check if the user already has this instrument in the instruments array
    const instrumentExists = user.instruments.find(
      (elem) => elem.title === instrument.title,
    );
    if (!instrumentExists) {
      user.instruments.push(instrument);
      const savedUser = await user.save();
      const { password, ...result } = savedUser.toObject();
      return {
        success: true,
        status: HttpStatus.OK,
        user: result,
      };
    } else {
      throw new HttpException(
        {
          success: false,
          status: HttpStatus.FORBIDDEN,
          message: 'Dette instrument findes allerede',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async addOrchestraToUser(userId: string, orchestraId: string) {
    const query: any = { _id: new mongoose.Types.ObjectId(userId) };
    const user = await this.userModel.findOne(query).exec();
    const orchestraObjectId = new mongoose.Types.ObjectId(orchestraId);
    user.orchestras_created.push(orchestraObjectId);
    await user.save();
    return await user.populate('orchestras_created', ['title']);
  }
}
