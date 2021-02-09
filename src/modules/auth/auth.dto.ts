import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class TokenJwtDto {
  public access_token: string;
}
export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public username: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public password: string;
}

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public fullName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public password: string;

  @ApiProperty()
  @IsString()
  public address: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public phoneNumber: string;
}

export class AuthPayloadDto {
  @IsUUID()
  tenantId: string;
  @IsUUID()
  id: string;
  @IsString()
  username: string;
  @IsEmail()
  email: string;
}

export class changePasswordDto {
  @ApiProperty()
  passwordUpdated: string;
}
