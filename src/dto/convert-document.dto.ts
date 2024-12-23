export type DocumentFormat = 'string' | 'json' | 'xml';

export class ConvertDocumentDto {
  sourceFormat: DocumentFormat;
  targetFormat: DocumentFormat;
  segmentSeparator?: string;
  elementSeparator?: string;
}
