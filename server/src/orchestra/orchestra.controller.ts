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
import {
  OnlyOrchestraCreatorAllowed,
  CanOnlyAddThemselvesAsMember,
} from './../auth/user.interceptor';

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
    return { id };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createOrchestra(@Body() new_data: OrchestraDto) {
    return this.orchService.createNewOrchestra(new_data);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(OnlyOrchestraCreatorAllowed)
  @Delete(':id')
  async deleteOrchestra(@Param('id') id: string) {
    return await this.orchService.deleteOrchestra(id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(OnlyOrchestraCreatorAllowed)
  @Put(':id')
  updateOrchestra(@Param('id') id: string, @Body() OrchestraDto: OrchestraDto) {
    return this.orchService.updateOrchestra(id, OrchestraDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(CanOnlyAddThemselvesAsMember)
  @Put(':id/members')
  addMember(@Param('id') id: string, @Body() user: any): Promise<Orchestra> {
    return this.orchService.addMember(id, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(CanOnlyAddThemselvesAsMember)
  @Delete(':id/members/:userId')
  deleteMember(
    @Param('id') id: string,
    @Param('userId') userId: string,
  ): Promise<Orchestra> {
    return this.orchService.deleteMember(id, userId);
  }
}
