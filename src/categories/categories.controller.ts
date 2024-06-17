import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './categories.dto';
import { plainToClass } from 'class-transformer';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  public async getAllCategories(): Promise<object> {
    const res = await this.categoriesService.getAllCategories();
    return {
      total: res.count,
      data: res.rows,
    };
  }

  @Get(':id')
  public async getCategoryById(id: number): Promise<object> {
    return await this.categoriesService.getCategoryById(id);
  }

  @Get('slug/:slug')
  public async getCategoryBySlug(slug: string): Promise<object> {
    return await this.categoriesService.getCategoryBySlug(slug);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public async createCategory(@Body() data: CategoryDto): Promise<object> {
    data = plainToClass(CategoryDto, data, { excludeExtraneousValues: true });
    return await this.categoriesService.createCategory(data);
  }
}
