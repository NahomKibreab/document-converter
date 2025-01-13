import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import 'reflect-metadata';
import { FileFormatType } from '../../shared/enums/file.enum';
import { FileConverterDto } from './file-converter.dto';

describe('FileConverterDto', () => {
  it('should validate valid input data', async () => {
    const inputData = {
      fileId: 'fileId',
      targetFormat: FileFormatType.STRING_TO_XML,
      separators: {
        segmentSeparator: '~',
        elementSeparator: '*',
      },
    };

    const fileConverterDto = plainToInstance(FileConverterDto, inputData);
    const errors = await validate(fileConverterDto);

    expect(errors).toHaveLength(0);
  });

  it('should return validation errors for invalid data', async () => {
    const inputData = {
      fileId: 'fileId',
      targetFormat: 'unknown' as FileFormatType,
    };

    const fileConverterDto = plainToInstance(FileConverterDto, inputData);
    const errors = await validate(fileConverterDto);

    expect(errors).toHaveLength(1);
  });

  it('should return errors if separators field missed while parsing text file', async () => {
    const inputData = {
      fileId: 'fileId',
      targetFormat: FileFormatType.STRING_TO_XML,
    };

    const fileConverterDto = plainToInstance(FileConverterDto, inputData);
    const errors = await validate(fileConverterDto);

    expect(errors).toHaveLength(1);
  });
});
