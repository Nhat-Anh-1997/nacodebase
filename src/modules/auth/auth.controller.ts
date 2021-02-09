import {
  Body,
  Controller,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from '../../entities/user.entity';
import { UserService } from '../user/user.service';
import {
  changePasswordDto,
  LoginDto,
  RegisterDto,
  TokenJwtDto,
} from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() payload: RegisterDto): Promise<Partial<UserEntity>> {
    return await this.userService.register(payload);
  }

  @Post('login')
  async login(@Body() payload: LoginDto): Promise<TokenJwtDto> {
    const credential = await this.userService.verifyUser(payload);
    if (!credential) {
      throw new UnauthorizedException();
    }
    return await this.authService.login(payload);
  }

  @Patch('password')
  async changePassword(@Body() payload: changePasswordDto): Promise<void> {
    return await this.userService.changPassword(payload.passwordUpdated);
  }
}
