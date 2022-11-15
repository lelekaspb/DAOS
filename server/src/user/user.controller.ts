import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { User } from './user.schema';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() userDto: UserDto) {
    console.log(userDto);
    return this.userService.createUser(userDto);
  }

  @Post('signin')
  @HttpCode(200)
  async signUserIn(@Body() userInfo: any) {
    console.log(userInfo);
    const response = await this.userService.signUserIn(userInfo);
    console.log(response);
    return response;
  }
}
