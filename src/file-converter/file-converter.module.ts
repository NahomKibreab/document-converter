import { Module } from '@nestjs/common';
import { FileConverterService } from './file-converter.service';
import { FileConverterController } from './file-converter.controller';

@Module({
  controllers: [FileConverterController],
  providers: [FileConverterService],
})
export class FileConverterModule {}
