import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.INSTANCE_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  entities: [__dirname + '/src/**/entities/*{.ts,.js}'],
  migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
  subscribers: [__dirname + '/src/subscribers/*{.ts,.js}']
} as DataSourceOptions);
