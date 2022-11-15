import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';

import { AppService } from './app.service';
import { OrchestraModule } from './orchestra/orchestra.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/Orchestra'),
    OrchestraModule
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
