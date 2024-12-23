import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploaderDto } from './dto/file-uploader.dto';
import { FileUploaderService } from './file-uploader.service';

@Controller()
export class FileUploaderController {
  constructor(private readonly fileUploaderService: FileUploaderService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  uploadFile(
    @Body() body: FileUploaderDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    return {
      body,
      fileId: this.fileUploaderService.getFileId(file),
      fileName: this.fileUploaderService.getFileName(file),
      fileType: this.fileUploaderService.getFileType(file),
    };
  }
}
