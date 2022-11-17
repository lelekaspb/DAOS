import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { User } from './user.schema';
import { UserDto } from './user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() userDto: UserDto) {
    return this.userService.createUser(userDto);
  }

  // @Post('signin')
  // //   @HttpCode(200)
  // async signUserIn(@Body() userInfo: any) {
  //   const response = await this.userService.signUserIn(userInfo);
  //   return response;
  // }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const response = await this.userService.deleteUser(id);
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() userDto: UserDto) {
    return this.userService.updateUser(id, userDto);
  }
}
