import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ClassTransformer } from 'class-transformer';
import { Request, Response } from 'express';
import { OrchestraDto } from './orchestra.dto';
import { Orchestra } from './orchestra.schema';
import { OrchestraService } from './orchestra.service';

@Controller('orchestra')
export class OrchestraController {
    constructor(private orchService: OrchestraService){}

    // return this.orchestraService.fetchOrchestra();


    @Get()
    async getAllOrchestras(@Req() request: Request) : Promise<Orchestra[]> {
        // console.log(request);
        const result: Orchestra[] = await this.orchService.getAllOrchestras();
        console.log(result);
        return result;
    }




    @Get(':id')
    getOrchestraById(@Param('id') id:string){
        console.log(id);
        return { id };
    }

    @Post()
    createOrchestra(@Body() new_data: OrchestraDto){

        return this.orchService.createNewOrchestra(new_data);

    // console.log(orchDto.orchestra_name, orchDto.creator_id);
    // this.orchestraService.createOrchestra(new_data);
    // return 1;
    
}




}