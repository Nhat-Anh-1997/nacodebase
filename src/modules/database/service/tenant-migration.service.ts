import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TenantMigrationService {
  private readonly logger = new Logger(TenantMigrationService.name);

  async onNewTenant(tenantId: string) {
    this.logger.log('onNewTenant');
    this.logger.log(tenantId);
  }
}
