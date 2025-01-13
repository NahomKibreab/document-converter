import {
  ConversionStrategy,
  ConversionStrategyInput,
} from '../interfaces/conversion-strategy.interface';

interface JsonResult {
  [key: string]: Array<{ [key: string]: string }>;
}

export class StringToJsonConverter implements ConversionStrategy {
  convert(input: ConversionStrategyInput): JsonResult {
    const { segmentSeparator, elementSeparator, content } = input;
    const contentString = content.toString();
    const segments = contentString.split(segmentSeparator);

    const jsonResult: { [key: string]: any[] } = {};

    segments.forEach((segment) => {
      const elements = segment.split(elementSeparator);
      const segmentName = elements[0];
      const segmentObject: { [key: string]: string } = {};

      if (!segmentName) {
        return;
      }

      for (let i = 1; i < elements.length; i++) {
        segmentObject[segmentName + i] = elements[i];
      }

      if (!jsonResult[segmentName]) {
        jsonResult[segmentName] = [];
      }
      jsonResult[segmentName].push(segmentObject);
    });

    return jsonResult;
  }
}
