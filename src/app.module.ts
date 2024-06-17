import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    CategoriesModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
