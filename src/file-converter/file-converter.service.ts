import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import { join } from 'path';
import { ConversionContext } from './conversion-context';
import { FileConverterDto, FileFormatType } from './dto/file-converter.dto';
import { JsonToStringConverter } from './strategies/json-to-string.converter';
import { StringToJsonConverter } from './strategies/string-to-json.converter';
import { StringToXmlConverter } from './strategies/string-to-xml.converter';

@Injectable()
export class FileConverterService {
  private conversionContext: ConversionContext;

  constructor() {
    this.conversionContext = new ConversionContext();
  }

  convertDocument(input: FileConverterDto, res: Response) {
    const { targetFormat, fileId, separators } = input;
    const readFilePath = join(process.cwd(), `upload/${fileId}`);
    const content = fs.readFileSync(readFilePath, 'utf8');

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
        const result = this.conversionContext.convert({
          segmentSeparator: separators.segmentSeparator,
          elementSeparator: separators.elementSeparator,
          content,
        });

        res.set('Content-Type', 'application/xml');

        return res.send(result);
      case FileFormatType.JSON_TO_STRING:
        this.conversionContext.setStrategy(new JsonToStringConverter());
        return this.conversionContext.convert({
          segmentSeparator: separators.segmentSeparator,
          elementSeparator: separators.elementSeparator,
          content,
        });
    }
  }

  remove(id: number) {
    return `This action removes a #${id} fileConverter`;
  }
}
