import { ConnectionOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { isProduction } from './server';

export const databaseOptions: ConnectionOptions & TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URI,
  logging: false,
  synchronize: true,
  migrationsRun: true,
  keepConnectionAlive: true,
  migrations: [
    isProduction
      ? `${process.cwd()}/dist/migrations/**/*.js`
      : `${process.cwd()}/src/migrations/**/*.ts`,
  ],
  entities: [
    isProduction
      ? `${process.cwd()}/dist/**/*.entity.js`
      : `${process.cwd()}/src/**/*.entity.ts`,
  ],
  uuidExtension: 'pgcrypto',
};
