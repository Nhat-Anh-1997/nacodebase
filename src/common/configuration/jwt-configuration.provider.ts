import { Logger } from '@nestjs/common';
import { JwtModuleOptions } from '@nestjs/jwt';
import { authSecret } from '../constants/auth';

const logger = new Logger('JWTConfigurationProvider');

export const JWTConfigurationProvider = {
  useFactory: (): JwtModuleOptions => {
    logger.log('Setting up JWT module');
    return {
      secret: authSecret,
      signOptions: { expiresIn: '3600h' },
    };
  },
};
