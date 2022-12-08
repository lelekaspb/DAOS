import { Controller, Post, UseGuards, Body, HttpCode } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { LoginDto } from './auth/login.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('auth/login')
  login(@Body() loginDto: LoginDto) {
    const response = this.authService.login(loginDto);
    return response;
  }
}
