import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const isProduction = process.env.NODE_ENV;

const config = {
  type: 'postgres',
  host: `${process.env.DATABASE_HOST}`,
  port: `${process.env.DATABASE_PORT}`,
  username: `${process.env.DATABASE_USERNAME}`,
  password: `${process.env.DATABASE_PASSWORD}`,
  database: `${process.env.DATABASE_NAME}`,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  seeds: ['dist/seeders/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
  retryAttempts: 3,
  ssl:
    isProduction === 'production'
      ? {
          rejectUnauthorized: false,
          ca: process.env.DATABASE_SSL_CERT,
        }
      : null,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
