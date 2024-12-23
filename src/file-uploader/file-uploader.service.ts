import { Injectable } from '@nestjs/common';

@Injectable()
export class FileUploaderService {
  getFileId(file: Express.Multer.File) {
    return file.filename;
  }

  getFileName(file: Express.Multer.File) {
    return file.originalname;
  }

  getFileType(file: Express.Multer.File) {
    console.log(file.mimetype);
    return file.mimetype;
  }
}
