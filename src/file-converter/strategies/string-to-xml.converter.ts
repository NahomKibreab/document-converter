import { ConversionStrategy } from '../interfaces/conversion-strategy.interface';

export interface StringToXmlConverterInput {
  segmentSeparator: string;
  elementSeparator: string;
  content: string;
}

export class StringToXmlConverter implements ConversionStrategy {
  convert(input: StringToXmlConverterInput): any {
    const { segmentSeparator, elementSeparator, content } = input;
    const segments = content.split(segmentSeparator);

    let xmlOutput = '<?xml version="1.0" encoding="UTF-8" ?>\n<root>\n';

    segments.forEach((segment) => {
      const elements = segment.split(elementSeparator);
      const segmentName = elements[0];
      if (!segmentName) {
        return;
      }

      xmlOutput += `  <${segmentName}>\n`;

      for (let i = 1; i < elements.length; i++) {
        xmlOutput += `    <${segmentName}${i}>${elements[i]}</${segmentName}${i}>\n`;
      }

      xmlOutput += `  </${segmentName}>\n`;
    });

    xmlOutput += '</root>';
    return xmlOutput;
  }
}
