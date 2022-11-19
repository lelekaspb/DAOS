import {
  Controller,
  Get,
  Render,
  Request,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Request() req) {
    return this.authService.login(req.body);
  }
}
