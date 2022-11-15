import { Test, TestingModule } from '@nestjs/testing';
import { OrchestraController } from './orchestra.controller';

describe('OrchestraController', () => {
  let controller: OrchestraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrchestraController],
    }).compile();

    controller = module.get<OrchestraController>(OrchestraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
