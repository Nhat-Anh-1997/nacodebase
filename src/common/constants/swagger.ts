import { DocumentBuilder } from '@nestjs/swagger';

import { serverName, serverVersion } from './server';

export const swaggerConfiguration = new DocumentBuilder()
  .setTitle(serverName)
  .setDescription('Server APIs')
  .setVersion(serverVersion)
  .addBearerAuth()
  .build();
