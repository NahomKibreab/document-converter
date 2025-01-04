import { XMLParser } from 'fast-xml-parser';
import {
  ConversionStrategy,
  ConversionStrategyInput,
} from '../interfaces/conversion-strategy.interface';

export class XmlToJsonConverter implements ConversionStrategy {
  convert(input: ConversionStrategyInput): object {
    const { content } = input;

    // Convert Buffer to string
    const xmlString = content.toString('utf8');

    // Create an instance of XMLParser
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });

    // Parse the XML string to JSON
    const jsonObj = parser.parse(xmlString);

    // Convert all values to strings
    const convertValuesToString = (obj: any): any => {
      if (typeof obj === 'object' && obj !== null) {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            obj[key] = convertValuesToString(obj[key]);
          }
        }
      } else if (typeof obj !== 'string') {
        return String(obj);
      }
      return obj;
    };

    const result = convertValuesToString(jsonObj['root']);
    return result;
  }
}
