import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ResponseAuthDto } from './dto/responseAuth.dto';
import { AdminRepository } from '../admin/repository/admin.repository';
import { Admin } from '../admin/entity/admin.entity';

@Injectable()
export class AuthService {
    private refreshTokenConfig = {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        secret: process.env.REFRESH_TOKEN_SECRET,
    };

    constructor(
        private adminRepository: AdminRepository,
        private jwtService: JwtService,
    ) {}

    async validateAdmin(email: string, password: string): Promise<Partial<Admin>> {
        const admins = await this.adminRepository.find({
            where: { email: email },
            take: 1,
        });
        if (!admins.length) {
            throw new BadRequestException({ message: 'Admin is not exist' });
        }
        const comparePassword = await bcrypt.compare(password, admins[0].password);
        if (!comparePassword) {
            throw new ForbiddenException({ message: 'Password was wrong' });
        }
        return {
            id: admins[0].id,
            email: admins[0].email,
        };
    }

    async login(req: Request): Promise<any> {
        const user: Partial<Admin> = req.user;
        const payload = { email: user.email, id: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, this.refreshTokenConfig),
        };
    }

    async getAccessToken(refreshToken: string): Promise<Partial<ResponseAuthDto>> {
        let refreshTokenDecode;
        try {
            refreshTokenDecode = await this.jwtService.verify(refreshToken, this.refreshTokenConfig);
        } catch (e) {
            throw new UnauthorizedException({ message: 'INVALID_TOKEN' });
        }
        return {
            access_token: this.jwtService.sign(refreshTokenDecode),
        };
    }
}
