import {
  ConversionStrategy,
  ConversionStrategyInput,
} from '../interfaces/conversion-strategy.interface';

export class JsonToStringConverter implements ConversionStrategy {
  convert(input: ConversionStrategyInput): string {
    const { content, segmentSeparator, elementSeparator } = input;

    const jsonObject = JSON.parse(content.toString());

    const segments: string[] = [];

    for (const [key, values] of Object.entries(jsonObject)) {
      this.processValues(key, values as any[], segments, elementSeparator);
    }

    return segments.join(segmentSeparator);
  }

  private processValues(
    key: string,
    values: any[],
    segments: string[],
    elementSeparator: string,
  ) {
    if (Array.isArray(values)) {
      for (const element of values) {
        this.processObject(key, element, segments, elementSeparator);
      }
    }
  }

  private processObject(
    key: string,
    element: any,
    segments: string[],
    elementSeparator: string,
  ) {
    const elements = Object.values(element).join(elementSeparator);
    const segment = `${key}${elementSeparator}${elements}`;
    segments.push(segment);
  }
}
