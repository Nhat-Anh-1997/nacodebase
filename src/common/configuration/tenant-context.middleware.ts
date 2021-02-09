import { Logger, NestMiddleware } from '@nestjs/common';
import { devTenant } from '../constants';
import { CustomHttpRequest } from '../interface/common';

export class TenantContextMiddleWare implements NestMiddleware {
  private readonly logger = new Logger(TenantContextMiddleWare.name);

  use(req: CustomHttpRequest, res: Response, next: () => void) {
    this.logger.log(`- Inject devTenant to context`);
    req.tenantId = devTenant;
    next();
  }
}
