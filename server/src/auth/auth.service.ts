import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log('validateUser from auth.service');
    const user = await this.userService.signUserIn({
      email: email,
      password: pass,
    });
    console.log(user);
    if (user) {
      // const { password, ...result } = user;
      return user;
    }
    return null;
  }

  async login(user: any) {
    console.log('auth.service user', user);

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
