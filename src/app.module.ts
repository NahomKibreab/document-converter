import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { FileConverterModule } from './file-converter/file-converter.module';
import { FileUploaderModule } from './file-uploader/file-uploader.module';

@Module({
  imports: [FileUploaderModule, FileConverterModule],
  controllers: [],
  providers: [
    AppService,
    // StringToJsonConverter,
    // StringToXmlConverter,
    // JsonToStringConverter,
    // JsonToXmlConverter,
    // XmlToStringConverter,
    // XmlToJsonConverter,
  ],
})
export class AppModule {}
