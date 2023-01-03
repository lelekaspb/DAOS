import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './../user/user.module';
import { OrchestraController } from './orchestra.controller';
import { Orchestra, OrchestraSchema } from './orchestra.schema';
import { OrchestraService } from './orchestra.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Orchestra.name, schema: OrchestraSchema },
    ]),
    forwardRef(() => UserModule),
  ],
  controllers: [OrchestraController],
  providers: [OrchestraService],
  exports: [OrchestraService],
})
export class OrchestraModule {}
