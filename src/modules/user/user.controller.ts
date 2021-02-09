import { TenantAwareContext } from './../database/providers/tenant-aware-context.provider';
import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { omit } from 'lodash';
import { UserEntity } from '../../entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(TenantAwareContext) private readonly context: TenantAwareContext,
  ) {}

  @Get('me')
  async getUserDetail(): Promise<Partial<UserEntity>> {
    return omit(
      await this.userService.getUserById(this.context.userId),
      'password',
    );
  }
}
