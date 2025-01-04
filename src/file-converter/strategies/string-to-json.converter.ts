import {
  ConversionStrategy,
  ConversionStrategyInput,
} from '../interfaces/conversion-strategy.interface';

export class StringToJsonConverter implements ConversionStrategy {
  convert(input: ConversionStrategyInput): object {
    const { segmentSeparator, elementSeparator, content } = input;
    const contentString = content.toString();
    const segments = contentString.split(segmentSeparator);

    const result = {};

    segments.forEach((segment) => {
      const elements = segment.split(elementSeparator);
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
