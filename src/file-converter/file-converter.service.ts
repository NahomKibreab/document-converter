import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Response } from 'express';
import { promises as fs } from 'fs';
import { join } from 'path';
import { FileFormatType } from '../shared/enums/file.enum';
import { getAllowedFileExtension } from '../shared/utils/file-format-mapper.util';
import { ConversionContext } from './conversion-context';
import { FileConverterDto } from './dto/file-converter.dto';
import { JsonToStringConverter } from './strategies/json-to-string.converter';
import { JsonToXmlConverter } from './strategies/json-to-xml.converter';
import { StringToJsonConverter } from './strategies/string-to-json.converter';
import { StringToXmlConverter } from './strategies/string-to-xml.converter';
import { XmlToJsonConverter } from './strategies/xml-to-json.converter';
import { XmlToStringConverter } from './strategies/xml-to-string.converter';

@Injectable()
export class FileConverterService {
  conversionContext: ConversionContext;

  constructor() {
    this.conversionContext = new ConversionContext();
  }

  async convertDocument(input: FileConverterDto, res: Response) {
    const { targetFormat, fileId, separators } = input;

    const uploadDir = join(process.cwd(), 'upload');
    const files = await fs.readdir(uploadDir);

    const fileName = files.find((file) => file.startsWith(fileId));
    const allowFileExtention = getAllowedFileExtension(targetFormat);

    if (!fileName) {
      throw new NotFoundException(`File with ID ${fileId} not found`);
    }

    if (!fileName.endsWith(`.${allowFileExtention}`)) {
      throw new BadRequestException(
        `File with ID ${fileId} has invalid format. Expected .${allowFileExtention} file extension`,
      );
    }

    const readFilePath = join(uploadDir, fileName);
    const content = await fs.readFile(readFilePath);

    try {
      switch (targetFormat) {
        case FileFormatType.STRING_TO_JSON:
          this.conversionContext.setStrategy(new StringToJsonConverter());
          return this.conversionContext.convert({
            segmentSeparator: separators.segmentSeparator,
            elementSeparator: separators.elementSeparator,
            content,
          });
        case FileFormatType.STRING_TO_XML:
          this.conversionContext.setStrategy(new StringToXmlConverter());
          const xmlConversionResult = this.conversionContext.convert({
            segmentSeparator: separators.segmentSeparator,
            elementSeparator: separators.elementSeparator,
            content,
          });

          res.set('Content-Type', 'application/xml');

          return res.send(xmlConversionResult);
        case FileFormatType.JSON_TO_STRING:
          this.conversionContext.setStrategy(new JsonToStringConverter());
          return this.conversionContext.convert({
            segmentSeparator: separators.segmentSeparator,
            elementSeparator: separators.elementSeparator,
            content,
          });
        case FileFormatType.XML_TO_STRING:
          this.conversionContext.setStrategy(new XmlToStringConverter());
          return this.conversionContext.convert({
            content,
            elementSeparator: separators.elementSeparator,
            segmentSeparator: separators.segmentSeparator,
          });

        case FileFormatType.JSON_TO_XML:
          this.conversionContext.setStrategy(new JsonToXmlConverter());
          return this.conversionContext.convert({
            content,
          });

        case FileFormatType.XML_TO_JSON:
          this.conversionContext.setStrategy(new XmlToJsonConverter());
          return this.conversionContext.convert({
            content,
          });
      }
    } catch {
      throw new UnprocessableEntityException(
        `FileId ${fileId} deleted! A corrupted/unsupported file format not allowed, please try to upload new file.`,
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} fileConverter`;
  }
}
