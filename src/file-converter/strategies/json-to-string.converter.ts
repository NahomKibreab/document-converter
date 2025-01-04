import { ConversionStrategyInput } from '../interfaces/conversion-strategy.interface';

export class JsonToStringConverter {
  convert(input: ConversionStrategyInput): string {
    const { content, segmentSeparator, elementSeparator } = input;

    const jsonObject = JSON.parse(content.toString());
    let result = '';

    for (const key in jsonObject) {
      if (jsonObject.hasOwnProperty(key)) {
        const values = jsonObject[key] as any[];
        for (const obj of values) {
          result += `${key}${elementSeparator}${Object.values(obj).join(
            elementSeparator,
          )}${segmentSeparator}`;
        }
      }
    }

    return result;
  }
}
