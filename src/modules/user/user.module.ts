import { Module } from '@nestjs/common';
import { scanComponents, scanEntities } from '../utils';
import { UserService } from './user.service';
import * as controller from './user.controller';
import * as repositories from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([...scanEntities(repositories)])],
  providers: [UserService],
  controllers: [...scanComponents(controller)],
  exports: [UserService],
})
export class UserModule {}
