import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '643264',
  database: 'pone',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
