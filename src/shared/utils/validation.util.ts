import { FileFormatType } from '../enums/file.enum';

export const isSeparatorRequired = (targetFormat: FileFormatType): boolean => {
  switch (targetFormat) {
    case FileFormatType.JSON_TO_STRING:
    case FileFormatType.STRING_TO_JSON:
    case FileFormatType.XML_TO_STRING:
    case FileFormatType.STRING_TO_XML:
      return true;
    default:
      return false;
  }
};
