import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { AdminRepository } from '../admin/repository/admin.repository';
import { Admin } from '../admin/entity/admin.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Admin]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.ACCESS_TOKEN_SECRET,
            signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
        }),
    ],
    providers: [AuthService, JwtStrategy, LocalStrategy, AdminRepository],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
