import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { promises as fs } from 'fs';
import { join } from 'path';
import { FileFormatType } from 'src/shared/enums/file.enum';
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
  private conversionContext: ConversionContext;

  constructor() {
    this.conversionContext = new ConversionContext();
  }

  async convertDocument(input: FileConverterDto, res: Response) {
    const { targetFormat, fileId, separators } = input;
    console.log('convertDocument - input', input);
    const readFilePath = join(process.cwd(), `upload/${fileId}`);
    const content = await fs.readFile(readFilePath);

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
  }

  remove(id: number) {
    return `This action removes a #${id} fileConverter`;
  }
}
