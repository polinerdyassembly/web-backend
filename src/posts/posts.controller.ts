import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './posts.dto';
import { Body, Post } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  public async getAllPosts() {
    const { count, rows } = await this.postsService.getAllPosts();
    return {
      total: count,
      data: rows,
    };
  }

  @Get(':id')
  public async getPostById(id: number) {
    return await this.postsService.getPostById(id);
  }

  @Get('slug/:slug')
  public async getPostBySlug(slug: string) {
    return await this.postsService.getPostBySlug(slug);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public async createPost(@Body() data: PostDto) {
    data = plainToClass(PostDto, data, { excludeExtraneousValues: true });
    return await this.postsService.createPost(data);
  }
}
