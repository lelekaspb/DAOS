import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.signUserIn(email, password);

    if (user) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    if (!user.email || !user.password) {
      throw new BadRequestException();
    }

    try {
      const userObject = await this.validateUser(user.email, user.password);

      if (!userObject) {
        throw new UnauthorizedException();
      }

      const payload = {
        email: userObject.email,
        sub: userObject._id.toString(),
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
