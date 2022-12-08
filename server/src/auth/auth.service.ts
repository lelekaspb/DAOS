import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './login.dto';

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

  async login(loginDto: LoginDto) {
    try {
      const userObject = await this.validateUser(
        loginDto.email,
        loginDto.password,
      );

      const payload = {
        email: userObject.email,
        sub: userObject._id.toString(),
      };

      const { password, ...result } = userObject.toObject();
      const userToReturn = {
        ...result,
        token: this.jwtService.sign(payload),
      };

      return {
        success: true,
        status: HttpStatus.OK,
        user: userToReturn,
      };
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
