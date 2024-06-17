import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  slug: string;

  @IsString()
  @IsOptional()
  @Expose()
  description: string;
}
