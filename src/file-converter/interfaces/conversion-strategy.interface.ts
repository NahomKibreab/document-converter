export interface ConversionStrategyInput {
  content: Buffer;
  segmentSeparator?: string;
  elementSeparator?: string;
}

export interface ConversionStrategy {
  convert(input: ConversionStrategyInput): any;
}
