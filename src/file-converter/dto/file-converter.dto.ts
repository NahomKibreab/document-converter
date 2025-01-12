import { Type } from 'class-transformer';
import {
  IsEnum,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { FileFormatType } from 'src/shared/enums/file.enum';
import { ValidateNestedSeparators } from '../decorators/validate-separators.decorator';
import { ValidateTargetFormat } from '../decorators/validate-target-format.decorator';

class SeparatorsDto {
  @IsString()
  @Length(1, 1, { message: 'segmentSeparator must be a single character' })
  segmentSeparator: string;

  @IsString()
  @Length(1, 1, { message: 'segmentSeparator must be a single character' })
  elementSeparator: string;
}

export class FileConverterDto {
  @IsString()
  fileId: string;

  @IsEnum(FileFormatType)
  @ValidateTargetFormat()
  targetFormat: FileFormatType;

  @IsOptional()
  @ValidateNested()
  @ValidateNestedSeparators()
  @Type(() => SeparatorsDto)
  separators?: SeparatorsDto;
}
