import { FileFormatExtension, FileFormatType } from '../enums/file.enum';

const FileFormatTypeToExtensionMap: {
  [key in FileFormatType]: FileFormatExtension;
} = {
  [FileFormatType.JSON_TO_STRING]: FileFormatExtension.JSON,
  [FileFormatType.JSON_TO_XML]: FileFormatExtension.JSON,
  [FileFormatType.STRING_TO_JSON]: FileFormatExtension.STRING,
  [FileFormatType.STRING_TO_XML]: FileFormatExtension.STRING,
  [FileFormatType.XML_TO_STRING]: FileFormatExtension.XML,
  [FileFormatType.XML_TO_JSON]: FileFormatExtension.XML,
};

export const getAllowedFileExtension = (fileFormatType: FileFormatType) =>
  FileFormatTypeToExtensionMap[fileFormatType];
