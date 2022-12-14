import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { IUploadFile } from '../base/upload.interface';

export class BrandUpdateDTO {
  @ApiProperty({
    description: 'Brand Name',
    example: 'Apple',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Brand Logo',
    example: '',
    type: String,
    format: 'binary',
    required: false,
  })
  @IsOptional()
  logo: IUploadFile;

  @ApiPropertyOptional({
    description: 'Brand Banner Image',
    example: '',
    type: String,
    format: 'binary',
    required: false,
  })
  @IsOptional()
  banner: IUploadFile;
}
