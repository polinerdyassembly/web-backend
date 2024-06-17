import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './posts.entity';
import { PostDto } from './posts.dto';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private readonly PostsRepo,
    @Inject(CategoriesService)
    private readonly categoriesService: CategoriesService,
  ) {}

  public async getAllPosts(): Promise<{ count: number; rows: Posts[] }> {
    const res = await this.PostsRepo.findAndCount({
      relations: ['category'],
      select: {
        id: true,
        title: true,
        content: true,
        category: {
          id: true,
          name: true,
          slug: true,
        },
        created_at: true,
        updated_at: true,
      },
    });
    return {
      count: res[1],
      rows: res[0],
    };
  }

  public async getPostById(id: number): Promise<Posts> {
    return await this.PostsRepo.findOne({
      where: {
        id,
      },
      relations: ['category'],
      select: {
        id: true,
        title: true,
        content: true,
        category: {
          id: true,
          name: true,
          slug: true,
        },
        created_at: true,
        updated_at: true,
      },
    });
  }

  public async createPost(data: PostDto): Promise<Posts> {
    const category = await this.categoriesService.getCategoryById(
      data.category,
    );
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    const currentSlug = await this.PostsRepo.findOne({
      where: {
        slug: data.slug,
      },
    });

    if (currentSlug) {
      throw new HttpException('Slug already exists', HttpStatus.BAD_REQUEST);
    }
    return await this.PostsRepo.save(data);
  }

  public async getPostBySlug(slug: string): Promise<Posts> {
    return await this.PostsRepo.findOne({
      where: {
        slug,
      },
      relations: ['category'],
      select: {
        id: true,
        title: true,
        content: true,
        category: {
          id: true,
          name: true,
          slug: true,
        },
        created_at: true,
        updated_at: true,
      },
    });
  }
}
