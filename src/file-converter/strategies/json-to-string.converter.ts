import { DocumentInput } from 'src/interfaces/document.interface';
import { ConversionStrategy } from '../interfaces/conversion-strategy.interface';

export class JsonToStringConverter implements ConversionStrategy {
  convert(input: DocumentInput): string {
    console.log('Converting JSON to string...', input);
    const { content, segmentSeparator, elementSeparator } = input;

    const jsonObject = JSON.parse(content);
    let result = '';

    Object.keys(jsonObject).forEach((key) => {
      const segments = jsonObject[key];
      segments.forEach((segment: Record<string, string>) => {
        const elements = Object.values(segment);
        result += `${key}${elementSeparator}${elements.join(elementSeparator)}${segmentSeparator}`;
      });
    });

    // Remove the trailing segment separator
    if (result.endsWith(segmentSeparator)) {
      result = result.slice(0, -segmentSeparator.length);
    }

    return result;
  }
}
