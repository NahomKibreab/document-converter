import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Dirent } from 'fs';
import * as fs from 'fs/promises';

import { FileFormatType } from '../shared/enums/file.enum';
import { ConversionContext } from './conversion-context';
import { FileConverterDto } from './dto/file-converter.dto';
import { FileConverterService } from './file-converter.service';
import { JsonToStringConverter } from './strategies/json-to-string.converter';
import { JsonToXmlConverter } from './strategies/json-to-xml.converter';
import { StringToJsonConverter } from './strategies/string-to-json.converter';
import { StringToXmlConverter } from './strategies/string-to-xml.converter';
import { XmlToJsonConverter } from './strategies/xml-to-json.converter';
import { XmlToStringConverter } from './strategies/xml-to-string.converter';

jest.mock('fs', () => ({
  promises: {
    readdir: jest.fn().mockResolvedValue(['file.json']),
    readFile: jest.fn().mockResolvedValue(Buffer.from('{"test": "result"}')),
  },
}));

describe('FileConverterService', () => {
  let service: FileConverterService;

  const mockResponse = {
    send: jest.fn(),
    set: jest.fn(),
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileConverterService,
        ConversionContext,
        JsonToStringConverter,
        JsonToXmlConverter,
        StringToJsonConverter,
        StringToXmlConverter,
        XmlToJsonConverter,
        XmlToStringConverter,
      ],
    }).compile();

    service = module.get<FileConverterService>(FileConverterService);

    jest.spyOn(service.conversionContext, 'setStrategy');
  });

  it('should convert document with valid input', async () => {
    const response = 'test*result~';

    jest.spyOn(service.conversionContext, 'convert').mockReturnValue(response);

    const dto: FileConverterDto = {
      targetFormat: FileFormatType.JSON_TO_STRING,
      fileId: 'file',
      separators: { segmentSeparator: '~', elementSeparator: '*' },
    };

    const result = await service.convertDocument(dto, mockResponse);

    expect(result).toBe(response);
    expect(service.conversionContext.setStrategy).toHaveBeenCalledWith(
      expect.any(JsonToStringConverter),
    );
    expect(service.conversionContext.convert).toHaveBeenCalledWith({
      segmentSeparator: '~',
      elementSeparator: '*',
      content: Buffer.from('{"test": "result"}'),
    });
  });

  it('should throw NotFoundException if file not found', async () => {
    jest.spyOn(fs, 'readdir').mockResolvedValueOnce([]);

    const dto: FileConverterDto = {
      targetFormat: FileFormatType.JSON_TO_XML,
      fileId: 'file1',
    };

    await expect(service.convertDocument(dto, mockResponse)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw BadRequestException if file has invalid extension', async () => {
    jest
      .spyOn(fs, 'readdir')
      .mockResolvedValueOnce([{ name: 'file1.json' } as Dirent]);

    const dto: FileConverterDto = {
      targetFormat: FileFormatType.XML_TO_JSON,
      fileId: 'file',
    };

    await expect(service.convertDocument(dto, mockResponse)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should call remove method', () => {
    const result = service.remove(1);
    expect(result).toBe('This action removes a #1 fileConverter');
  });
});
