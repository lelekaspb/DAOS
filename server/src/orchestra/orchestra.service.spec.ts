import { Test, TestingModule } from '@nestjs/testing';
import { OrchestraService } from './orchestra.service';

describe('OrchestraService', () => {
  let service: OrchestraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrchestraService],
    }).compile();

    service = module.get<OrchestraService>(OrchestraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
