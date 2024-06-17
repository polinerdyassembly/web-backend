import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './categories.entity';
import { Repository } from 'typeorm';
import { CategoryDto } from './categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private readonly CategoriesRepo: Repository<Categories>,
  ) {}

  public async getAllCategories(): Promise<{
    count: number;
    rows: Categories[];
  }> {
    const res = await this.CategoriesRepo.findAndCount({
      select: ['id', 'name', 'slug', 'description'],
    });
    return {
      count: res[1],
      rows: res[0],
    };
  }

  public async getCategoryById(id: number): Promise<Categories> {
    return await this.CategoriesRepo.findOne({
      where: {
        id,
      },
    });
  }

  public async createCategory(data: CategoryDto): Promise<Categories> {
    const findCurrent = await this.CategoriesRepo.findOne({
      where: {
        slug: data.slug,
      },
    });
    if (findCurrent) {
      throw new HttpException(
        'Category slug already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.CategoriesRepo.save(data);
  }

  public async getCategoryBySlug(slug: string): Promise<Categories> {
    return await this.CategoriesRepo.findOne({
      where: {
        slug,
      },
    });
  }
}
