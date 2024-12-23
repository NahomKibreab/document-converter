import { ConversionStrategy } from '../interfaces/conversion-strategy.interface';

export interface StringToJsonConverterInput {
  segmentSeparator: string;
  elementSeparator: string;
  content: string;
}

export class StringToJsonConverter implements ConversionStrategy {
  convert(input: StringToJsonConverterInput): object {
    const { segmentSeparator, elementSeparator, content } = input;
    const segments = content.split(segmentSeparator);

    const result = {};

    segments.forEach((segment) => {
      const elements = segment.split(elementSeparator);

      console.log('elements', elements);
      const segmentName = elements[0];
      const segmentData = {};

      for (let i = 1; i < elements.length; i++) {
        segmentData[`${segmentName}${i}`] = elements[i];
      }

      if (!segmentName) {
        return;
      }

      if (!result[segmentName]) {
        result[segmentName] = [];
      }
      result[segmentName].push(segmentData);
    });

    return result;
  }
}
