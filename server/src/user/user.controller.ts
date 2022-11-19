import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { OnlySameUserByIdAllowed } from './../auth/user.interceptor';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() userDto: UserDto) {
    return this.userService.createUser(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(OnlySameUserByIdAllowed)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const response = await this.userService.deleteUser(id);
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(OnlySameUserByIdAllowed)
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() userDto: UserDto) {
    return this.userService.updateUser(id, userDto);
  }
}
