import { XMLParser } from 'fast-xml-parser';
import {
  ConversionStrategy,
  ConversionStrategyInput,
} from '../interfaces/conversion-strategy.interface';

export class XmlToJsonConverter implements ConversionStrategy {
  private parser: XMLParser;

  constructor() {
    this.parser = new XMLParser();
  }

  convert(input: ConversionStrategyInput): object {
    const { content } = input;

    const xmlToJsonResult = this.parser.parse(content.toString('utf8'));

    const result = this.convertValuesToString(xmlToJsonResult['root']);
    return result;
  }

  private convertValuesToString(inputData: any): any {
    if (Array.isArray(inputData)) {
      return inputData.map((item) => this.convertValuesToString(item));
    }

    if (typeof inputData === 'object' && inputData !== null) {
      return this.convertObjectValuesToString(inputData);
    }

    if (typeof inputData !== 'string') {
      return inputData.toString();
    }
    return inputData;
  }

  private convertObjectValuesToString(obj: any): any {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      acc[key] = this.convertValuesToString(value);
      return acc;
    }, {} as any);
  }
}
