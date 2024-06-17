import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './posts.entity';
import { PostsService } from './posts.service';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Posts]), CategoriesModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
