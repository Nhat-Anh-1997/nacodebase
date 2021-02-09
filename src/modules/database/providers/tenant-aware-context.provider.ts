import { Logger, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CustomHttpRequest } from 'src/common/interface/common';

const logger = new Logger('TenantAwareContextProvider');

class ContextCredential {
  id: string;
  tenantId: any;
}

export class TenantAwareContext {
  constructor(private readonly credential: ContextCredential) {}

  get userId(): string {
    return this.credential.id;
  }

  get tenantId(): any {
    return this.credential.tenantId;
  }
}

export const TenantAwareContextProvider = {
  provide: TenantAwareContext,
  useFactory: async (httpRequest: CustomHttpRequest) => {
    logger.warn('- go to context provider');
    if (httpRequest?.tenantId) {
      logger.log(
        `- Context request from HTTP : TenantID :${httpRequest.tenantId}`,
      );
    }
    logger.log(`- Context request from HTTP without TenantId`);
    return null;
  },
  inject: [REQUEST],
  scope: Scope.REQUEST,
};
