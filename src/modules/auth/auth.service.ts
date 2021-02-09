import { AuthPayloadDto, TokenJwtDto } from './auth.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async encode(payload: Partial<AuthPayloadDto>): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async decode(token: string): Promise<AuthPayloadDto> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new UnauthorizedException('Access Token Illegal');
    }
  }

  async login(payload: Partial<UserEntity>): Promise<TokenJwtDto> {
    return {
      access_token: await this.encode(payload),
    };
  }
}
