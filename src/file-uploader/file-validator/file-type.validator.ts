import { BadRequestException, FileValidator } from '@nestjs/common';
import { IFile } from '@nestjs/common/pipes/file/interfaces';
import { fromBuffer } from 'file-type';
import { FileFormatExtension } from 'src/shared/enums/file.enum';

export type FileTypeValidatorOptions = {
  fileType: FileFormatExtension[];
};

export class FileTypeValidator extends FileValidator<
  FileTypeValidatorOptions,
  Express.Multer.File
> {
  buildErrorMessage(file?: IFile): string {
    if (file?.mimetype) {
      return `Validation failed (current file type is ${file.mimetype}, expected type is ${this.validationOptions.fileType})`;
    }
    return `Validation failed (expected type is ${this.validationOptions.fileType})`;
  }

  async isValid(file?: Express.Multer.File): Promise<boolean> {
    if (!this.validationOptions || !file) {
      throw new BadRequestException('Validation options or file is missing');
    }

    const fileType = await fromBuffer(file.buffer);

    const fileExtension = file.originalname
      .split('.')
      .pop() as FileFormatExtension;

    if (
      (fileType &&
        this.validationOptions.fileType.includes(
          fileType.ext as FileFormatExtension,
        )) ||
      this.validationOptions.fileType.includes(fileExtension)
    ) {
      return true;
    }

    return false;
  }
}
