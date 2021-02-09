import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { JWTConfigurationProvider } from './common/configuration/jwt-configuration.provider';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user';

@Module({
  imports: [
    DatabaseModule.register(),
    UserModule,
    AuthModule,
    { ...JwtModule.registerAsync(JWTConfigurationProvider), global: true },
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AppModule {}
