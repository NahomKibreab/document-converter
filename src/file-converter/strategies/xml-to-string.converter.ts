import { XMLParser } from 'fast-xml-parser';
import {
  ConversionStrategy,
  ConversionStrategyInput,
} from '../interfaces/conversion-strategy.interface';

export class XmlToStringConverter implements ConversionStrategy {
  private parser: XMLParser;

  constructor() {
    this.parser = new XMLParser();
  }

  convert(input: ConversionStrategyInput): string {
    const { content, segmentSeparator, elementSeparator } = input;
    const xmlToJsonResult = this.parser.parse(content);

    const segments: string[] = [];

    this.processObject(xmlToJsonResult.root, segments, elementSeparator);

    return segments.join(segmentSeparator) + segmentSeparator;
  }

  private processObject(
    inputData: any,
    segments: string[],
    elementSeparator: string,
  ) {
    for (const [key, value] of Object.entries(inputData)) {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          this.processObject({ [key]: item }, segments, elementSeparator);
        });

        continue;
      }

      if (typeof value === 'object') {
        const elements = Object.values(value).join(elementSeparator);
        segments.push(`${key}${elementSeparator}${elements}`);

        continue;
      }

      segments.push(`${key}${elementSeparator}${value}`);
    }
  }
}
