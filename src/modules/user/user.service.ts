import { TenantAwareContext } from './../database/providers/tenant-aware-context.provider';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto } from '../auth/auth.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    @Inject(TenantAwareContext) private readonly context: TenantAwareContext,
  ) {}

  async verifyUser(payload: LoginDto): Promise<Partial<UserEntity>> {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .where('user.username = :username', { username: payload.username })
      .getOne();
    if (!user) {
      throw new UnauthorizedException(`Username ${user.username} no exist`);
    }

    const isLogin = await bcrypt.compare(payload.password, user.password);
    if (isLogin) {
      return omit(user, 'password');
    }
    return null;
  }

  async register(payload: RegisterDto): Promise<Partial<UserEntity>> {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .where('user.username= :username', { username: payload.username })
      .getOne();
    if (user) {
      throw new UnauthorizedException(`Username ${payload.username} existed`);
    }
    const password = await bcrypt.hash(payload.password, 10);
    const newUser = await this.userRepo.save(
      this.userRepo.create({ ...payload, password }),
    );
    return omit(newUser, 'password');
  }

  async getUserById(id: string): Promise<Partial<UserEntity>> {
    return this.userRepo.findOneOrFail(id);
  }

  async changPassword(updatePassword: string): Promise<void> {
    const user = await this.getUserById(this.context.userId);
    user.password = await bcrypt.hash(updatePassword, 10);
    await this.userRepo.save(user);
  }
}
