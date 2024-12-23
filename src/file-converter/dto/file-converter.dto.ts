export enum FileFormatType {
  STRING_TO_JSON = 'STRING_TO_JSON',
  STRING_TO_XML = 'STRING_TO_XML',
  XML_TO_STRING = 'XML_TO_STRING',
  JSON_TO_STRING = 'JSON_TO_STRING',
  XML_TO_JSON = 'XML_TO_JSON',
  JSON_TO_XML = 'JSON_TO_XML',
}

export class FileConverterDto {
  fileId: string;
  targetFormat: FileFormatType;
  separators?: {
    segmentSeparator: string;
    elementSeparator: string;
  };
}
