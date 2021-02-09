import { Module } from '@nestjs/common';
import { UserModule } from '../user';
import * as service from './auth.service';
import * as controller from './auth.controller';
import { scanComponents } from '../utils';

@Module({
  imports: [UserModule],
  providers: [...scanComponents(service)],
  controllers: [...scanComponents(controller)],
  exports: [...scanComponents(service)],
})
export class AuthModule {}
