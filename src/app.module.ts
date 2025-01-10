import { Module } from '@nestjs/common';
import { FileConverterModule } from './file-converter/file-converter.module';
import { FileUploaderModule } from './file-uploader/file-uploader.module';

@Module({
  imports: [FileUploaderModule, FileConverterModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
