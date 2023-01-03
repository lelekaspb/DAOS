import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UserDto } from './user.dto';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { InstrumentDto } from './instrument.dto';
import { CreateUserDto } from './create-user.dto';
import { PostService } from './../post/post.service';
import { Inject } from '@nestjs/common/decorators';
import { OrchestraService } from './../orchestra/orchestra.service';
import { runInThisContext } from 'vm';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => PostService))
    private readonly PostService: PostService,
    @Inject(forwardRef(() => OrchestraService))
    private readonly OrchestraService: OrchestraService,
  ) {}

  async signUserIn(email: string, password: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email: email }).exec();

      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          return await (
            await user.populate('orchestras_created', ['title'])
          ).populate('posts');
        }
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
      await this.PostService.deletePostsByCreatorId(id);
      await this.OrchestraService.deleteOrchestrasByCreatorId(id);
      await this.OrchestraService.deleteMemberFromAllWhereExists(id);
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

  async deleteInstrumentGenre(id: string, instrument: any) {
    // find user and update the instrument
    const query: any = { _id: new mongoose.Types.ObjectId(id) };
    const user = await this.userModel.findOne(query).exec();
    const instrumentIndex = user.instruments.findIndex(
      (elem) => elem.title === instrument.title,
    );

    if (instrumentIndex < 0) {
      throw new HttpException(
        {
          success: false,
          status: HttpStatus.NOT_FOUND,
          message: 'Could not find the instrument',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (instrument.genres.length == 0) {
      // delete the instrument if there are no genres left
      const firstPart = user.instruments.slice(0, instrumentIndex);
      const secondPart = user.instruments.slice(
        instrumentIndex + 1,
        user.instruments.length,
      );
      user.instruments = [...firstPart, ...secondPart];
      await user.save();
    } else {
      user.instruments[instrumentIndex] = instrument;
      await user.save();
    }

    return {
      success: true,
      status: HttpStatus.OK,
      instruments: user.instruments,
    };
  }

  async addOrchestraToUser(userId: string, orchestraId: string) {
    const query: any = { _id: new mongoose.Types.ObjectId(userId) };
    const user = await this.userModel.findOne(query).exec();
    const orchestraObjectId = new mongoose.Types.ObjectId(orchestraId);
    user.orchestras_created.push(orchestraObjectId);
    await user.save();
    return await user.populate('orchestras_created', ['title']);
  }

  async addPostToUser(
    userId: mongoose.Schema.Types.ObjectId,
    postId: mongoose.Schema.Types.ObjectId,
  ) {
    try {
      const user = await this.userModel.findOne({ _id: userId }).exec();
      user.posts.push(postId);
      await user.save();
      return {
        success: true,
      };
    } catch (err) {
      console.log(err);
    }
  }

  async deleteUserPost(postId: string, userId: mongoose.Schema.Types.ObjectId) {
    const query: any = { _id: userId };
    const user = await this.userModel.findOne(query).exec();
    const postIndex = user.posts.findIndex(
      (elem) => String(elem) === String(postId),
    );

    if (postIndex >= 0) {
      const firstPart = user.posts.slice(0, postIndex);
      const secondPart = user.posts.slice(postIndex + 1, user.posts.length);
      user.posts = [...firstPart, ...secondPart];
      await user.save();

      return { success: true };
    }
  }
}
