import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Delete,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { OrchestraDto } from './orchestra.dto';
import { Orchestra } from './orchestra.schema';
import { OrchestraService } from './orchestra.service';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { OnlySameUserByIdAllowed } from './../auth/user.interceptor';

@Controller('orchestra')
export class OrchestraController {
  constructor(private orchService: OrchestraService) {}

  @Get()
  async getAllOrchestras(@Req() request: Request): Promise<Orchestra[]> {
    const result: Orchestra[] = await this.orchService.getAllOrchestras();
    return result;
  }

  @Get(':id')
  getOrchestraById(@Param('id') id: string) {
    console.log(id);
    return { id };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createOrchestra(@Body() new_data: OrchestraDto) {
    console.log('createOrchestra orchestra.controller');
    return this.orchService.createNewOrchestra(new_data);
  }

  @UseGuards(JwtAuthGuard)
  // create another interceptor that will check whether  creator id is equal to id from token
  @Delete(':id')
  async deleteOrchestra(@Param('id') id: string) {
    console.log('deleteOrchestra orchestra.controller');
    return await this.orchService.deleteOrchestra(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateOrchestra(@Param('id') id: string, @Body() OrchestraDto: OrchestraDto) {
    return this.orchService.updateOrchestra(id, OrchestraDto);
  }

  @UseGuards(JwtAuthGuard)
  // create another interceptor that will check whether  creator id is equal to id from token
  @Put(':id/members')
  addMember(@Param('id') id: string, @Body() user: any): Promise<Orchestra> {
    return this.orchService.addMember(id, user.id);
  }

  @UseGuards(JwtAuthGuard)
  // create another interceptor that will check whether  creator id is equal to id from token
  @Delete(':id/members/:userId')
  deleteMember(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ): Promise<Orchestra> {
    return this.orchService.deleteMember(id, userId);
  }
}
