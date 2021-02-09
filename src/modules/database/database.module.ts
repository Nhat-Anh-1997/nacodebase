import {
  TenantAwareContext,
  TenantAwareContextProvider,
} from './providers/tenant-aware-context.provider';
import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseCoreModule } from './database-core.module';
import { TypeOrmConfigService } from './service/typeorm-config.service';
import { TenantMigrationService } from './service/tenant-migration.service';

export class DatabaseModule {
  static async register(): Promise<DynamicModule> {
    return {
      module: DatabaseCoreModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useExisting: TypeOrmConfigService,
        }),
      ],
      providers: [
        TenantAwareContextProvider,
        TypeOrmConfigService,
        TenantMigrationService,
      ],
      exports: [TypeOrmConfigService, TenantAwareContext],
      global: true,
    };
  }
}
