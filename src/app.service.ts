import { Injectable } from '@nestjs/common';
import { ConvertDocumentDto } from './dto/convert-document.dto';

@Injectable()
export class AppService {
  convertDocument(dto: ConvertDocumentDto): any {
    const { sourceFormat, targetFormat, segmentSeparator, elementSeparator } =
      dto;

    let convertedDocument;

    // switch (sourceFormat) {
    //   case 'string':
    //     if (targetFormat === 'json') {
    //       const stringToJson = new StringToJsonConverter();
    //       convertedDocument = stringToJson.convert(
    //         inputDocument,
    //         segmentSeparator,
    //         elementSeparator,
    //       );
    //     } else if (targetFormat === 'xml') {
    //       // const stringToXml = new StringToXmlConverter();
    //       // convertedDocument = stringToXml.convert(
    //       //   inputDocument,
    //       //   segmentSeparator,
    //       //   elementSeparator,
    //       // );
    //     }
    //     break;

    //   case 'json':
    //     if (targetFormat === 'string') {
    //       const jsonToString = new JsonToStringConverter();
    //       convertedDocument = jsonToString.convert(inputDocument);
    //     } else if (targetFormat === 'xml') {
    //       // const jsonToXml = new JsonToXmlConverter();
    //       // convertedDocument = jsonToXml.convert(inputDocument);
    //     }
    //     break;

    //   case 'xml':
    //     if (targetFormat === 'string') {
    //       const xmlToString = new XmlToStringConverter();
    //       convertedDocument = xmlToString.convert(inputDocument);
    //     } else if (targetFormat === 'json') {
    //       // const xmlToJson = new XmlToJsonConverter();
    //       // convertedDocument = xmlToJson.convert(inputDocument);
    //     }
    //     break;

    //   default:
    //     throw new Error('Unsupported source format');
    // }

    return convertedDocument;
  }
}
