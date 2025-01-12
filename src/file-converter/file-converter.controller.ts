import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Res,
  UseFilters,
} from '@nestjs/common';
import { Response } from 'express';
import { DeleteFileOnErrorFilter } from 'src/file-converter/filters/delete-file-on-error.filter';
import { FileFormatType } from 'src/shared/enums/file.enum';
import { FileConverterDto } from './dto/file-converter.dto';
import { FileConverterService } from './file-converter.service';

@Controller('convert')
export class FileConverterController {
  constructor(private readonly fileConverterService: FileConverterService) {}
  private readonly validXmlFormats = [
    FileFormatType.JSON_TO_XML,
    FileFormatType.STRING_TO_XML,
  ];

  @Post()
  @UseFilters(new DeleteFileOnErrorFilter())
  async convert(
    @Body() createFileConverterDto: FileConverterDto,
    @Res() res: Response,
  ) {
    console.log(createFileConverterDto);

    const result = await this.fileConverterService.convertDocument(
      createFileConverterDto,
      res,
    );

    if (this.validXmlFormats.includes(createFileConverterDto.targetFormat)) {
      res.set('Content-Type', 'application/xml');
      return res.send(result);
    }

    return res.send(result);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileConverterService.remove(+id);
  }
}
