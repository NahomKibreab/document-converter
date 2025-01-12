import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { FileUploaderController } from './file-uploader.controller';
import { FileUploaderService } from './file-uploader.service';

@Module({
  controllers: [FileUploaderController],
  providers: [FileUploaderService],
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: memoryStorage(),
      }),
    }),
  ],
})
export class FileUploaderModule {}
