import { Logger, OnModuleInit } from '@nestjs/common';
import { databaseOptions } from 'src/common/constants/database';
import { devTenant } from 'src/common/constants/server';
import { getConnectionManager } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const logger = new Logger('DatabaseModuleCore');

export class DatabaseCoreModule implements OnModuleInit {
  async onModuleInit() {
    logger.log('go to database core module init');
    const connectionManager = getConnectionManager();
    if (!connectionManager.has('system')) {
      logger.log(' -Setting up system database connection ...');
      logger.log(JSON.stringify(databaseOptions));
      const connection = connectionManager.create({
        ...databaseOptions,
        name: 'system',
      });
      await connection.connect();
    }
    if (connectionManager.has(devTenant)) {
      logger.log(`setting up dev tenant database for tenantId: ${devTenant}`);

      const systemQueryRunner = connectionManager
        .get('system')
        .createQueryRunner();
      const isHaveTenantSchema = await systemQueryRunner.hasSchema(devTenant);

      if (isHaveTenantSchema) {
        logger.log(`Create Schema for tenantId ${devTenant}`);
        await systemQueryRunner.createSchema(devTenant);
      }

      const connection = connectionManager.create(<PostgresConnectionOptions>{
        ...databaseOptions,
        name: devTenant,
        schema: devTenant,
      });

      logger.log(`Migrations ${process.cwd()}/dist/migrations/**/*.js`);
      await connection.connect();
      logger.log(`Running migration for tenantId: ${devTenant}`);
      const migrations = await connection.runMigrations();
      logger.log(migrations);
      logger.log(`- Database migration done for tenantId: ${devTenant}`);
    }
  }
}
