import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { join } from 'path';

@Injectable()
export class FileUploaderService {
  async saveFile(file: Express.Multer.File) {
    const uploadDir = join(process.cwd(), 'upload');
    const fileExtension = file.originalname.split('.').pop();
    const uniqueIdentifier = `${Date.now()}${Math.round(Math.random() * 1e9)}`;
    const newFileName = `${uniqueIdentifier}.${fileExtension}`;
    const uploadPath = join(uploadDir, newFileName);

    try {
      await fs.mkdir(uploadDir, { recursive: true });
      await fs.writeFile(uploadPath, file.buffer);

      return uniqueIdentifier;
    } catch (error) {
      throw new BadRequestException('Failed to save file', error);
    }
  }
}
