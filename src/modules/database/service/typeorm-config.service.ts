import { TenantAwareContext } from './../providers/tenant-aware-context.provider';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { getConnectionManager } from 'typeorm';
import { databaseOptions } from 'src/common/constants/database';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(TenantAwareContext) private readonly context: TenantAwareContext;

  private readonly logger = new Logger(TypeOrmConfigService.name);

  async createTypeOrmOptions(): Promise<any> {
    if (this.context.tenantId) {
      const isHaveConnection = getConnectionManager().has(
        this.context.tenantId,
      );
      this.logger.log(
        isHaveConnection
          ? `Reuse connection for tenantId:${this.context.tenantId}`
          : `Create new connection for tenantId ${this.context.tenantId}`,
      );
    }
    return {
      ...databaseOptions,
      name: this.context.tenantId,
      schema: this.context.tenantId,
    };
  }
}
