import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileUploaderController } from './file-uploader.controller';
import { FileUploaderService } from './file-uploader.service';

@Module({
  controllers: [FileUploaderController],
  providers: [FileUploaderService],
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
  ],
})
export class FileUploaderModule {}
