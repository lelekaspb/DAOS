import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrchestraController } from './orchestra.controller';
import { Orchestra, OrchestraSchema } from './orchestra.schema';
import { OrchestraService } from './orchestra.service';

@Module({
  imports: [
    MongooseModule.forFeature(
        [{ name: Orchestra.name, schema: OrchestraSchema}]
    )
  ],
  controllers: [OrchestraController],
  providers: [OrchestraService],
  exports:[OrchestraService]
})
export class OrchestraModule {}



