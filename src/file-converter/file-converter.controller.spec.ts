import { Test, TestingModule } from '@nestjs/testing';
import { FileFormatType } from '../shared/enums/file.enum';
import { FileConverterController } from './file-converter.controller';
import { FileConverterService } from './file-converter.service';

describe('FileConverterController', () => {
  let controller: FileConverterController;
  let fileConverterService: FileConverterService;

  const result = 'test*result~';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileConverterController],
      providers: [FileConverterService],
    }).compile();

    controller = module.get<FileConverterController>(FileConverterController);
    fileConverterService =
      module.get<FileConverterService>(FileConverterService);

    jest
      .spyOn(fileConverterService, 'convertDocument')
      .mockImplementation(() => Promise.resolve(result));
  });

  it('should convert service method with valid input', async () => {
    const inputDto = {
      fileId: 'fileId',
      targetFormat: FileFormatType.STRING_TO_JSON,
      separators: {
        segmentSeparator: '~',
        elementSeparator: '*',
      },
    };

    const res = {
      send: jest.fn().mockReturnValue(result),
      set: jest.fn(),
    } as any;

    expect(await controller.convert(inputDto, res)).toBe(result);
  });
});
