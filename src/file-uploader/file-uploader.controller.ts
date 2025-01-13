import {
  Controller,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileFormatExtension } from '../shared/enums/file.enum';
import { FileUploaderService } from './file-uploader.service';
import { FileTypeValidator } from './validator/file-type.validator';

@Controller()
export class FileUploaderController {
  constructor(private readonly fileUploaderService: FileUploaderService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('fileName'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10e5 }), // maximum file size 1MB
          new FileTypeValidator({
            fileType: Object.values(FileFormatExtension),
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const fileId = await this.fileUploaderService.saveFile(file);

    return {
      fileId,
      originalFileName: file.originalname,
      fileType: file.mimetype,
    };
  }
}
