import { join } from 'path';
import { DataSource } from 'typeorm';
import { DbConfigService } from './config/db/config.service';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config';

const entity = join(__dirname, '/**/*.entity{.ts,.js}');
const migration = join(__dirname, './migrations/**/*{.ts,.js}');
const dbConfigService = new DbConfigService(new ConfigService());
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: dbConfigService.dbHost,
  port: dbConfigService.dbPort,
  username: dbConfigService.dbUser,
  password: dbConfigService.dbPassword,
  database: dbConfigService.dbName,
  //   synchronize: true,
  entities: [entity],
  migrations: [migration],
});
