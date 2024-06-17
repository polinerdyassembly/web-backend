import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostDto {
  @IsString()
  @IsNotEmpty()
  @Expose()
  title: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  @Expose()
  category: number;

  @IsString()
  @IsNotEmpty()
  @Expose()
  slug: string;
}
