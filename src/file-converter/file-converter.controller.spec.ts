import { Test, TestingModule } from '@nestjs/testing';
import { FileConverterController } from './file-converter.controller';
import { FileConverterService } from './file-converter.service';

describe('FileConverterController', () => {
  let controller: FileConverterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileConverterController],
      providers: [FileConverterService],
    }).compile();

    controller = module.get<FileConverterController>(FileConverterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
