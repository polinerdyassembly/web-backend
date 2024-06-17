import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Categories } from '../categories/categories.entity';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false, type: 'text' })
  content: string;

  @Column({ nullable: false, unique: true })
  slug: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Categories, (category) => category.posts)
  @JoinColumn({ name: 'category_id' })
  category: Categories;
}
