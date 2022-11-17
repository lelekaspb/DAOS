import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.signUserIn({
      email: email,
      password: pass,
    });

    if (user) {
      return user;
    }
    return null;
  }

  async login(user: any) {
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
  }
}
