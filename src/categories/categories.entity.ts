import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Posts } from '../posts/posts.entity';

@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ default: null, select: false, type: 'text' })
  description: string;

  @Column({ unique: true, nullable: false })
  slug: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Posts, (post) => post.category, { onDelete: 'RESTRICT' })
  posts: Posts[];
}
