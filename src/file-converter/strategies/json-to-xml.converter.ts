import { XMLBuilder } from 'fast-xml-parser';
import {
  ConversionStrategy,
  ConversionStrategyInput,
} from '../interfaces/conversion-strategy.interface';

export class JsonToXmlConverter implements ConversionStrategy {
  convert(input: ConversionStrategyInput): string {
    const { content } = input;

    const jsonData = JSON.parse(content.toString());

    // Wrap the JSON data with a root element
    const wrappedJsonData = { root: jsonData };

    const builder = new XMLBuilder({
      ignoreAttributes: false,
      format: true,
      indentBy: '  ',
      suppressEmptyNode: true,
    });

    const xmlContent = builder.build(wrappedJsonData);
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8" ?>\n';
    const xml = xmlHeader + xmlContent;

    return xml;
  }
}
