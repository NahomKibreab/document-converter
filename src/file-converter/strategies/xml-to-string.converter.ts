import { XMLParser } from 'fast-xml-parser';
import {
  ConversionStrategy,
  ConversionStrategyInput,
} from '../interfaces/conversion-strategy.interface';

export class XmlToStringConverter implements ConversionStrategy {
  convert(input: ConversionStrategyInput): string {
    const { content, segmentSeparator, elementSeparator } = input;
    const parser = new XMLParser();
    const jObj = parser.parse(content);

    const segments: string[] = [];

    const processObject = (obj: any, parentKey: string) => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];
          if (Array.isArray(value)) {
            value.forEach((item: any) => {
              const elements: string[] = [];
              for (const subKey in item) {
                if (item.hasOwnProperty(subKey)) {
                  elements.push(
                    item[subKey] !== undefined ? item[subKey] : ' ',
                  );
                }
              }

              segments.push(
                `${parentKey}${key}${elementSeparator}${elements.join(elementSeparator)}${segmentSeparator}`,
              );
            });
          } else if (typeof value === 'object') {
            const elements = Object.values(value);

            segments.push(
              `${parentKey}${key}${elementSeparator}${elements.join(elementSeparator)}${segmentSeparator}`,
            );
          } else {
            segments.push(
              `${parentKey}${key}${elementSeparator}${value}${segmentSeparator}`,
            );
          }
        }
      }
    };

    processObject(jObj['root'], '');

    // Remove the trailing segment separator
    if (segments.length > 0 && segments[segments.length - 1].endsWith('~')) {
      segments[segments.length - 1] = segments[segments.length - 1].slice(
        0,
        -1,
      );
    }

    return segments.join('') + segmentSeparator;
  }
}
