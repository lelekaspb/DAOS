import {
  Body,
  Controller,
  Delete,
  Get,
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
import { InstrumentDto } from './instrument.dto';
import { OrchestraPropertyDto } from './orchestraProperty.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() userDto: UserDto) {
    console.log('createUser user.controller');
    return this.userService.createUser(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(OnlySameUserByIdAllowed)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    console.log('deleteUser user.controller');
    const response = await this.userService.deleteUser(id);
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(OnlySameUserByIdAllowed)
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() userDto: UserDto) {
    console.log('updateUser user.controller');
    return this.userService.updateUser(id, userDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(OnlySameUserByIdAllowed)
  @Put(':id/settings')
  changePassword(@Param('id') id: string, @Body() passwords: any) {
    console.log('changePassword user.controller');
    return this.userService.changePassword(id, passwords);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(OnlySameUserByIdAllowed)
  @Post(':id/instrument')
  addInstrumentToUser(
    @Param('id') id: string,
    @Body() instrument: InstrumentDto,
  ) {
    console.log('addInstrumentToUser user.controller');
    console.log(id);
    console.log(instrument);
    return this.userService.addInstrumentToUser(id, instrument);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(OnlySameUserByIdAllowed)
  @Put(':id/orchestra')
  addOrchestraToUser(
    @Param('id') id: string,
    @Body() orchestra: OrchestraPropertyDto,
  ) {
    console.log('addOrchestra user.controller');
    console.log(id);
    console.log(orchestra);
    return this.userService.addOrchestraToUser(id, orchestra);
  }
}
